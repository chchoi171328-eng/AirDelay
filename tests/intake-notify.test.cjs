const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

const input = {
  name: '한글 접수 테스트', phone: '070-4421-7100', email: 'customer@example.com',
  airline: '대한항공', flightNo: 'KE901', origin: '인천', destination: '파리',
  date: '2026-11-09', type: 'delay', delayRange: '5시간 이상',
  detail: '한글 상세 내용\n<script>는 실행되지 않는 일반 텍스트입니다.', consent: true,
}

function loadNotify(responses, env = { BREVO_API_KEY: 'test-only-key', BREVO_SENDER_EMAIL: 'intake@airlegal.co.kr' }) {
  const calls = []
  const logs = []
  const cache = new Map()
  function load(file) {
    if (cache.has(file)) return cache.get(file)
    const module = { exports: {} }
    cache.set(file, module.exports)
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText
    vm.runInNewContext(source, {
      module, exports: module.exports, process: { env }, AbortSignal,
      console: { warn: (...args) => logs.push(args), error: (...args) => logs.push(args) },
      setTimeout: (callback) => { callback(); return 0 },
      require: (name) => name.startsWith('.') ? load(path.resolve(path.dirname(file), name + '.ts')) : require(name),
      fetch: async (url, options) => {
        calls.push({ url, ...options, payload: JSON.parse(options.body) })
        const response = responses.shift()
        if (response instanceof Error) throw response
        if (!response) throw new Error('Unexpected extra send')
        return response
      },
    }, { filename: file })
    return module.exports
  }
  return { notify: load(path.resolve(__dirname, '../src/lib/intake-notify.ts')), calls, logs }
}

const response = (status, body = {}) => ({ ok: status >= 200 && status < 300, status, json: async () => body })

test('설정이 없으면 발송하지 않는다', async () => {
  const { notify, calls } = loadNotify([], {})
  assert.equal(notify.isEmailConfigured(), false)
  assert.equal(await notify.notifyIntake(input, { id: null }), false)
  assert.equal(calls.length, 0)
})

test('한글 접수 내용을 대표 메일에만 보내고 고객 주소는 Reply-To에 넣는다', async () => {
  const { notify, calls } = loadNotify([response(201)])
  assert.equal(await notify.notifyIntake(input, { id: null }), true)
  assert.equal(calls.length, 1)
  const { payload, headers, url } = calls[0]
  assert.equal(url, 'https://api.brevo.com/v3/smtp/email')
  assert.equal(headers['api-key'], 'test-only-key')
  assert.equal(payload.to.length, 1)
  assert.equal(payload.to[0].email, 'airlegalclaim@gmail.com')
  assert.equal(payload.replyTo.email, input.email)
  assert.equal(payload.sender.name, '에어리걸클레임 (법무법인 명)')
  assert.equal(payload.subject, '[에어리걸클레임] 새 문의 접수')
  assert.ok(payload.textContent.includes('이름: ' + input.name))
  assert.ok(payload.textContent.includes('인천 → 파리'))
  assert.ok(payload.textContent.includes(input.detail))
  assert.equal(payload.htmlContent, undefined)
  assert.ok(!calls[0].body.includes('test-only-key'))
})

test('429 응답은 같은 본문과 중복 방지 키로 한 번만 재시도한다', async () => {
  const { notify, calls } = loadNotify([response(429), response(201)])
  assert.equal(await notify.notifyIntake(input, { id: null }), true)
  assert.equal(calls.length, 2)
  assert.equal(calls[0].body, calls[1].body)
  assert.match(calls[0].payload.headers.idempotencyKey, /^[0-9a-f-]{36}$/)
})

test('응답을 잃은 발송이 이미 처리됐으면 재시도의 중복 응답을 성공으로 처리한다', async () => {
  const { notify, calls } = loadNotify([new Error('Network failure'), response(400, { code: 'duplicate_parameter' })])
  assert.equal(await notify.notifyIntake(input, { id: null }), true)
  assert.equal(calls.length, 2)
  assert.equal(calls[0].body, calls[1].body)
})

test('잘못된 API 키는 재시도하지 않고 서비스 응답의 개인정보를 로그에 남기지 않는다', async () => {
  const { notify, calls, logs } = loadNotify([response(401, { message: input.email + input.name })])
  assert.equal(await notify.notifyIntake(input, { id: null }), false)
  assert.equal(calls.length, 1)
  const serialized = JSON.stringify(logs)
  assert.ok(!serialized.includes(input.email))
  assert.ok(!serialized.includes(input.name))
  assert.ok(!serialized.includes('test-only-key'))
})

test('서버 오류가 반복되면 두 번 뒤 실패를 반환한다', async () => {
  const { notify, calls } = loadNotify([response(503), response(503)])
  assert.equal(await notify.notifyIntake(input, { id: null }), false)
  assert.equal(calls.length, 2)
})
