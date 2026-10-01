'use client'
import { useEffect, useState } from 'react'

interface Tab {
  value: string
  label: string
}

interface Item {
  key: string
  group: string
  node: React.ReactNode
}

// 분류 탭 + 목록. 페이지는 정적으로 두고 브라우저에서 거릅니다(?param=값 주소로 공유 가능).
export default function FilterTabs({ tabs, items, param, gridClassName }: {
  tabs: Tab[]
  items: Item[]
  param: string
  gridClassName: string
}) {
  const [active, setActive] = useState('')
  const visibleTabs = tabs.filter((t) => items.some((i) => i.group === t.value))

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get(param) ?? ''
    if (visibleTabs.some((t) => t.value === initial)) setActive(initial)
    // 처음 한 번만 주소에서 읽습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (value: string) => {
    setActive(value)
    const url = new URL(window.location.href)
    if (value) url.searchParams.set(param, value)
    else url.searchParams.delete(param)
    window.history.replaceState(null, '', url)
  }

  const shown = active ? items.filter((i) => i.group === active) : items
  const tabCls = (on: boolean) =>
    `badge text-sm px-4 py-2 transition-all ${on ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-navy/10'}`

  return (
    <>
      {visibleTabs.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button type="button" aria-pressed={active === ''} onClick={() => select('')} className={tabCls(active === '')}>
            전체 <span className="opacity-60">{items.length}</span>
          </button>
          {visibleTabs.map((t) => {
            const count = items.filter((i) => i.group === t.value).length
            return (
              <button key={t.value} type="button" aria-pressed={active === t.value} onClick={() => select(t.value)} className={tabCls(active === t.value)}>
                {t.label} <span className="opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
      )}
      <div className={gridClassName}>
        {shown.map((i) => <div key={i.key} className="flex [&>*]:flex-1">{i.node}</div>)}
      </div>
    </>
  )
}
