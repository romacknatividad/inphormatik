import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Clock3, Sparkles, Newspaper, Image as ImageIcon } from 'lucide-react'
import { loadNewsPageData, type NewsPageData } from '../content/news.functions'

export const Route = createFileRoute('/news')({
  loader: async (): Promise<NewsPageData> => loadNewsPageData(),
  component: NewsPage,
})

function NewsPage() {
  const { featuredStory, storyFeed, updatedAt, error } = Route.useLoaderData()
  const allStories = featuredStory ? [featuredStory, ...storyFeed] : storyFeed
  const sourceCount = new Set(allStories.map((story) => story.source)).size
  const imageCount = allStories.filter((story) => Boolean(story.image)).length

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <div className="space-y-8">
        <section className="island-shell rise-in rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-4xl space-y-4">
              <div className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)]">
                <Newspaper className="h-4 w-4" aria-hidden="true" />
                Newsroom
              </div>
              <h1 className="display-title text-5xl leading-[0.95] font-bold tracking-[-0.04em] text-[var(--sea-ink)] sm:text-7xl">
                A sharper, faster way to read what matters in the Philippines.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
                We pull the latest stories into a lively reading flow with standout picks, quick
                takes, and image-rich cards that are easier to enjoy.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <MetricPill label="Stories loaded" value={String(allStories.length)} />
              <MetricPill label="Unique sources" value={String(sourceCount)} />
              <MetricPill label="Stories with images" value={String(imageCount)} />
            </div>
          </div>
        </section>

        {error ? (
          <section className="rounded-[1.75rem] border border-[rgba(220,38,38,0.2)] bg-[rgba(254,242,242,0.92)] p-6 text-sm leading-7 text-red-700">
            {error}
          </section>
        ) : null}

        <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <FeaturedStoryCard story={featuredStory} updatedAt={updatedAt} />
          <aside className="grid gap-4">
            <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="island-kicker mb-2">In the mix</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                    Quick hits
                  </h2>
                </div>
                <Sparkles className="h-5 w-5 text-[var(--lagoon-deep)]" aria-hidden="true" />
              </div>

              <div className="space-y-3">
                {(storyFeed.slice(0, 3).length ? storyFeed.slice(0, 3) : [featuredStory])
                  .filter(Boolean)
                  .map((story) => (
                    <CompactStory key={`${story?.title}-${story?.published}`} story={story!} />
                  ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="island-kicker mb-2">Reading mood</p>
              <h2 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Built for skimming or sinking in
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                The layout keeps the strongest story front and center, while the rest of the feed
                stays light, visual, and easy to browse.
              </p>
            </section>
          </aside>
        </section>

        <section className="grid gap-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="island-kicker mb-2">Latest feed</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                More stories worth a glance
              </h2>
            </div>
            <p className="max-w-md text-right text-sm leading-7 text-[var(--sea-ink-soft)]">
              Stories are broken into readable cards with image panels, labels, and clean timing.
            </p>
          </div>

          {storyFeed.length ? (
            storyFeed.map((story, index) => (
              <article
                key={`${story.title}-${story.published}`}
                className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6"
              >
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-stretch">
                  <div className="flex flex-col">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="island-kicker mb-2">{story.categoryLabel}</p>
                        <h3 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                          {story.title}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.78)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
                        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatPublishedLabel(story.published)}
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
                  </div>

                  {story.image ? (
                    <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--panel)]">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="h-full min-h-[220px] w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgba(6,16,29,0.74)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                        <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        Photo
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-[220px] items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--line)] bg-[linear-gradient(180deg,rgba(37,99,235,0.05),rgba(255,255,255,0.2))] px-6 text-center text-sm leading-7 text-[var(--sea-ink-soft)]">
                      Story image not available for this item.
                    </div>
                  )}
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

function FeaturedStoryCard({
  story,
  updatedAt,
}: {
  story: NewsPageData['featuredStory']
  updatedAt: string
}) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Editor&apos;s pick</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
            {story?.title ?? 'No featured story available yet'}
          </h2>
        </div>
        <span className="soft-pill inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-[var(--sea-ink-soft)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {story?.source ?? 'Featured story'}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-stretch">
        <div>
          <p className="max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
            {story?.summary ??
              'This space will surface the highest-priority article from the latest news response.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--sea-ink-soft)]">
              {story?.published ?? formatUpdated(updatedAt)}
            </span>
            {story?.href ? (
              <a
                href={story.href}
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
        </div>

        {story?.image ? (
          <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--panel)]">
            <img
              src={story.image}
              alt={story.title}
              className="h-full min-h-[240px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-[1rem] bg-[rgba(6,16,29,0.7)] px-4 py-3 text-sm leading-6 text-white backdrop-blur-sm">
              A featured image gives the lead story more presence and helps the page feel more
              alive.
            </div>
          </div>
        ) : (
          <div className="flex min-h-[240px] items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--line)] bg-[linear-gradient(180deg,rgba(37,99,235,0.05),rgba(255,255,255,0.2))] px-6 text-center text-sm leading-7 text-[var(--sea-ink-soft)]">
            The featured story will appear here when the feed includes an image.
          </div>
        )}
      </div>
    </article>
  )
}

function CompactStory({ story }: { story: NonNullable<NewsPageData['storyFeed']>[number] }) {
  return (
    <article className="rounded-[1.35rem] border border-[var(--line)] bg-white/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">{story.categoryLabel}</p>
          <h3 className="text-sm font-semibold tracking-tight text-[var(--sea-ink)]">
            {story.title}
          </h3>
        </div>
        <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
          {formatPublishedLabel(story.published)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--sea-ink-soft)] line-clamp-3">
        {story.summary}
      </p>
    </article>
  )
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 px-4 py-3">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sea-ink-soft)]">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-[var(--sea-ink)]">{value}</p>
    </div>
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

function formatPublishedLabel(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
