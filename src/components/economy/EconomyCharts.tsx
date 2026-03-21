import * as d3 from 'd3'
import type { SeriesPoint } from './economyData'

export function SeriesChartCard({
  title,
  unit,
  color,
  series,
  loading,
}: {
  title: string
  unit: string
  color: string
  series: SeriesPoint[]
  loading: boolean
}) {
  const latest = series.length ? series[series.length - 1] ?? null : null
  const previous = series.length > 1 ? series[series.length - 2] ?? null : null
  const delta = latest && previous ? latest.value - previous.value : null

  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Time Series</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Latest</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {formatValue(latest?.value ?? null, unit)}
          </p>
          <p className="m-0 text-xs text-[var(--sea-ink-soft)]">
            {delta !== null ? `Δ ${formatSignedValue(delta, unit)}` : 'No previous point'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : series.length ? (
        <LineChart series={series} color={color} unit={unit} />
      ) : (
        <ErrorCard message={`No values available for ${title}.`} />
      )}
    </article>
  )
}

export function ScatterChartCard({
  title,
  description,
  points,
  loading,
  correlation,
}: {
  title: string
  description: string
  points: Array<SeriesPoint & { inflation: number }>
  loading: boolean
  correlation: number | null
}) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">Scientific Graph</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{description}</p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">
            Correlation
          </p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {correlation === null ? 'n/a' : correlation.toFixed(2)}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : points.length ? (
        <ScatterChart points={points} />
      ) : (
        <ErrorCard message="Not enough overlapping points to draw the scatter plot yet." />
      )}
    </article>
  )
}

function LineChart({
  series,
  color,
  unit,
}: {
  series: SeriesPoint[]
  color: string
  unit: string
}) {
  const width = 640
  const height = 260
  const margin = { top: 16, right: 20, bottom: 36, left: 52 }
  const xDomain = d3.extent(series, (point) => point.year) as [number, number]
  const yDomain = d3.extent(series, (point) => point.value) as [number, number]
  const x = d3.scaleLinear().domain(expandDomain(xDomain)).range([margin.left, width - margin.right])
  const y = d3.scaleLinear().domain(expandDomain(yDomain)).nice().range([height - margin.bottom, margin.top])
  const line = d3
    .line<SeriesPoint>()
    .x((point) => x(point.year))
    .y((point) => y(point.value))
    .curve(d3.curveMonotoneX)
  const path = line(series) ?? ''
  const xTicks = x.ticks(5)
  const yTicks = y.ticks(4)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
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
            {formatValue(tick, unit)}
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

      <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {series.map((point) => (
        <circle key={point.year} cx={x(point.year)} cy={y(point.value)} r="3.5" fill={color} />
      ))}
    </svg>
  )
}

function ScatterChart({
  points,
}: {
  points: Array<SeriesPoint & { inflation: number }>
}) {
  const width = 640
  const height = 260
  const margin = { top: 16, right: 20, bottom: 36, left: 52 }
  const xDomain = d3.extent(points, (point) => point.value) as [number, number]
  const yDomain = d3.extent(points, (point) => point.inflation) as [number, number]
  const x = d3.scaleLinear().domain(expandDomain(xDomain)).nice().range([margin.left, width - margin.right])
  const y = d3.scaleLinear().domain(expandDomain(yDomain)).nice().range([height - margin.bottom, margin.top])
  const xTicks = x.ticks(4)
  const yTicks = y.ticks(4)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
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
            {formatValue(tick, '%')}
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
            {formatValue(tick, '%')}
          </text>
        </g>
      ))}

      {points.map((point) => (
        <circle
          key={point.year}
          cx={x(point.value)}
          cy={y(point.inflation)}
          r="5"
          fill="var(--lagoon-deep)"
          fillOpacity="0.9"
        />
      ))}
    </svg>
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

function formatValue(value: number | null, unit: string): string {
  if (value === null) {
    return 'n/a'
  }

  if (unit === 'US$') {
    return value >= 1000
      ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  }

  return `${value.toFixed(1)}${unit}`
}

function formatSignedValue(value: number, unit: string): string {
  const prefix = value > 0 ? '+' : ''
  return `${prefix}${formatValue(Math.abs(value), unit)}`
}
