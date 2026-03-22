import { createServerFn } from '@tanstack/react-start'

export type MediaStackArticle = {
  title: string
  description?: string | null
  url?: string | null
  source?: string | null
  author?: string | null
  image?: string | null
  published_at?: string | null
  category?: string | string[] | null
  country?: string[] | null
  language?: string | null
}

export type MediaStackResponse = {
  data?: MediaStackArticle[]
  pagination?: {
    limit?: number
    offset?: number
    count?: number
    total?: number
  }
}

export type NewsStory = {
  title: string
  summary: string
  source: string
  author: string | null
  image: string | null
  published: string
  href: string
  categoryLabel: string
}

export type NewsPageData = {
  featuredStory: NewsStory | null
  storyFeed: NewsStory[]
  topics: string[]
  updatedAt: string
  error: string | null
  endpoint: string
  rawResponse: MediaStackResponse | null
}

export const loadNewsPageData = createServerFn({ method: 'GET' }).handler(async (): Promise<NewsPageData> => {
  const { loadNewsPageDataServer } = await import('./news.server')
  return loadNewsPageDataServer()
})

export function applyNewsCacheHeaders() {
  setResponseHeaders({
    'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    'CDN-Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
    'Vercel-CDN-Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
  })
}

async function readNewsCache(): Promise<KvCacheEntry | null> {
  if (!isKvConfigured()) {
    return null
  }

  try {
    const stored = await kv.get<string>(NEWS_CACHE_KEY)
    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as KvCacheEntry
    if (!parsed?.expiresAt || !parsed?.value) {
      return null
    }

    if (parsed.expiresAt <= Date.now()) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

async function writeNewsCache(entry: KvCacheEntry): Promise<void> {
  if (!isKvConfigured()) {
    return
  }

  try {
    const ttlSeconds = Math.max(30, Math.floor((entry.expiresAt - Date.now()) / 1000))
    await kv.set(NEWS_CACHE_KEY, JSON.stringify(entry), { ex: ttlSeconds })
  } catch {
    // Best-effort cache only.
  }
}

function isKvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export const defaultTopics = [
  'Economy',
  'Population',
  'Disaster',
  'Governance',
  'Technology',
  'Education',
  'Agriculture',
]

export function toNewsStory(article: MediaStackArticle): NewsStory {
  const categoryLabel = normalizeCategory(article.category) ?? 'General'
  const title = article.title?.trim() || 'Untitled story'
  const href = article.url?.trim() || ''

  return {
    title,
    summary:
      article.description?.trim() ||
      'No summary was provided by the response, but the story can still be opened from the source link.',
    source: article.source?.trim() || 'MediaStack',
    author: article.author?.trim() || null,
    image: article.image?.trim() || null,
    published: formatPublished(article.published_at),
    href,
    categoryLabel,
  }
}

export function buildTopics(items: MediaStackArticle[]): string[] {
  const topics = new Set<string>()
  for (const item of items) {
    const category = normalizeCategory(item.category)
    if (category) {
      topics.add(category)
    }
  }
  return Array.from(topics).slice(0, 8)
}

export function normalizeCategory(category: string | string[] | null | undefined): string | null {
  if (!category) {
    return null
  }

  if (Array.isArray(category)) {
    return category[0]?.trim() || null
  }

  return category.trim() || null
}

export function buildEndpointDisplay(): string {
  const url = new URL('https://api.mediastack.com/v1/news')
  url.searchParams.set('access_key', '[redacted]')
  url.searchParams.set('countries', 'ph')
  url.searchParams.set('languages', 'en')
  url.searchParams.set('limit', '12')
  url.searchParams.set('sort', 'published_desc')
  return url.toString()
}

export function parseRawResponse(text: string): MediaStackResponse | null {
  if (!text.trim()) {
    return null
  }

  try {
    return JSON.parse(text) as MediaStackResponse
  } catch {
    return null
  }
}

export function formatPublished(value: string | null | undefined): string {
  if (!value) {
    return 'Just now'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
