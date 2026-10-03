import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ChevronRight } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import { BLOG_CATEGORY_LABELS, coverOf } from '@/lib/types'
import DraftBadge from './DraftBadge'

export const CATEGORY_COLORS: Record<BlogPost['category'], string> = {
  claim: 'bg-blue-50 text-navy',
  aviation: 'bg-amber-50 text-gold-dark',
}

export const formatDate = (date: string) => date.replace(/-/g, '. ')

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/guide/${post.slug}`} className="card group overflow-hidden flex flex-col">
      <div className="relative aspect-video">
        <Image src={coverOf(post)} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        <span className={`badge absolute top-3 left-3 text-xs ${CATEGORY_COLORS[post.category]}`}>
          {BLOG_CATEGORY_LABELS[post.category]}
        </span>
        {post.draft && <DraftBadge className="absolute top-3 right-3" />}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-navy text-base leading-snug mb-2 group-hover:text-orange transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.summary}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </div>
          <span className="flex items-center gap-1 text-navy text-xs font-semibold group-hover:text-orange transition-colors">
            읽기 <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
