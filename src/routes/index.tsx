import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { categories } from '../content/categories'

export const Route = createFileRoute('/')({
  component: FocusHubPage,
})

function FocusHubPage() {
  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <section className="zen-section island-shell rise-in px-6 py-10 sm:px-10 sm:py-14">
        <div className="relative z-10 max-w-5xl">
          <div className="hero-chip mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)]">
            Philippine data categories
          </div>
          <h1 className="display-title mb-5 text-5xl leading-[0.95] font-bold tracking-[-0.04em] text-[var(--sea-ink)] sm:text-7xl">
            Explore public data through clean, focused topic pages.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
            Each card opens a category page with the kinds of datasets, questions,
            and outputs you can build from Philippine public information.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="feature-card rise-in group rounded-[1.8rem] border border-[var(--line)] p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="island-kicker mb-2">
                  {category.emoji} {category.title}
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                  {category.description}
                </h2>
              </div>
              <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[var(--sea-ink-soft)] transition group-hover:translate-x-1" />
            </div>

            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {category.overview}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
