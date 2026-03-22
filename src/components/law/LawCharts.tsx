import { useMemo } from 'react'
import * as d3 from 'd3'

export type BarDatum = {
  label: string
  value: number
}

export type LineDatum = {
  label: string
  value: number
}

export function BarChart({
  title,
  subtitle,
  data,
  formatValue = (value: number) => value.toFixed(1),
  valueSuffix = '',
}: {
  title: string
  subtitle: string
  data: BarDatum[]
  formatValue?: (value: number) => string
  valueSuffix?: string
}) {
  const width = 900
  const height = 320
  const margin = { top: 24, right: 16, bottom: 66, left: 56 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const maxValue = Math.max(...data.map((item) => item.value), 1)
  const x = useMemo(
    () => d3.scaleBand().domain(data.map((item) => item.label)).range([0, innerWidth]).padding(0.22),
    [data, innerWidth],
  )
  const y = useMemo(
    () => d3.scaleLinear().domain([0, maxValue * 1.15]).nice().range([innerHeight, 0]),
    [innerHeight, maxValue],
  )
  const ticks = y.ticks(4)

  return (
    <div>
      <p className="island-kicker mb-2">Chart</p>
      <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{subtitle}</p>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-[18rem] w-full">
        <defs>
          <linearGradient id={`bars-${title.replace(/\s+/g, '-').toLowerCase()}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(37,99,235,0.94)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.72)" />
          </linearGradient>
        </defs>

        <g transform={`translate(${margin.left},${margin.top})`}>
          {ticks.map((tick) => (
            <g key={tick} transform={`translate(0,${y(tick)})`}>
              <line x1="0" x2={innerWidth} stroke="rgba(21,35,59,0.08)" />
              <text x={-12} y={4} textAnchor="end" className="fill-[var(--sea-ink-soft)] text-[11px]">
                {valueSuffix ? `${formatValue(tick)}${valueSuffix}` : formatValue(tick)}
              </text>
            </g>
          ))}

          {data.map((item) => {
            const xPos = x(item.label) ?? 0
            const barHeight = innerHeight - y(item.value)
            const barWidth = x.bandwidth()

            return (
              <g key={item.label} transform={`translate(${xPos},0)`}>
                <rect
                  y={y(item.value)}
                  width={barWidth}
                  height={barHeight}
                  rx={14}
                  fill={`url(#bars-${title.replace(/\s+/g, '-').toLowerCase()})`}
                />
                <text
                  x={barWidth / 2}
                  y={Math.max(y(item.value) - 10, 14)}
                  textAnchor="middle"
                  className="fill-[var(--sea-ink)] text-[11px] font-semibold"
                >
                  {valueSuffix ? `${formatValue(item.value)}${valueSuffix}` : formatValue(item.value)}
                </text>
                <text
                  x={barWidth / 2}
                  y={innerHeight + 22}
                  textAnchor="middle"
                  className="fill-[var(--sea-ink-soft)] text-[11px]"
                >
                  {item.label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export function LineChart({
  title,
  subtitle,
  data,
  formatValue = (value: number) => value.toFixed(1),
  valueSuffix = '',
}: {
  title: string
  subtitle: string
  data: LineDatum[]
  formatValue?: (value: number) => string
  valueSuffix?: string
}) {
  const width = 900
  const height = 320
  const margin = { top: 24, right: 16, bottom: 56, left: 56 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const x = useMemo(() => d3.scalePoint().domain(data.map((item) => item.label)).range([0, innerWidth]), [data, innerWidth])
  const y = useMemo(
    () => d3.scaleLinear().domain([0, Math.max(...data.map((item) => item.value), 1)]).nice().range([innerHeight, 0]),
    [data, innerHeight],
  )
  const line = useMemo(
    () =>
      d3
        .line<LineDatum>()
        .x((item) => x(item.label) ?? 0)
        .y((item) => y(item.value))
        .curve(d3.curveMonotoneX),
    [x, y],
  )
  const area = useMemo(
    () =>
      d3
        .area<LineDatum>()
        .x((item) => x(item.label) ?? 0)
        .y0(innerHeight)
        .y1((item) => y(item.value))
        .curve(d3.curveMonotoneX),
    [innerHeight, x, y],
  )

  return (
    <div>
      <p className="island-kicker mb-2">Seasonal view</p>
      <h3 className="text-lg font-semibold tracking-tight text-[var(--sea-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--sea-ink-soft)]">{subtitle}</p>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-[18rem] w-full">
        <defs>
          <linearGradient id={`line-${title.replace(/\s+/g, '-').toLowerCase()}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(37,99,235,0.3)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0.04)" />
          </linearGradient>
        </defs>

        <g transform={`translate(${margin.left},${margin.top})`}>
          {y.ticks(4).map((tick) => (
            <g key={tick} transform={`translate(0,${y(tick)})`}>
              <line x1="0" x2={innerWidth} stroke="rgba(21,35,59,0.08)" />
              <text x={-12} y={4} textAnchor="end" className="fill-[var(--sea-ink-soft)] text-[11px]">
                {valueSuffix ? `${formatValue(tick)}${valueSuffix}` : formatValue(tick)}
              </text>
            </g>
          ))}

          <path d={area(data) ?? ''} fill={`url(#line-${title.replace(/\s+/g, '-').toLowerCase()})`} />
          <path d={line(data) ?? ''} fill="none" stroke="rgba(37,99,235,0.95)" strokeWidth="3" />

          {data.map((item) => (
            <g key={item.label}>
              <circle cx={x(item.label) ?? 0} cy={y(item.value)} r="4.5" fill="rgba(37,99,235,0.95)" />
              <text
                x={x(item.label) ?? 0}
                y={y(item.value) - 10}
                textAnchor="middle"
                className="fill-[var(--sea-ink)] text-[10px] font-semibold"
              >
                {valueSuffix ? `${formatValue(item.value)}${valueSuffix}` : formatValue(item.value)}
              </text>
            </g>
          ))}

          {data.map((item) => (
            <text
              key={item.label}
              x={x(item.label) ?? 0}
              y={innerHeight + 22}
              textAnchor="middle"
              className="fill-[var(--sea-ink-soft)] text-[11px]"
            >
              {item.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  )
}
