import { useMemo, useState } from 'react'
import * as d3 from 'd3'
import regionsGeojson from '../content/philippines-regions.bit.json'

type RegionFeatureCollection = {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    properties: { REGION?: string }
    geometry: { type: string; coordinates: unknown }
  }>
}

export type CategoryMapFilter = {
  label: string
  note: string
}

export type CategoryMapSummaryCard = {
  label: string
  value: string
}

export type CategoryMapRegionValue = {
  region: string
  value: number
}

export function CategoryMapSection({
  title,
  description,
  filters,
  summaryCards,
  regionValues,
  loading = false,
  valueLabel = 'Latest value',
  regionCountLabel = 'regions',
  emptyNote = 'No regional values are connected yet, so this map acts as a geographic preview.',
}: {
  title: string
  description: string
  filters: CategoryMapFilter[]
  summaryCards: CategoryMapSummaryCard[]
  regionValues?: CategoryMapRegionValue[] | null
  loading?: boolean
  valueLabel?: string
  regionCountLabel?: string
  emptyNote?: string
}) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.label ?? 'Overview')
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const featureCollection = regionsGeojson as RegionFeatureCollection
  const width = 820
  const height = 620

  const valueByRegion = useMemo(() => {
    const map = new Map<string, number>()
    regionValues?.forEach((entry) => {
      map.set(normalizeRegionName(entry.region), entry.value)
    })
    return map
  }, [regionValues])

  const values = useMemo(
    () => Array.from(valueByRegion.values()).filter((value) => Number.isFinite(value)),
    [valueByRegion],
  )

  const [minValue, maxValue] = values.length
    ? (d3.extent(values) as [number, number])
    : ([0, 1] as [number, number])

  const color = useMemo(
    () => d3.scaleSequential(d3.interpolateYlOrRd).domain([minValue, maxValue]),
    [minValue, maxValue],
  )

  const { path } = useMemo(() => {
    const projection = d3.geoMercator().fitSize([width, height], featureCollection as never)
    return { path: d3.geoPath(projection) }
  }, [featureCollection])

  const activeRegionValue =
    activeRegion && regionValues
      ? valueByRegion.get(normalizeRegionName(activeRegion)) ?? null
      : null
  const activeFilterDetails = filters.find((filter) => filter.label === activeFilter) ?? filters[0]
  const hasValues = Boolean(regionValues?.length)

  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Map View</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--sea-ink-soft)]">
            {description}
          </p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Coverage</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {regionValues ? `${regionValues.length} ${regionCountLabel}` : 'n/a'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-3">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[32rem] w-full">
              {featureCollection.features.map((feature, index) => {
                const regionName = feature.properties.REGION ?? `Region ${index + 1}`
                const normalized = normalizeRegionName(regionName)
                const value = valueByRegion.get(normalized)
                const active = normalizeRegionName(activeRegion ?? '') === normalized
                const fill = value === undefined ? 'rgba(148, 163, 184, 0.18)' : color(value)

                return (
                  <path
                    key={regionName}
                    d={(path(feature as never) ?? '') as string}
                    fill={fill}
                    stroke={active ? 'var(--lagoon-deep)' : 'rgba(21,35,59,0.25)'}
                    strokeWidth={active ? 2.4 : 1.1}
                    className="transition"
                    onMouseEnter={() => setActiveRegion(regionName)}
                    onMouseLeave={() => setActiveRegion(null)}
                  >
                    <title>
                      {regionName}
                      {value === undefined ? '' : ` - ${value.toFixed(1)}%`}
                    </title>
                  </path>
                )
              })}
            </svg>
          </div>

          <aside className="grid gap-4">
            <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                Selected focus
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--sea-ink)]">{activeFilter}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
                {activeFilterDetails?.note}
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                Filters
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const selected = filter.label === activeFilter
                  return (
                    <button
                      key={filter.label}
                      type="button"
                      onClick={() => setActiveFilter(filter.label)}
                      className={[
                        'rounded-full border px-3 py-2 text-xs font-semibold transition',
                        selected
                          ? 'border-[var(--lagoon-deep)] bg-[rgba(37,99,235,0.08)] text-[var(--sea-ink)]'
                          : 'border-[var(--line)] bg-white/70 text-[var(--sea-ink-soft)]',
                      ].join(' ')}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                Summary
              </p>
              <div className="mt-3 grid gap-3">
                {summaryCards.map((card) => (
                  <div key={card.label} className="rounded-[1rem] border border-[var(--line)] bg-white/65 px-4 py-3">
                    <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--kicker)]">
                      {card.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--sea-ink)]">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                Hover
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
                {hasValues
                  ? activeRegionValue === null
                    ? `Move the cursor over the map to compare ${valueLabel.toLowerCase()}.`
                    : `${activeRegion ?? 'Selected region'}: ${activeRegionValue.toFixed(1)}%`
                  : emptyNote}
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                Legend
              </p>
              <div className="mt-3 space-y-3">
                <LegendRow color={color(minValue)} label={formatLegendValue(minValue)} />
                <LegendRow color={color((minValue + maxValue) / 2)} label="Mid-range" />
                <LegendRow color={color(maxValue)} label={formatLegendValue(maxValue)} />
              </div>
            </div>
          </aside>
        </div>
      )}
    </article>
  )
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-[var(--sea-ink-soft)]">
      <span
        className="h-4 w-4 rounded-full border border-[rgba(21,35,59,0.12)]"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  )
}

function LoadingChart() {
  return (
    <div className="flex h-64 items-center justify-center rounded-[1.35rem] border border-[var(--line)] bg-white/60 text-sm text-[var(--sea-ink-soft)]">
      Loading map...
    </div>
  )
}

function normalizeRegionName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatLegendValue(value: number): string {
  return `${value.toFixed(1)}%`
}
