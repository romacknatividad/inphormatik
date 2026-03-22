import * as d3 from 'd3'
import type { RegionalPovertyInsights, SeriesPoint } from './economyData'

export function RegionalPovertyChangeChartCard({
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
          <p className="island-kicker mb-2">Regional Change</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{description}</p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Range</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {summary ? `${summary.regionCount} regions` : 'n/a'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : summary && summary.regions.length ? (
        <RegionalChangeBars regions={summary.regions} />
      ) : (
        <ErrorCard message="No regional change data is available yet." />
      )}
    </article>
  )
}

export function GDPovertyScatterCard({
  title,
  description,
  points,
  loading,
}: {
  title: string
  description: string
  points: Array<{ year: number; gdpPerCapita: number; poverty: number }>
  loading: boolean
}) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="island-kicker mb-2">GDP + Poverty</p>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{description}</p>
        </div>
        <div className="text-right">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--kicker)]">Points</p>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            {points.length ? `${points.length} years` : 'n/a'}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingChart />
      ) : points.length ? (
        <GDPovertyScatter points={points} />
      ) : (
        <ErrorCard message="No overlapping GDP and poverty points are available yet." />
      )}
    </article>
  )
}

function RegionalChangeBars({ regions }: { regions: RegionalPovertyInsights['regions'] }) {
  const sorted = [...regions]
    .map((region) => {
      const first = region.points[0]?.value ?? null
      const last = region.points[region.points.length - 1]?.value ?? null
      const change = first !== null && last !== null ? last - first : null
      return { ...region, change }
    })
    .filter((region) => region.change !== null)
    .sort((left, right) => (left.change ?? 0) - (right.change ?? 0))

  const width = 820
  const margin = { top: 18, right: 28, bottom: 34, left: 220 }
  const rowHeight = 24
  const height = Math.max(380, margin.top + margin.bottom + sorted.length * rowHeight)
  const values = sorted.map((region) => region.change ?? 0)
  const extent = d3.extent(values) as [number, number]
  const maxAbs = Math.max(Math.abs(extent[0] ?? 0), Math.abs(extent[1] ?? 0), 1)
  const x = d3.scaleLinear().domain([-maxAbs, maxAbs]).range([margin.left, width - margin.right])
  const y = d3
    .scaleBand<string>()
    .domain(sorted.map((region) => region.label))
    .range([margin.top, height - margin.bottom])
    .padding(0.28)
  const xTicks = x.ticks(5)
  const color = d3.scaleLinear<string>().domain([-maxAbs, 0, maxAbs]).range(['#16a34a', '#cbd5e1', '#dc2626'])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[34rem] w-full">
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
            {tick > 0 ? `+${tick.toFixed(1)}` : tick.toFixed(1)}
          </text>
        </g>
      ))}

      <line
        x1={x(0)}
        x2={x(0)}
        y1={margin.top}
        y2={height - margin.bottom}
        stroke="rgba(21,35,59,0.3)"
        strokeWidth="1.4"
      />

      {sorted.map((region) => {
        const value = region.change ?? 0
        const bandY = y(region.label) ?? 0
        const bandHeight = y.bandwidth()
        const xZero = x(0)
        const xValue = x(value)
        const barX = Math.min(xZero, xValue)
        const barWidth = Math.abs(xValue - xZero)

        return (
          <g key={region.code} transform={`translate(0,${bandY})`}>
            <text
              x={margin.left - 10}
              y={bandHeight / 2 + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--sea-ink-soft)"
            >
              {region.label}
            </text>
            <rect
              x={barX}
              y={0}
              width={Math.max(0, barWidth)}
              height={bandHeight}
              rx="10"
              fill={color(value)}
            />
            <text
              x={value >= 0 ? xValue + 8 : xValue - 8}
              y={bandHeight / 2 + 4}
              fontSize="11"
              textAnchor={value >= 0 ? 'start' : 'end'}
              fill="var(--sea-ink)"
            >
              {value > 0 ? '+' : ''}
              {value.toFixed(1)} pts
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function GDPovertyScatter({ points }: { points: Array<{ year: number; gdpPerCapita: number; poverty: number }> }) {
  const width = 820
  const height = 360
  const margin = { top: 18, right: 24, bottom: 44, left: 66 }
  const xDomain = d3.extent(points, (point) => point.gdpPerCapita) as [number, number]
  const yDomain = d3.extent(points, (point) => point.poverty) as [number, number]
  const x = d3.scaleLinear().domain(expandDomain(xDomain)).nice().range([margin.left, width - margin.right])
  const y = d3.scaleLinear().domain(expandDomain(yDomain)).nice().range([height - margin.bottom, margin.top])
  const xTicks = x.ticks(4)
  const yTicks = y.ticks(4)
  const latestYear = points.length ? points[points.length - 1]!.year : null

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-80 w-full">
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
            {tick.toFixed(1)}%
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
            ${tick.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </text>
        </g>
      ))}

      {points.map((point) => {
        const latest = point.year === latestYear
        return (
          <g key={point.year}>
            <circle
              cx={x(point.gdpPerCapita)}
              cy={y(point.poverty)}
              r={latest ? 6.5 : 5}
              fill={latest ? 'var(--lagoon-deep)' : 'rgba(37,99,235,0.72)'}
              fillOpacity={latest ? 1 : 0.82}
              stroke="white"
              strokeWidth="1.5"
            />
            <text
              x={x(point.gdpPerCapita) + 8}
              y={y(point.poverty) - 8}
              fontSize="10"
              fill="var(--sea-ink-soft)"
            >
              {point.year}
            </text>
          </g>
        )
      })}
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
