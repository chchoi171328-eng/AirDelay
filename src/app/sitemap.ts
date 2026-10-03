import type { MetadataRoute } from 'next'
import { getCases, getPosts } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

const PAGES = ['', '/services', '/process', '/cases', '/blog', '/about', '/contact', '/intake', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}`, priority: path === '' ? 1 : 0.7 })),
    ...getPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date, priority: 0.6 })),
    ...getCases().filter((c) => c.html).map((c) => ({ url: `${SITE_URL}/cases/${c.slug}`, priority: 0.5 })),
  ]
}
