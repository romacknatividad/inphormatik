import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Clock3, Rss, Sparkles } from 'lucide-react'
import { loadNewsPageData, type NewsPageData } from '../content/news.functions'

export const Route = createFileRoute('/news')({
  loader: async (): Promise<NewsPageData> => loadNewsPageData(),
  component: NewsPage,
})

function NewsPage() {
  const { featuredStory, storyFeed, topics, updatedAt, error, endpoint, rawResponse } =
    Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <div className="space-y-6">
        <section className="island-shell rise-in rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
          <div className="max-w-4xl">
            <div className="hero-chip mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)]">
              <Rss className="h-4 w-4" aria-hidden="true" />
              News
            </div>
            <h1 className="display-title mb-5 text-5xl leading-[0.95] font-bold tracking-[-0.04em] text-[var(--sea-ink)] sm:text-7xl">
              Latest Philippine news, curated into a clean reading feed.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
              A featured story, topic chips, and a stacked feed keep the latest updates easy to
              scan.
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="island-kicker mb-2">Live endpoint</p>
                <h2 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
                  MediaStack request used by this page
                </h2>
              </div>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--sea-ink-soft)]">
                Server-side fetch
              </span>
            </div>
            <code className="block overflow-x-auto rounded-[1rem] border border-[var(--line)] bg-white/75 px-4 py-3 text-xs leading-6 text-[var(--sea-ink-soft)]">
              {endpoint}
            </code>
          </div>

          <div className="mt-4 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="island-kicker mb-2">Raw response</p>
                <h2 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
                  JSON returned by the API
                </h2>
              </div>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--sea-ink-soft)]">
                {rawResponse?.pagination?.count ?? 0} records
              </span>
            </div>
            <pre className="max-h-[32rem] overflow-auto rounded-[1rem] border border-[var(--line)] bg-[var(--panel)] p-4 text-xs leading-6 text-[var(--sea-ink-soft)]">
              {rawResponse ? JSON.stringify(rawResponse, null, 2) : 'No raw JSON payload available.'}
            </pre>
          </div>
        </section>

        {error ? (
          <section className="rounded-[1.75rem] border border-[rgba(220,38,38,0.2)] bg-[rgba(254,242,242,0.92)] p-6 text-sm leading-7 text-red-700">
            {error}
          </section>
        ) : null}

        <section className="grid gap-4">
          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="island-kicker mb-2">Featured story</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                  {featuredStory?.title ?? 'No featured story available yet'}
                </h2>
              </div>
              <span className="soft-pill inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-[var(--sea-ink-soft)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {featuredStory?.source ?? 'Featured story'}
              </span>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
              {featuredStory?.summary ??
                'This space will surface the highest-priority article from the latest news response.'}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--sea-ink-soft)]">
                {featuredStory?.published ?? formatUpdated(updatedAt)}
              </span>
              {featuredStory?.href ? (
                <a
                  href={featuredStory.href}
                  target="_blank"
                  rel="noreferrer"
                  className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
                >
                  Open article
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <span className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink-soft)]">
                  Waiting for stories
                </span>
              )}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="mb-4">
              <p className="island-kicker mb-2">Topic filters</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Organize the feed by category
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="island-kicker mb-2">Latest feed</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Stories from the latest response
              </h2>
            </div>
            <p className="max-w-md text-right text-sm leading-7 text-[var(--sea-ink-soft)]">
              Each card stays stacked so the summaries, sources, and timestamps remain readable.
            </p>
          </div>

          {storyFeed.length ? (
            storyFeed.map((story) => (
              <article
                key={`${story.title}-${story.published}`}
                className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6"
              >
                {story.image ? (
                  <div className="mb-5 overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--panel)]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="island-kicker mb-2">{story.categoryLabel}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                      {story.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--sea-ink-soft)]">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    {story.published}
                  </span>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
                  {story.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--sea-ink-soft)]">
                    {story.author || story.source}
                  </span>
                  {story.href ? (
                    <a
                      href={story.href}
                      target="_blank"
                      rel="noreferrer"
                      className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
                    >
                      Open story
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 text-sm leading-7 text-[var(--sea-ink-soft)]">
              No stories were returned yet.
            </article>
          )}
        </section>
      </div>
    </main>
  )
}

function formatUpdated(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Updated recently'
    : `Updated ${date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`
}
