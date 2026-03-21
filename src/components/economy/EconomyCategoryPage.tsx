import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Category } from '../../content/categories'
import { getResearchPublications } from '../../content/researchPublications'
import {
  ECONOMY_SERIES,
  getScatterPairs,
  type EconomyDashboardData,
} from './economyData'
import { ScatterChartCard, SeriesChartCard } from './EconomyCharts'
import {
  RegionalPovertyChartCard,
  RegionalTrendChartCard,
} from './EconomyRegionalCharts'
import { ResearchPublicationsSection } from '../ResearchPublications'

export function EconomyCategoryPage({
  category,
  dashboard,
}: {
  category: Category
  dashboard: EconomyDashboardData | null
}) {
  const [regionQuery, setRegionQuery] = useState('')
  const loading = dashboard === null
  const error = dashboard?.error ?? null
  const series = dashboard?.series ?? []
  const analytics = dashboard?.analytics ?? {
    latestYear: null,
    latestPoverty: null,
    latestGrowth: null,
    latestInflation: null,
    latestGdpPerCapita: null,
    avgFiveYearGrowth: null,
    povertyChange: null,
    growthInflationCorrelation: null,
    bestGrowthYear: null,
  }
  const regionalPoverty = dashboard?.regionalPoverty ?? null
  const regionalPovertyError = dashboard?.regionalPovertyError ?? null
  const researchPublications = getResearchPublications(category.slug)
  const sourceLinks = category.resources ?? []
  const scatterPairs = getScatterPairs(series)
  const regionalRows = useMemo(() => {
    if (!regionalPoverty) {
      return []
    }

    const query = regionQuery.trim().toLowerCase()
    return [...regionalPoverty.regions]
      .filter((region) => {
        if (!query) {
          return true
        }

        return region.label.toLowerCase().includes(query) || region.code.toLowerCase().includes(query)
      })
      .sort((left, right) => latestYearValue(right) - latestYearValue(left))
  }, [regionalPoverty, regionQuery])

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <div className="space-y-6">
        <section className="island-shell rounded-[2rem] border border-[var(--line)] p-6">
          <p className="island-kicker mb-3">
            {category.emoji} {category.title}
          </p>
          <h1 className="display-title mb-4 text-4xl font-bold tracking-[-0.04em] text-[var(--sea-ink)]">
            {category.description}
          </h1>
          <p className="text-sm leading-7 text-[var(--sea-ink-soft)]">{category.overview}</p>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="island-kicker mb-3">Live metrics</p>
          <div className="grid gap-3">
            <InfoRow
              label="Philippines poverty rate"
              value={formatPercent(regionalPoverty?.nationalLatest ?? null)}
            />
            <InfoRow
              label="Highest regional poverty"
              value={
                regionalPoverty?.highest
                  ? `${regionalPoverty.highest.label} ${formatPercent(regionalPoverty.highest.value)}`
                  : 'n/a'
              }
            />
            <InfoRow
              label="Lowest regional poverty"
              value={
                regionalPoverty?.lowest
                  ? `${regionalPoverty.lowest.label} ${formatPercent(regionalPoverty.lowest.value)}`
                  : 'n/a'
              }
            />
            <InfoRow label="Regional poverty gap" value={formatPercent(regionalPoverty?.gap ?? null)} />
            <InfoRow label="Average across regions" value={formatPercent(regionalPoverty?.averageLatest ?? null)} />
            <InfoRow
              label="Largest improvement"
              value={
                regionalPoverty?.biggestImprovement
                  ? `${regionalPoverty.biggestImprovement.label} ${formatSignedNumber(
                      regionalPoverty.biggestImprovement.value,
                    )}`
                  : 'n/a'
              }
            />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="island-kicker mb-3">Back</p>
          <Link to="/" className="soft-pill inline-flex items-center gap-2 px-4 py-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to categories
          </Link>
        </section>

        <section className="island-shell rise-in rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="island-kicker mb-2">Economy Dashboard</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                D3 charts from live World Bank datasets
              </h2>
            </div>
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs text-[var(--sea-ink-soft)]">
              Built from actual indicator series
            </span>
          </div>

          <div className="grid gap-4">
            {loading ? <LoadingCard /> : error ? <ErrorCard message={error} /> : null}
          </div>
        </section>

        {sourceLinks.length ? (
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="mb-4">
              <p className="island-kicker mb-2">Source links</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Open the datasets behind the charts
              </h2>
            </div>

            <div className="grid gap-4">
              {sourceLinks.map((resource) => (
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

        <section className="space-y-6">
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="island-kicker mb-2">Poverty Section</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                    Poverty gaps and policy outcomes by region
                  </h2>
                </div>
                <p className="max-w-md text-right text-sm leading-7 text-[var(--sea-ink-soft)]">
                  PSA lists 18 regions in the Philippines, and the charts below use the official
                  OpenSTAT poverty table for 2018, 2021, and 2023.
                </p>
              </div>

              {regionalPovertyError ? <ErrorCard message={regionalPovertyError} /> : null}

              {regionalPoverty ? (
                <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="island-kicker mb-2">Poverty Snapshot</p>
                      <h3 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                        National and regional poverty
                      </h3>
                    </div>
                    <p className="text-sm leading-7 text-[var(--sea-ink-soft)]">
                      Sorted high to low so disparities are easy to compare.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <RegionalPovertyChartCard
                      title="Poverty incidence among families by region"
                      description="A ranked bar chart that shows the latest regional poverty snapshot and makes the development gap visible at a glance."
                      summary={regionalPoverty}
                      loading={loading}
                    />

                    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                      <p className="island-kicker mb-3">Gap Summary</p>
                      <div className="grid gap-3">
                        <InfoRow
                          label="Latest year"
                          value={
                            regionalPoverty.latestYear ? String(regionalPoverty.latestYear) : 'n/a'
                          }
                        />
                        <InfoRow
                          label="Regions loaded"
                          value={regionalPoverty ? String(regionalPoverty.regionCount) : 'n/a'}
                        />
                        <InfoRow
                          label="Average region"
                          value={formatPercent(regionalPoverty.averageLatest ?? null)}
                        />
                        <InfoRow
                          label="Largest gap"
                          value={formatPercent(regionalPoverty.gap ?? null)}
                        />
                      </div>

                      <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                        <p className="m-0">
                          {regionalPoverty?.highest
                            ? `Highest poverty in the latest year is ${regionalPoverty.highest.label}, which is a useful signal of where support needs are still greatest.`
                            : 'The regional poverty snapshot has not loaded yet.'}
                        </p>
                        <p className="m-0">
                          {regionalPoverty?.lowest
                            ? `Lowest poverty in the latest year is ${regionalPoverty.lowest.label}, which gives us a useful reference point for the national gap.`
                            : 'The lowest regional value is not available yet.'}
                        </p>
                        <p className="m-0">
                          {regionalPoverty?.biggestImprovement
                            ? `${regionalPoverty.biggestImprovement.label} shows the biggest drop from ${formatPercent(
                                regionalPoverty.biggestImprovement.from,
                              )} to ${formatPercent(regionalPoverty.biggestImprovement.to)} across the loaded years.`
                            : 'A longest-run improvement summary is not available yet.'}
                        </p>
                      </div>
                    </article>
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <label className="flex min-w-[240px] flex-1 flex-col gap-2 text-sm text-[var(--sea-ink-soft)]">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                          Filter regions
                        </span>
                        <input
                          value={regionQuery}
                          onChange={(event) => setRegionQuery(event.target.value)}
                          placeholder="Search region, like NCR or Bicol"
                          className="w-full rounded-full border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-[var(--sea-ink)] outline-none transition focus:border-[rgba(37,99,235,0.4)]"
                        />
                      </label>
                      <p className="text-sm leading-7 text-[var(--sea-ink-soft)]">
                        {regionalRows.length} of {regionalPoverty.regionCount} regions shown
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr className="text-left text-xs uppercase tracking-[0.14em] text-[var(--kicker)]">
                            <th className="border-b border-[var(--line)] px-4 py-3">Region</th>
                            <th className="border-b border-[var(--line)] px-4 py-3">2018</th>
                            <th className="border-b border-[var(--line)] px-4 py-3">2021</th>
                            <th className="border-b border-[var(--line)] px-4 py-3">2023</th>
                            <th className="border-b border-[var(--line)] px-4 py-3">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regionalRows.map((region) => {
                            const points = new Map(region.points.map((point) => [point.year, point.value]))
                            const first = region.points[0]?.value ?? null
                            const last = region.points[region.points.length - 1]?.value ?? null
                            const change = first !== null && last !== null ? last - first : null

                            return (
                              <tr key={region.code} className="text-sm text-[var(--sea-ink)]">
                                <td className="border-b border-[var(--line)] px-4 py-3 font-medium">
                                  {region.label}
                                </td>
                                <td className="border-b border-[var(--line)] px-4 py-3">
                                  {formatPercent(points.get(2018) ?? null)}
                                </td>
                                <td className="border-b border-[var(--line)] px-4 py-3">
                                  {formatPercent(points.get(2021) ?? null)}
                                </td>
                                <td className="border-b border-[var(--line)] px-4 py-3">
                                  {formatPercent(points.get(2023) ?? null)}
                                </td>
                                <td className="border-b border-[var(--line)] px-4 py-3">
                                  {change === null ? 'n/a' : formatSignedNumber(change)}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>
              ) : null}

              <RegionalTrendChartCard
                title="Regional poverty trend comparison"
                description="A small-line chart comparing the national series with the strongest and weakest regional outcomes across the loaded years."
                summary={regionalPoverty}
                loading={loading}
              />
            </section>

            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="island-kicker mb-2">GDP Section</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                    Income and growth
                  </h2>
                </div>
                <p className="max-w-md text-right text-sm leading-7 text-[var(--sea-ink-soft)]">
                  GDP per capita shows long-run income levels, while GDP growth shows economic
                  momentum.
                </p>
              </div>

              <div className="grid gap-4">
                {ECONOMY_SERIES.filter((entry) => entry.key === 'gdpPerCapita' || entry.key === 'gdpGrowth').map(
                  (config) => {
                    const item = series.find((entry) => entry.key === config.key)
                    return (
                      <SeriesChartCard
                        key={config.key}
                        title={config.label}
                        unit={config.unit}
                        color={config.color}
                        series={item?.points ?? []}
                        loading={loading}
                      />
                    )
                  },
                )}
              </div>

              <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                <p className="island-kicker mb-3">GDP Notes</p>
                <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  <p className="m-0">
                    {analytics.latestGdpPerCapita !== null
                      ? `The latest GDP per capita value is ${formatMoney(analytics.latestGdpPerCapita)}, which helps compare income levels over time.`
                      : 'GDP per capita data is not available yet.'}
                  </p>
                  <p className="m-0">
                    {analytics.avgFiveYearGrowth !== null
                      ? `Average GDP growth over the latest five available years is ${formatSignedNumber(
                          analytics.avgFiveYearGrowth,
                        )}.`
                      : 'Not enough GDP growth data is available yet to compute a five-year average.'}
                  </p>
                  <p className="m-0">
                    {analytics.bestGrowthYear
                      ? `The strongest growth year in the loaded series is ${analytics.bestGrowthYear.year}, when GDP growth reached ${formatSignedNumber(
                          analytics.bestGrowthYear.value,
                        )}.`
                      : 'A strongest-growth year summary is not available yet.'}
                  </p>
                </div>
              </article>
            </section>

            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="island-kicker mb-2">Inflation Section</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                    Price pressures and relationship analysis
                  </h2>
                </div>
                <p className="max-w-md text-right text-sm leading-7 text-[var(--sea-ink-soft)]">
                  Inflation helps explain household cost pressure and gives context to growth
                  cycles.
                </p>
              </div>

              <div className="grid gap-4">
                {ECONOMY_SERIES.filter((entry) => entry.key === 'inflation').map((config) => {
                  const item = series.find((entry) => entry.key === config.key)
                  return (
                    <SeriesChartCard
                      key={config.key}
                      title={config.label}
                      unit={config.unit}
                      color={config.color}
                      series={item?.points ?? []}
                      loading={loading}
                    />
                  )
                })}

                <ScatterChartCard
                  title="GDP growth vs inflation"
                  description="A relationship chart showing how annual growth and consumer inflation move together over the same years."
                  points={scatterPairs}
                  loading={loading}
                  correlation={analytics.growthInflationCorrelation}
                />
              </div>

              <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                <p className="island-kicker mb-3">Inflation Notes</p>
                <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  <p className="m-0">
                    {analytics.latestInflation !== null
                      ? `Latest inflation is ${formatPercent(analytics.latestInflation)}, which is the consumer-price context for the rest of the dashboard.`
                      : 'Inflation data is not available yet.'}
                  </p>
                  <p className="m-0">
                    {analytics.growthInflationCorrelation !== null
                      ? `GDP growth and inflation show a ${describeCorrelation(
                          analytics.growthInflationCorrelation,
                        )} relationship (r = ${analytics.growthInflationCorrelation.toFixed(2)}).`
                      : 'Growth and inflation do not yet have enough overlapping data to calculate a correlation.'}
                  </p>
                </div>
              </article>
            </section>
          </section>

          <section className="grid gap-4">
            <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="island-kicker mb-3">Analysis</p>
              <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                <p className="m-0">
                  {analytics.latestYear
                    ? `The latest overlapping year in this dataset is ${analytics.latestYear}.`
                    : 'The dataset is still loading or could not be summarized yet.'}
                </p>
                <p className="m-0">
                  {analytics.povertyChange !== null
                    ? `Poverty moved by ${formatSignedNumber(
                        analytics.povertyChange,
                      )} points between the first and latest available observations.`
                    : 'Poverty data is not complete enough yet to compute a change over time.'}
                </p>
              </div>
            </article>
          </section>

        <section className="grid gap-4">
          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">What to read first</p>
            <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
              <p className="m-0">
                  Start with GDP per capita to understand long-run income and production levels.
                </p>
                <p className="m-0">
                  Then check GDP growth for cyclical swings, followed by poverty and inflation to
                  see how conditions change for households.
                </p>
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="island-kicker mb-3">Use cases</p>
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
              <p className="island-kicker mb-3">Data note</p>
              <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                <p className="m-0">
                  These charts are generated from live indicator series, so values can update as
                  the source datasets publish new years.
                </p>
                <p className="m-0">
                  The page is built for educational exploration and should be checked against the
                  source links before being used in formal reporting.
                </p>
              </div>
            </article>
          </section>

        {researchPublications.length ? (
          <ResearchPublicationsSection
            title={`${category.title} papers`}
            subtitle="Selected publications that connect directly to the data and analysis on this page."
            publications={researchPublications}
          />
        ) : null}
      </div>
    </main>
  )
}

function LoadingCard() {
  return (
    <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 px-5 py-5 text-sm leading-7 text-[var(--sea-ink-soft)]">
      Loading live indicator series from the World Bank API...
    </div>
  )
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[rgba(220,38,38,0.2)] bg-[rgba(254,242,242,0.92)] px-4 py-4 text-sm leading-7 text-red-700">
      {message}
    </div>
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

function formatMoney(value: number | null): string {
  if (value === null) {
    return 'n/a'
  }

  return value >= 1000
    ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}

function formatPercent(value: number | null): string {
  if (value === null) {
    return 'n/a'
  }

  return `${value.toFixed(1)}%`
}

function formatSignedNumber(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}`
}

function describeCorrelation(value: number): string {
  const magnitude = Math.abs(value)
  const direction = value >= 0 ? 'positive' : 'negative'
  if (magnitude >= 0.8) return `strong ${direction}`
  if (magnitude >= 0.5) return `moderate ${direction}`
  if (magnitude >= 0.3) return `weak-to-moderate ${direction}`
  return `weak ${direction}`
}

function latestYearValue(region: { points: Array<{ year: number; value: number }> }): number {
  return region.points.find((point) => point.year === 2023)?.value ?? region.points[region.points.length - 1]?.value ?? 0
}
