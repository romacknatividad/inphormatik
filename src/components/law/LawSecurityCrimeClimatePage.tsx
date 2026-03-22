import type { ComponentType } from 'react'
import { ArrowUpRight, BookOpen, Scale, ShieldAlert } from 'lucide-react'
import { CategoryMapSection } from '../CategoryMapSection'
import type { Category } from '../../content/categories'
import {
  caseIndexReleases,
  caseIndexYearCounts,
  crimeSnapshots,
  regionalCrimeSnapshots,
  recentPhilippineReports,
} from '../../content/lawSecurityCrimeClimate'
import { BarChart } from './LawCharts'

const numberFormat = new Intl.NumberFormat('en-US')

export function LawSecurityCrimeClimatePage({ category }: { category: Category }) {
  const maxCaseYearCount = Math.max(...caseIndexYearCounts.map((item) => item.releases), 1)
  const crimeRegionValues = regionalCrimeSnapshots.map((entry) => ({
    region: entry.region,
    value: entry.value,
  }))

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <div className="space-y-6">
        <section className="island-shell rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
          <p className="island-kicker mb-3">
            {category.emoji} {category.title}
          </p>
          <h1 className="display-title max-w-4xl text-4xl font-bold tracking-[-0.04em] text-[var(--sea-ink)] sm:text-5xl">
            {category.description}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
            This page surfaces real public-safety and legal records from official Philippine
            sources so the content feels like a proper briefing instead of a placeholder layout.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ToplineCard
              icon={ShieldAlert}
              label="National index crimes"
              value="34,841"
              note="Reported for 2024, down from 38,404 in 2023."
            />
            <ToplineCard
              icon={Scale}
              label="Case-index releases"
              value="9 issues"
              note="2024 releases listed on the Supreme Court E-Library."
            />
            <ToplineCard
              icon={BookOpen}
              label="Legal publications"
              value="3 recent volumes"
              note="Recent Philippine Reports volumes are linked below."
            />
          </div>
        </section>

        <CategoryMapSection
          title="Regional crime-reduction lens"
          description="Recent PNP regional updates are used to shade the map by reported decline rates. It gives the page an immediate geographic reading of how crime-control gains are being described across regions."
          filters={[
            { label: 'Crime reduction', note: 'Regional decline rates from official PNP releases.' },
            { label: 'Legal records', note: 'Supreme Court release cadence and publications.' },
          ]}
          summaryCards={[
            { label: 'Regional snapshots', value: `${regionalCrimeSnapshots.length} regions` },
            { label: 'Crime comparisons', value: `${crimeSnapshots.length} official series` },
            { label: '2024 releases', value: `${maxCaseYearCount} case-index issues` },
          ]}
          regionValues={crimeRegionValues}
          valueLabel="crime decline"
          regionCountLabel="regional snapshots"
          emptyNote="This map is driven by official PNP regional decline snapshots."
        />

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="island-kicker mb-2">Crime Intelligence</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                PNP-reported trends and regional reductions
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
                The chart compares official before-and-after figures from national, regional, and
                short-window PNP releases. It is best read as a briefing snapshot, not a single
                uniform series.
              </p>
            </div>
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs text-[var(--sea-ink-soft)]">
              <ShieldAlert className="mr-2 inline h-4 w-4 align-[-0.2em]" />
              8 official comparisons
            </span>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-4">
              <BarChart
                title="Official decline snapshots"
                subtitle="Each bar shows the percentage drop from the comparison period reported by the source."
                data={crimeSnapshots.map((snapshot) => ({
                  label: snapshot.chartLabel,
                  value: declinePct(snapshot),
                }))}
                formatValue={(value) => value.toFixed(1)}
                valueSuffix="%"
              />
            </article>

            <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-4">
              <p className="island-kicker mb-3">Regional snapshot table</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--line)] text-[11px] uppercase tracking-[0.16em] text-[var(--kicker)]">
                      <th className="pb-3 pr-4 font-semibold">Region</th>
                      <th className="pb-3 pr-4 font-semibold">Window</th>
                      <th className="pb-3 pr-4 font-semibold">Decline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalCrimeSnapshots.map((entry) => (
                      <tr key={`${entry.region}-${entry.window}`} className="border-b border-[var(--line)] last:border-0">
                        <td className="py-3 pr-4 font-medium text-[var(--sea-ink)]">{entry.region}</td>
                        <td className="py-3 pr-4 text-[var(--sea-ink-soft)]">{entry.window}</td>
                        <td className="py-3 pr-4 font-semibold text-[var(--sea-ink)]">
                          {formatPercent(entry.value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-[11px] uppercase tracking-[0.16em] text-[var(--kicker)]">
                  <th className="pb-3 pr-4 font-semibold">Metric</th>
                  <th className="pb-3 pr-4 font-semibold">Comparison</th>
                  <th className="pb-3 pr-4 font-semibold">Before</th>
                  <th className="pb-3 pr-4 font-semibold">After</th>
                  <th className="pb-3 pr-4 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {crimeSnapshots.map((snapshot) => (
                  <tr key={snapshot.label} className="border-b border-[var(--line)] last:border-0">
                    <td className="py-3 pr-4 font-medium text-[var(--sea-ink)]">{snapshot.label}</td>
                    <td className="py-3 pr-4 text-[var(--sea-ink-soft)]">
                      {snapshot.beforeLabel} to {snapshot.afterLabel}
                    </td>
                    <td className="py-3 pr-4 text-[var(--sea-ink-soft)]">
                      {numberFormat.format(snapshot.beforeValue)}
                    </td>
                    <td className="py-3 pr-4 text-[var(--sea-ink-soft)]">
                      {numberFormat.format(snapshot.afterValue)}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-[var(--sea-ink)]">
                      {formatPercent(declinePct(snapshot))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="island-kicker mb-2">Legal References</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Supreme Court release cadence and recent publications
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)]">
                The chart shows how many case-index releases were available by year in the Supreme
                Court E-Library. The publication cards below point to recent Philippine Reports
                volumes.
              </p>
            </div>
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs text-[var(--sea-ink-soft)]">
              <BookOpen className="mr-2 inline h-4 w-4 align-[-0.2em]" />
              Judiciary sources
            </span>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-4">
              <BarChart
                title="Case index releases by year"
                subtitle="The Supreme Court E-Library case-index feed becomes a compact metric when grouped by year."
                data={caseIndexYearCounts.map((item) => ({
                  label: String(item.year),
                  value: item.releases,
                }))}
                formatValue={(value) => String(value)}
              />
            </article>

            <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-4">
              <p className="island-kicker mb-3">Latest case-index releases</p>
              <div className="grid gap-3">
                {caseIndexReleases.map((release) => (
                  <article
                    key={release.label}
                    className="rounded-[1.2rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                      {release.released}
                    </p>
                    <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--sea-ink)]">
                      {release.label}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{release.note}</p>
                    <a
                      href={release.href}
                      target="_blank"
                      rel="noreferrer"
                      className="soft-pill mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
                    >
                      Open PDF
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {recentPhilippineReports.map((report) => (
              <article
                key={report.title}
                className="feature-card rounded-[1.5rem] border border-[var(--line)] p-5"
              >
                <p className="island-kicker mb-2">Philippine Reports</p>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
                  {report.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  Released {report.dateRange}
                </p>
                <a
                  href={report.href}
                  target="_blank"
                  rel="noreferrer"
                  className="soft-pill mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
                >
                  Open volume
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {category.resources?.length ? (
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="mb-4">
              <p className="island-kicker mb-2">Official Sources</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Live links for primary reference
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {category.resources.map((resource) => (
                <article
                  key={resource.title}
                  className="feature-card rounded-[1.4rem] border border-[var(--line)] p-5"
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
      </div>
    </main>
  )
}

function ToplineCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  note: string
}) {
  return (
    <article className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(37,99,235,0.08)] text-[var(--lagoon-deep)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{value}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{note}</p>
    </article>
  )
}

function declinePct(snapshot: { beforeValue: number; afterValue: number }) {
  return ((snapshot.beforeValue - snapshot.afterValue) / snapshot.beforeValue) * 100
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
