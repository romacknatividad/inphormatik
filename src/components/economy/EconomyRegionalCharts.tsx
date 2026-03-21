import * as d3 from 'd3'
import type { RegionalPovertyInsights, RegionalPovertySeries, SeriesPoint } from './economyData'

export function RegionalPovertyChartCard({
  title,
  description,
  summary,
  loading,
}: {
  title: string
  description: string
  summary: RegionalPovertyInsights | null
  loading: boolean
}) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Regional Gap</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{description}</p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Coverage</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {summary ? `${summary.regionCount} regions` : 'n/a'}
          </p>
          <p className="m-0 text-xs text-[var(--sea-ink-soft)]">
            {summary?.latestYear ? `Latest year: ${summary.latestYear}` : 'No year loaded yet'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : summary && summary.regions.length ? (
        <HorizontalBarChart regions={summary.regions} />
      ) : (
        <ErrorCard message="No regional poverty data is available yet." />
      )}
    </article>
  )
}

export function RegionalTrendChartCard({
  title,
  description,
  summary,
  loading,
}: {
  title: string
  description: string
  summary: RegionalPovertyInsights | null
  loading: boolean
}) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Policy Outcomes</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{description}</p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Series</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {summary ? `${summary.highlightSeries.length} lines` : 'n/a'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : summary && summary.highlightSeries.length ? (
        <MultiLineChart series={summary.highlightSeries} />
      ) : (
        <ErrorCard message="No trend series are available yet." />
      )}
    </article>
  )
}

function HorizontalBarChart({ regions }: { regions: RegionalPovertySeries[] }) {
  const sorted = [...regions].sort((left, right) => latestValue(right) - latestValue(left))
  const width = 760
  const margin = { top: 16, right: 24, bottom: 36, left: 180 }
  const rowHeight = 24
  const height = Math.max(360, margin.top + margin.bottom + sorted.length * rowHeight)
  const xDomain = d3.extent(sorted, (region) => latestValue(region)) as [number, number]
  const x = d3
    .scaleLinear()
    .domain([0, Math.max(xDomain[1] ?? 0, 1)])
    .nice()
    .range([margin.left, width - margin.right])
  const y = d3
    .scaleBand<string>()
    .domain(sorted.map((region) => region.label))
    .range([margin.top, height - margin.bottom])
    .padding(0.28)
  const xTicks = x.ticks(5)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[32rem] w-full">
      {xTicks.map((tick) => (
        <g key={tick} transform={`translate(${x(tick)},0)`}>
          <line
            y1={margin.top}
            y2={height - margin.bottom}
            x1={0}
            x2={0}
            stroke="rgba(37,99,235,0.08)"
          />
          <text
            y={height - margin.bottom + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--sea-ink-soft)"
          >
            {formatValue(tick)}
          </text>
        </g>
      ))}

      {sorted.map((region) => {
        const value = latestValue(region)
        const bandY = y(region.label) ?? 0
        const bandHeight = y.bandwidth()
        return (
          <g key={region.code} transform={`translate(0,${bandY})`}>
            <text
              x={margin.left - 10}
              y={(bandHeight / 2) + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--sea-ink-soft)"
            >
              {region.label}
            </text>
            <rect
              x={margin.left}
              y={0}
              width={Math.max(0, x(value) - margin.left)}
              height={bandHeight}
              rx="10"
              fill="url(#economyBarGradient)"
            />
            <text
              x={x(value) + 8}
              y={(bandHeight / 2) + 4}
              fontSize="11"
              fill="var(--sea-ink)"
            >
              {formatPercent(value)}
            </text>
          </g>
        )
      })}

      <defs>
        <linearGradient id="economyBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.98" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function MultiLineChart({ series }: { series: RegionalPovertySeries[] }) {
  const width = 760
  const height = 300
  const margin = { top: 22, right: 18, bottom: 34, left: 54 }
  const allPoints = series.flatMap((entry) => entry.points)
  const xDomain = d3.extent(allPoints, (point) => point.year) as [number, number]
  const yDomain = d3.extent(allPoints, (point) => point.value) as [number, number]
  const x = d3.scaleLinear().domain(expandDomain(xDomain)).range([margin.left, width - margin.right])
  const y = d3.scaleLinear().domain(expandDomain(yDomain)).nice().range([height - margin.bottom, margin.top])
  const xTicks = x.ticks(3)
  const yTicks = y.ticks(5)
  const color = d3.scaleOrdinal<string, string>(d3.schemeTableau10).domain(series.map((entry) => entry.label))

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full">
        {yTicks.map((tick) => (
          <g key={tick} transform={`translate(0,${y(tick)})`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={0}
              y2={0}
              stroke="rgba(37,99,235,0.12)"
              strokeDasharray="4 4"
            />
            <text
              x={margin.left - 10}
              y={4}
              textAnchor="end"
              fontSize="10"
              fill="var(--sea-ink-soft)"
            >
              {formatPercent(tick)}
            </text>
          </g>
        ))}

        {xTicks.map((tick) => (
          <g key={tick} transform={`translate(${x(tick)},0)`}>
            <line
              y1={margin.top}
              y2={height - margin.bottom}
              x1={0}
              x2={0}
              stroke="rgba(37,99,235,0.08)"
            />
            <text
              y={height - margin.bottom + 18}
              textAnchor="middle"
              fontSize="10"
              fill="var(--sea-ink-soft)"
            >
              {tick}
            </text>
          </g>
        ))}

        {series.map((entry) => {
          const line = d3
            .line<SeriesPoint>()
            .x((point) => x(point.year))
            .y((point) => y(point.value))
            .curve(d3.curveMonotoneX)

          return (
            <g key={entry.code}>
              <path
                d={line(entry.points) ?? ''}
                fill="none"
                stroke={color(entry.label)}
                strokeWidth="2.75"
                strokeLinecap="round"
              />
              {entry.points.map((point) => (
                <circle
                  key={`${entry.code}-${point.year}`}
                  cx={x(point.year)}
                  cy={y(point.value)}
                  r="3.8"
                  fill={color(entry.label)}
                />
              ))}
            </g>
          )
        })}
      </svg>

      <div className="flex flex-wrap gap-3">
        {series.map((entry) => (
          <div key={entry.code} className="inline-flex items-center gap-2 text-xs text-[var(--sea-ink-soft)]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color(entry.label) }}
            />
            {entry.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function LoadingChart() {
  return (
    <div className="flex h-64 items-center justify-center rounded-[1.35rem] border border-[var(--line)] bg-white/60 text-sm text-[var(--sea-ink-soft)]">
      Loading chart...
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

function expandDomain([min, max]: [number, number]): [number, number] {
  if (min === max) {
    return [min - 1, max + 1]
  }

  return [min, max]
}

function formatValue(value: number | null): string {
  if (value === null) {
    return 'n/a'
  }

  return `${value.toFixed(1)}%`
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

function latestValue(region: RegionalPovertySeries): number {
  const latest = region.points.length ? region.points[region.points.length - 1] : null
  return latest?.value ?? 0
}
