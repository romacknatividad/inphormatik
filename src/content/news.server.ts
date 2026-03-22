import { setResponseHeaders } from '@tanstack/react-start/server'
import { kv } from '@vercel/kv'
import {
  buildEndpointDisplay,
  buildTopics,
  defaultTopics,
  parseRawResponse,
  toNewsStory,
  type MediaStackResponse,
  type NewsPageData,
} from './news.functions'

const NEWS_CACHE_TTL_MS = 5 * 60 * 1000
const NEWS_ERROR_CACHE_TTL_MS = 60 * 1000
const NEWS_CACHE_KEY = 'inphormatik:news:mediastack:ph'

type CacheEntry = {
  expiresAt: number
  value: NewsPageData
}

let newsCache: CacheEntry | null = null
let newsRequest: Promise<NewsPageData> | null = null

export async function loadNewsPageDataServer(): Promise<NewsPageData> {
  applyNewsCacheHeaders()

  const now = Date.now()
  if (newsCache && newsCache.expiresAt > now) {
    return newsCache.value
  }

  const kvCached = await readNewsCache()
  if (kvCached) {
    newsCache = kvCached
    return kvCached.value
  }

  if (newsRequest) {
    return newsRequest
  }

  newsRequest = fetchNewsPageData()
    .then(async (value) => {
      const expiresAt = Date.now() + (value.error ? NEWS_ERROR_CACHE_TTL_MS : NEWS_CACHE_TTL_MS)
      const cacheEntry = {
        expiresAt,
        value,
      }

      newsCache = cacheEntry
      await writeNewsCache(cacheEntry)
      return value
    })
    .finally(() => {
      newsRequest = null
    })

  return newsRequest
}

function applyNewsCacheHeaders() {
  setResponseHeaders({
    'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    'CDN-Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
    'Vercel-CDN-Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
  })
}

async function fetchNewsPageData(): Promise<NewsPageData> {
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
}

async function readNewsCache(): Promise<CacheEntry | null> {
  if (!isKvConfigured()) {
    return null
  }

  try {
    const stored = await kv.get<string>(NEWS_CACHE_KEY)
    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as CacheEntry
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

async function writeNewsCache(entry: CacheEntry): Promise<void> {
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
