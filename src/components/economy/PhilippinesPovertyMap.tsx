import { useMemo, useState } from 'react'
import * as d3 from 'd3'
import type { RegionalPovertyInsights, SeriesPoint } from './economyData'
import regionsGeojson from '../../content/philippines-regions.bit.json'

type RegionFeatureCollection = {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    properties: { REGION?: string }
    geometry: { type: string; coordinates: unknown }
  }>
}

const regionMapData = regionsGeojson as RegionFeatureCollection

export function PhilippinesPovertyMapCard({
  summary,
  loading,
}: {
  summary: RegionalPovertyInsights | null
  loading: boolean
}) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const width = 820
  const height = 620

  const featureCollection = regionMapData
  const valueByRegion = useMemo(() => {
    const map = new Map<string, number>()
    summary?.regions.forEach((region) => {
      map.set(normalizeRegionName(region.label), latestValue(region.points))
    })
    return map
  }, [summary])

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
    activeRegion && summary ? valueByRegion.get(normalizeRegionName(activeRegion)) ?? null : null

  const highest = summary?.highest ?? null
  const lowest = summary?.lowest ?? null

  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Philippine Map</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">
            Regional poverty heat map
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--sea-ink-soft)]">
            Each region is shaded by the latest poverty rate so the national spread is visible at a
            glance.
          </p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Coverage</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {summary ? `${summary.regionCount} regions` : 'n/a'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
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
                Selected region
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--sea-ink)]">
                {activeRegion ?? 'Hover a region'}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">
                {activeRegionValue === null
                  ? 'Move the cursor over the map to compare regions.'
                  : `Latest poverty rate: ${activeRegionValue.toFixed(1)}%`}
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

            <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--kicker)]">
                Fast read
              </p>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-[var(--sea-ink-soft)]">
                <p className="m-0">
                  Highest: {highest ? `${highest.label} ${highest.value.toFixed(1)}%` : 'n/a'}
                </p>
                <p className="m-0">
                  Lowest: {lowest ? `${lowest.label} ${lowest.value.toFixed(1)}%` : 'n/a'}
                </p>
                <p className="m-0">
                  Latest year: {summary?.latestYear ? String(summary.latestYear) : 'n/a'}
                </p>
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

function latestValue(points: SeriesPoint[]): number {
  return points.length ? points[points.length - 1]!.value : Number.NaN
}

function formatLegendValue(value: number): string {
  return `${value.toFixed(1)}%`
}
