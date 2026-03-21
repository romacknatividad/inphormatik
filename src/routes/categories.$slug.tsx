import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getCategoryBySlug } from '../content/categories'

export const Route = createFileRoute('/categories/$slug')({
  component: CategoryPage,
})

function CategoryPage() {
  const { slug } = Route.useParams()
  const category = getCategoryBySlug(slug)

  if (!category) {
    return (
      <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
        <section className="island-shell rounded-[2rem] border border-[var(--line)] p-8">
          <p className="island-kicker mb-3">Category not found</p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
            This category does not exist.
          </h1>
          <Link to="/" className="soft-pill inline-flex items-center gap-2 px-4 py-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to homepage
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <aside className="space-y-6 lg:sticky lg:top-28">
          <section className="island-shell rounded-[2rem] border border-[var(--line)] p-6">
            <p className="island-kicker mb-3">
              {category.emoji} {category.title}
            </p>
            <h1 className="display-title mb-4 text-4xl font-bold tracking-[-0.04em] text-[var(--sea-ink)]">
              {category.description}
            </h1>
            <p className="text-sm leading-7 text-[var(--sea-ink-soft)]">
              {category.overview}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">Category Details</p>
            <div className="grid gap-3">
              <InfoRow label="Examples" value={`${category.examples.length} datasets`} />
              <InfoRow label="Study areas" value={`${category.studyAreas.length} topics`} />
              <InfoRow label="Outputs" value={`${category.outputs.length} use cases`} />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">What To Look For</p>
            <ul className="m-0 space-y-3 pl-5 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {category.studyAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">Back</p>
            <Link to="/" className="soft-pill inline-flex items-center gap-2 px-4 py-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to categories
            </Link>
          </section>
        </aside>

        <section className="space-y-6">
          <section className="island-shell rise-in rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="island-kicker mb-2">Main Content</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                  Data, source links, charts, and visual analysis
                </h2>
              </div>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs text-[var(--sea-ink-soft)]">
                Built for educational exploration
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {category.examples.map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-5"
                >
                  <p className="island-kicker mb-2">Data Set {index + 1}</p>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
                    {item}
                  </h3>
                  <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                    A clean starting point for building charts, summaries, and category-specific
                    analysis views.
                  </p>
                </article>
              ))}
            </div>
          </section>

          {category.resources?.length ? (
            <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <div className="mb-4">
                <p className="island-kicker mb-2">Official Sources</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                  Live links for primary reference
                </h2>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {category.resources.map((resource) => (
                  <article
                    key={resource.title}
                    className="feature-card rounded-[1.5rem] border border-[var(--line)] p-5"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
                          {resource.title}
                        </h3>
                        <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                          {resource.description}
                        </p>
                      </div>
                      <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[11px] font-medium text-[var(--sea-ink-soft)]">
                        {resource.source}
                      </span>
                    </div>

                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
                    >
                      Open source
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="grid gap-4 xl:grid-cols-3">
            <VisualizationCard
              title="Trend View"
              description="A time-based chart for growth, change, or movement across years and cycles."
              kind="bars"
            />
            <VisualizationCard
              title="Comparison View"
              description="A clean panel for comparing regions, groups, or sectors side by side."
              kind="columns"
            />
            <VisualizationCard
              title="Scientific Graph"
              description="A relationship view for correlations, clustering, and more technical analysis."
              kind="scatter"
            />
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
            <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="island-kicker mb-3">Useful Outputs</p>
              <div className="grid gap-3">
                {category.outputs.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.15rem] border border-[var(--line)] bg-white/60 px-4 py-3 text-sm leading-6 text-[var(--sea-ink-soft)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="island-kicker mb-3">Analysis Notes</p>
              <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                <p className="m-0">
                  This page is organized so the sidebar gives you context, while the main
                  content area holds the data, source links, charts, and scientific visuals.
                </p>
                <p className="m-0">
                  It is a good starting point for dashboards, briefing pages, and research
                  summaries built from Philippine public datasets.
                </p>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.15rem] border border-[var(--line)] bg-white/60 px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
        {label}
      </span>
      <span className="text-sm font-semibold text-[var(--sea-ink)]">{value}</span>
    </div>
  )
}

function VisualizationCard({
  title,
  description,
  kind,
}: {
  title: string
  description: string
  kind: 'bars' | 'columns' | 'scatter'
}) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <p className="island-kicker mb-2">Visualization</p>
      <h3 className="mb-2 text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-7 text-[var(--sea-ink-soft)]">{description}</p>

      <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/60 p-4">
        {kind === 'bars' ? <TrendBars /> : null}
        {kind === 'columns' ? <ComparisonColumns /> : null}
        {kind === 'scatter' ? <ScatterGrid /> : null}
      </div>
    </article>
  )
}

function TrendBars() {
  const bars = [26, 18, 34, 22, 30]

  return (
    <div className="grid h-40 grid-cols-5 items-end gap-3">
      {bars.map((height, index) => (
        <div key={index} className="flex h-full items-end">
          <div
            className="w-full rounded-t-[0.8rem] bg-[linear-gradient(180deg,var(--lagoon),var(--lagoon-deep))]"
            style={{ height: `${height}%` }}
          />
        </div>
      ))}
    </div>
  )
}

function ComparisonColumns() {
  const values = [70, 46, 58]
  return (
    <div className="grid h-40 grid-cols-3 items-end gap-4">
      {values.map((height, index) => (
        <div key={index} className="flex h-full items-end">
          <div
            className="w-full rounded-t-[1rem] bg-[linear-gradient(180deg,rgba(37,99,235,0.75),rgba(14,165,233,0.95))]"
            style={{ height: `${height}%` }}
          />
        </div>
      ))}
    </div>
  )
}

function ScatterGrid() {
  const points = [
    { top: 20, left: 18 },
    { top: 40, left: 28 },
    { top: 30, left: 48 },
    { top: 56, left: 62 },
    { top: 22, left: 72 },
    { top: 64, left: 82 },
  ]

  return (
    <div className="relative h-40 overflow-hidden rounded-[1rem] border border-dashed border-[var(--line)] bg-[linear-gradient(180deg,rgba(37,99,235,0.05),rgba(255,255,255,0.2))]">
      {points.map((point, index) => (
        <span
          key={index}
          className="absolute h-3 w-3 rounded-full bg-[var(--lagoon-deep)] shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
          style={{ top: `${point.top}%`, left: `${point.left}%` }}
        />
      ))}
      <div className="absolute inset-x-4 bottom-6 h-px bg-[rgba(37,99,235,0.16)]" />
      <div className="absolute left-6 top-4 h-[calc(100%-1rem)] w-px bg-[rgba(37,99,235,0.16)]" />
    </div>
  )
}
