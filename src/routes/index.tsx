import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BarChart3, BookOpen, Newspaper, Sparkles } from 'lucide-react'
import { categories } from '../content/categories'

export const Route = createFileRoute('/')({
  component: FocusHubPage,
})

function FocusHubPage() {
  const categoryCount = categories.length
  const resourceCount = categories.reduce((total, category) => total + (category.resources?.length ?? 0), 0)
  const outputCount = categories.reduce((total, category) => total + category.outputs.length, 0)
  const featured = categories.find((category) => category.slug === 'economy-development') ?? categories[0]
  const browsePicks = categories.slice(0, 3)

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <section className="zen-section island-shell rise-in overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div className="relative z-10 max-w-5xl space-y-6">
            <div className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Explore Philippine public data
            </div>

            <h1 className="display-title text-5xl leading-[0.92] font-bold tracking-[-0.05em] text-[var(--sea-ink)] sm:text-7xl">
              A brighter homepage for data curiosity, news, and return visits.
            </h1>

            <p className="max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
              InPHormatik collects public datasets, live charts, research papers, and news in one
              place so you can jump in fast, explore deeply, and come back when the landscape
              changes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/categories/${featured.slug}`}
                className="cta-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold no-underline"
              >
                Start with Economy
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/news"
                className="soft-pill inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[var(--sea-ink)] no-underline"
              >
                Read the News
                <Newspaper className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <StatCard label="Categories" value={String(categoryCount)} note="Ready-made topic spaces" />
            <StatCard label="Source links" value={String(resourceCount)} note="Official datasets and references" />
            <StatCard label="Use cases" value={String(outputCount)} note="Dashboards, maps, models, and more" />
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="feature-card rise-in rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="island-kicker mb-2">Featured path</p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
                {featured.title}
              </h2>
            </div>
            <span className="soft-pill inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-[var(--sea-ink-soft)]">
              <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
              Live charts
            </span>
          </div>

          <p className="max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)]">
            {featured.description}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MiniFeature label="Focus" value="Poverty + GDP" note="See the big picture first." />
            <MiniFeature label="Reading flow" value="Charts first" note="Then drill into tables and sources." />
            <MiniFeature label="Why return" value="Fresh data" note="The page evolves with updates and news." />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/categories/${featured.slug}`}
              className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
            >
              Open the flagship page
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/news"
              className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
            >
              See what is new
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>

        <aside className="grid gap-4">
          <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-2">Why people come back</p>
            <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
              <p className="m-0">
                Live charts update as new indicator series and news stories arrive.
              </p>
              <p className="m-0">
                Research publications sit beside the data, so each page feels more like a mini
                briefing.
              </p>
              <p className="m-0">
                The layout is designed to feel readable, visual, and worth revisiting.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">This week&apos;s entry points</p>
            <div className="grid gap-3">
              {browsePicks.map((category) => (
                <Link
                  key={category.slug}
                  to={`/categories/${category.slug}`}
                  className="group rounded-[1.35rem] border border-[var(--line)] bg-white/65 p-4 no-underline transition hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
                        {category.emoji} {category.title}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[var(--sea-ink-soft)]">
                        {category.examples.slice(0, 1).join(' • ')}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[var(--sea-ink-soft)] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="feature-card rise-in group relative overflow-hidden rounded-[1.8rem] border border-[var(--line)] p-6 no-underline transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--lagoon),var(--lagoon-deep))]" />

            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="island-kicker mb-2">
                  {category.emoji} {category.title}
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                  {category.description}
                </h2>
              </div>
              <ChevronArrow />
            </div>

            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">{category.overview}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {category.examples.slice(0, 2).map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[11px] font-medium text-[var(--sea-ink-soft)]"
                >
                  {example}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <article className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">{note}</p>
    </article>
  )
}

function MiniFeature({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 px-4 py-4">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--kicker)]">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">{note}</p>
    </div>
  )
}

function ChevronArrow() {
  return <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[var(--sea-ink-soft)] transition group-hover:translate-x-1" />
}
