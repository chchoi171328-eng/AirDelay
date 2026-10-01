import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getPost, getPosts } from '@/lib/content'
import { BLOG_CATEGORY_LABELS, coverOf } from '@/lib/types'
import PostCard, { CATEGORY_COLORS, formatDate } from '@/components/content/PostCard'
import DraftBadge from '@/components/content/DraftBadge'
import ArticleCTA from '@/components/content/ArticleCTA'
import { FIRM } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      siteName: FIRM.name,
      locale: 'ko_KR',
      title: post.seoTitle,
      description: post.summary,
      publishedTime: post.date,
      images: [post.cover ?? '/og.png'],
    },
    ...(post.draft && { robots: { index: false } }),
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const others = getPosts().filter((p) => p.slug !== post.slug)
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3)

  return (
    <div>
      <div className="bg-navy py-14">
        <div className="container-wide section-padding max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`badge text-xs ${CATEGORY_COLORS[post.category]}`}>{BLOG_CATEGORY_LABELS[post.category]}</span>
            {post.draft && <DraftBadge />}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight text-balance break-keep">{post.title}</h1>
          <div className="flex items-center gap-1.5 text-white/50 text-sm mt-4">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </div>
        </div>
      </div>

      <div className="container-wide section-padding py-12 max-w-3xl">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
          <Image src={coverOf(post)} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">{post.summary}</p>
        {post.html && (
          <article className="prose prose-gray max-w-none prose-headings:text-navy prose-a:text-navy prose-strong:text-navy" dangerouslySetInnerHTML={{ __html: post.html }} />
        )}

        <ArticleCTA />

        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange transition-colors mt-10">
          <ArrowLeft className="w-4 h-4" /> 법률 정보 목록
        </Link>
      </div>

      {related.length > 0 && (
        <div className="bg-gray-50 py-14">
          <div className="container-wide section-padding">
            <h2 className="text-2xl font-extrabold text-navy mb-6">함께 보면 좋은 글</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
