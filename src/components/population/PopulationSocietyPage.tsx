import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Category } from '../../content/categories'
import { getCategoryAgencies } from '../../content/categoryAgencies'
import { getResearchPublications } from '../../content/researchPublications'
import {
  householdTimeline,
  nationalCensusTimeline,
  populationSources,
  populationStats,
  regionalPopulation2024,
} from '../../content/populationSociety'
import { BarChart, LineChart } from '../law/LawCharts'
import { AgencyContactsSection } from '../AgencyContactsSection'
import { ResearchPublicationsSection } from '../ResearchPublications'

export function PopulationSocietyPage({ category }: { category: Category }) {
  const researchPublications = getResearchPublications(category.slug)
  const agencies = getCategoryAgencies(category.slug)

  const nationalTimeline = nationalCensusTimeline.map((point) => ({
    label: String(point.year),
    value: roundToOne(point.totalPopulation / 1_000_000),
  }))

  const householdSizeTimeline = householdTimeline.map((point) => ({
    label: String(point.year),
    value: point.averageHouseholdSize,
  }))

  const householdCountTimeline = householdTimeline.map((point) => ({
    label: String(point.year),
    value: roundToOne(point.households / 1_000_000),
  }))

  const censusGrowth = nationalCensusTimeline
    .slice(1)
    .map((point, index) => ({
      label: `${nationalCensusTimeline[index].year}-${point.year}`,
      value: roundToOne((point.totalPopulation - nationalCensusTimeline[index].totalPopulation) / 1_000_000),
    }))

  const regionalRows = [...regionalPopulation2024].sort((left, right) => right.population - left.population)
  const topRegions = regionalRows.slice(0, 10).map((entry) => ({
    label: shortRegionLabel(entry.region),
    value: roundToOne(entry.population / 1_000_000),
  }))

  return (
    <main className="page-wrap px-4 pb-20 pt-14 sm:pt-20">
      <div className="space-y-8">
        <section className="island-shell rise-in rounded-[2rem] border border-[var(--line)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <p className="island-kicker mb-1">
                {category.emoji} {category.title}
              </p>
              <h1 className="display-title text-4xl font-bold tracking-[-0.04em] text-[var(--sea-ink)] sm:text-5xl">
                {category.description}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
                {category.overview}
              </p>
            </div>

            <Link to="/" className="soft-pill inline-flex items-center gap-2 px-4 py-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to categories
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {populationStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-5"
            >
              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">{stat.note}</p>
            </article>
          ))}
        </section>

        <AgencyContactsSection
          title={`${category.title} agencies`}
          subtitle="Main government institutions for census, migration, and people-centered planning."
          agencies={agencies}
        />

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-2">National Count</p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
              Census counts and long-run growth
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
              The national population moved from 92.34 million in 2010 to 112.73 million in 2024,
              which shows steady growth even as the pace slowed after 2020.
            </p>
            <div className="mt-5">
              <LineChart
                title="Philippine population by census year"
                subtitle="Population shown in millions so the trend is easy to read."
                data={nationalTimeline}
                formatValue={(value) => value.toFixed(1)}
                valueSuffix="M"
              />
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-2">Growth View</p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
              Census-to-census gains
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
              These bars show how much the population increased between the available census years.
              The biggest jump came between 2010 and 2015.
            </p>
            <div className="mt-5">
              <BarChart
                title="Population increase between censuses"
                subtitle="Each bar shows the added population in millions."
                data={censusGrowth}
                formatValue={(value) => value.toFixed(1)}
                valueSuffix="M"
              />
            </div>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-2">Households</p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
              Household size and household growth
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
              Household size has fallen from 5.0 in 2000 to 4.1 in 2020, while the number of
              households kept rising. That is an important shift for housing, transport, and social
              service planning.
            </p>

            <div className="mt-5">
              <LineChart
                title="Average household size"
                subtitle="A smaller average household size suggests changing living arrangements."
                data={householdSizeTimeline}
                formatValue={(value) => value.toFixed(1)}
              />
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-2">Household table</p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
              Census household indicators
            </h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.14em] text-[var(--kicker)]">
                    <th className="border-b border-[var(--line)] px-4 py-3">Year</th>
                    <th className="border-b border-[var(--line)] px-4 py-3">Population</th>
                    <th className="border-b border-[var(--line)] px-4 py-3">Households</th>
                    <th className="border-b border-[var(--line)] px-4 py-3">Avg. size</th>
                  </tr>
                </thead>
                <tbody>
                  {householdTimeline.map((row) => (
                    <tr key={row.year} className="text-sm text-[var(--sea-ink)]">
                      <td className="border-b border-[var(--line)] px-4 py-3 font-medium">
                        {row.year}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3">
                        {formatMillions(row.totalPopulation)}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3">
                        {formatMillions(row.households)}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3">
                        {row.averageHouseholdSize.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <MiniStat label="2020 household population" value={formatMillions(108667043)} />
              <MiniStat label="2020 households" value={formatMillions(26393906)} />
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="island-kicker mb-2">Regional Distribution</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--sea-ink)]">
                Where the population is concentrated
              </h2>
            </div>
            <p className="max-w-md text-right text-sm leading-7 text-[var(--sea-ink-soft)]">
              The regional breakdown helps explain why service demand, commuting pressure, and
              planning priorities vary so widely across the Philippines.
            </p>
          </div>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <BarChart
                  title="Top 10 regions by 2024 population"
                  subtitle="A quick read on where most Filipinos live."
                  data={topRegions}
                  formatValue={(value) => value.toFixed(1)}
                  valueSuffix="M"
                />
              </div>

              <div className="grid gap-3">
                <MiniStat label="Official 2024 population" value={formatMillions(112729484)} />
              <MiniStat
                label="Population share in top 3 regions"
                  value={topThreeShare()}
                />
                <MiniStat label="Largest region" value="CALABARZON" />
                <MiniStat label="Smallest region" value="CAR" />
                <MiniStat
                  label="Regional sources"
                  value={`${regionalRows.length} official releases`}
                />
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="island-kicker mb-2">Regional Table</p>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--sea-ink)]">
                  All regions in 2024
                </h3>
              </div>
              <p className="text-sm leading-7 text-[var(--sea-ink-soft)]">
                Sorted from largest to smallest population.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.14em] text-[var(--kicker)]">
                    <th className="border-b border-[var(--line)] px-4 py-3">Region</th>
                    <th className="border-b border-[var(--line)] px-4 py-3">Population</th>
                    <th className="border-b border-[var(--line)] px-4 py-3">Share</th>
                    <th className="border-b border-[var(--line)] px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalRows.map((region) => (
                    <tr key={region.region} className="text-sm text-[var(--sea-ink)]">
                      <td className="border-b border-[var(--line)] px-4 py-3 font-medium">
                        {region.region}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3">
                        {formatMillions(region.population)}
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3">
                        {((region.population / 112729484) * 100).toFixed(1)}%
                      </td>
                      <td className="border-b border-[var(--line)] px-4 py-3">
                        <a
                          href={region.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-medium text-[var(--lagoon-deep)] no-underline"
                        >
                          Open source
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">Reading guide</p>
            <div className="grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
              <p className="m-0">
                Start with the national timeline to understand overall growth, then move to
                household trends to see how living arrangements changed.
              </p>
              <p className="m-0">
                The regional table explains where population pressure is concentrated and where
                local planning needs are likely to be highest.
              </p>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="island-kicker mb-3">Official sources</p>
            <div className="grid gap-3">
              {populationSources.map((source) => (
                <article
                  key={source.title}
                  className="rounded-[1.35rem] border border-[var(--line)] bg-white/60 p-4"
                >
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                    {source.source}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--sea-ink)]">
                    {source.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
                    {source.description}
                  </p>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="soft-pill mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
                  >
                    Open source
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </article>
        </section>

        {researchPublications.length ? (
          <ResearchPublicationsSection
            title={`${category.title} papers`}
            subtitle="Selected research that adds context to population and society questions in the Philippines."
            publications={researchPublications}
          />
        ) : null}
      </div>
    </main>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-[var(--line)] bg-white/60 px-4 py-3">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--sea-ink)]">{value}</p>
    </div>
  )
}

function formatMillions(value: number): string {
  return `${(value / 1_000_000).toFixed(1)}M`
}

function roundToOne(value: number): number {
  return Math.round(value * 10) / 10
}

function shortRegionLabel(region: string): string {
  if (region.includes('National Capital Region')) return 'NCR'
  if (region.includes('Region IV-A')) return 'CALABARZON'
  if (region.includes('Region III')) return 'Central Luzon'
  if (region.includes('Region VII')) return 'Central Visayas'
  if (region.includes('Region V')) return 'Bicol'
  if (region.includes('Region XI')) return 'Davao'
  if (region.includes('Region I')) return 'Ilocos'
  if (region.includes('Region X')) return 'N. Mindanao'
  if (region.includes('Negros Island Region')) return 'NIR'
  if (region.includes('Region VI')) return 'W. Visayas'
  if (region.includes('Region VIII')) return 'E. Visayas'
  if (region.includes('Region XII')) return 'SOCCSKSARGEN'
  if (region.includes('Region IX')) return 'Zamboanga'
  if (region.includes('Region II')) return 'Cagayan Valley'
  if (region.includes('MIMAROPA')) return 'MIMAROPA'
  if (region.includes('Region XIII')) return 'Caraga'
  if (region.includes('Cordillera')) return 'CAR'
  if (region.includes('BARMM')) return 'BARMM'
  return region
}

function topThreeShare(): string {
  const topThree = [...regionalPopulation2024]
    .sort((left, right) => right.population - left.population)
    .slice(0, 3)
    .reduce((sum, entry) => sum + entry.population, 0)

  return `${((topThree / 112729484) * 100).toFixed(1)}%`
}
