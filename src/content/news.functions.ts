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
  const accessKey = process.env.MEDIASTACK_API_ACCESS_KEY
  const endpoint = buildEndpointDisplay()

  if (!accessKey) {
    return {
      featuredStory: null,
      storyFeed: [],
      topics: defaultTopics,
      updatedAt: new Date().toISOString(),
      error: 'News is temporarily unavailable right now.',
      endpoint,
      rawResponse: null,
    }
  }

  try {
    const url = new URL('https://api.mediastack.com/v1/news')
    url.searchParams.set('access_key', accessKey)
    url.searchParams.set('countries', 'ph')
    url.searchParams.set('languages', 'en')
    url.searchParams.set('limit', '12')
    url.searchParams.set('sort', 'published_desc')

    const response = await fetch(url.toString())
    if (!response.ok) {
      const rawText = await response.text()
      const rawResponse = parseRawResponse(rawText)

      return {
        featuredStory: null,
        storyFeed: [],
        topics: defaultTopics,
        updatedAt: new Date().toISOString(),
        error: `News is temporarily unavailable right now. (status ${response.status})`,
        endpoint,
        rawResponse,
      }
    }

    const payload = (await response.json()) as MediaStackResponse
    const stories = (payload.data ?? []).map(toNewsStory).filter((story) => story.title.length > 0)
    const topics = buildTopics(payload.data ?? [])

    return {
      featuredStory: stories[0] ?? null,
      storyFeed: stories.slice(1),
      topics: topics.length ? topics : defaultTopics,
      updatedAt: new Date().toISOString(),
      error: null,
      endpoint,
      rawResponse: payload,
    }
  } catch {
    return {
      featuredStory: null,
      storyFeed: [],
      topics: defaultTopics,
      updatedAt: new Date().toISOString(),
      error: 'News is temporarily unavailable right now.',
      endpoint,
      rawResponse: null,
    }
  }
})

const defaultTopics = [
  'Economy',
  'Population',
  'Disaster',
  'Governance',
  'Technology',
  'Education',
  'Agriculture',
]

function toNewsStory(article: MediaStackArticle): NewsStory {
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

function buildTopics(items: MediaStackArticle[]): string[] {
  const topics = new Set<string>()
  for (const item of items) {
    const category = normalizeCategory(item.category)
    if (category) {
      topics.add(category)
    }
  }
  return Array.from(topics).slice(0, 8)
}

function normalizeCategory(category: string | string[] | null | undefined): string | null {
  if (!category) {
    return null
  }

  if (Array.isArray(category)) {
    return category[0]?.trim() || null
  }

  return category.trim() || null
}

function buildEndpointDisplay(): string {
  const url = new URL('https://api.mediastack.com/v1/news')
  url.searchParams.set('access_key', '[redacted]')
  url.searchParams.set('countries', 'ph')
  url.searchParams.set('languages', 'en')
  url.searchParams.set('limit', '12')
  url.searchParams.set('sort', 'published_desc')
  return url.toString()
}

function parseRawResponse(text: string): MediaStackResponse | null {
  if (!text.trim()) {
    return null
  }

  try {
    return JSON.parse(text) as MediaStackResponse
  } catch {
    return null
  }
}

function formatPublished(value: string | null | undefined): string {
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
