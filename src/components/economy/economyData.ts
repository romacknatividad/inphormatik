import { useEffect, useMemo, useState } from 'react'
import * as d3 from 'd3'

export type SeriesPoint = {
  year: number
  value: number
}

export type EconomySeriesConfig = {
  key: string
  label: string
  indicator: string
  unit: string
  color: string
}

export type EconomySeries = EconomySeriesConfig & {
  points: SeriesPoint[]
  latest?: SeriesPoint | null
  error?: string | null
}

export type EconomyAnalytics = {
  latestYear: number | null
  latestPoverty: number | null
  latestGrowth: number | null
  latestInflation: number | null
  latestGdpPerCapita: number | null
  avgFiveYearGrowth: number | null
  povertyChange: number | null
  growthInflationCorrelation: number | null
  bestGrowthYear: SeriesPoint | null
}

export type EconomyDashboardData = {
  series: EconomySeries[]
  analytics: EconomyAnalytics
  error: string | null
  regionalPoverty: RegionalPovertyInsights | null
  regionalPovertyError: string | null
}

export type RegionalPovertySeries = {
  code: string
  label: string
  points: SeriesPoint[]
}

export type RegionalPovertySummary = {
  latestYear: number | null
  regionCount: number
  averageLatest: number | null
  nationalLatest: number | null
  highest: { label: string; value: number } | null
  lowest: { label: string; value: number } | null
  biggestImprovement: { label: string; value: number; from: number; to: number } | null
  gap: number | null
  highlightSeries: RegionalPovertySeries[]
  regions: RegionalPovertySeries[]
}

export type RegionalPovertyInsights = RegionalPovertySummary

export const ECONOMY_SERIES: EconomySeriesConfig[] = [
  {
    key: 'gdpPerCapita',
    label: 'GDP per capita (current US$)',
    indicator: 'NY.GDP.PCAP.CD',
    unit: 'US$',
    color: '#1d4ed8',
  },
  {
    key: 'gdpGrowth',
    label: 'GDP growth (annual %)',
    indicator: 'NY.GDP.MKTP.KD.ZG',
    unit: '%',
    color: '#0ea5e9',
  },
  {
    key: 'poverty',
    label: 'Poverty headcount ratio',
    indicator: 'SI.POV.NAHC',
    unit: '%',
    color: '#c2410c',
  },
  {
    key: 'inflation',
    label: 'Inflation, consumer prices',
    indicator: 'FP.CPI.TOTL.ZG',
    unit: '%',
    color: '#16a34a',
  },
]

export function useEconomySeries() {
  const [series, setSeries] = useState<EconomySeries[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      const results = await Promise.allSettled(
        ECONOMY_SERIES.map(async (config) => {
          const response = await fetch(worldBankUrl(config.indicator), {
            signal: controller.signal,
          })

          if (!response.ok) {
            throw new Error(`${config.label} request failed with status ${response.status}.`)
          }

          const payload = await response.json()
          const rows = Array.isArray(payload) ? payload[1] : []
          const points = normalizeWorldBankRows(rows)
          return {
            ...config,
            points,
            latest: points.length ? points[points.length - 1] ?? null : null,
            error: null,
          }
        }),
      )

      if (cancelled) {
        return
      }

      const nextSeries = results.map((result, index) => {
        const config = ECONOMY_SERIES[index]!
        if (result.status === 'fulfilled') {
          return result.value
        }

        return {
          ...config,
          points: [],
          latest: null,
          error:
            result.reason instanceof Error
              ? result.reason.message
              : `Unable to load ${config.label}.`,
        }
      })

      if (nextSeries.some((item) => item.error)) {
        setError('One or more indicators could not be loaded. The page is still usable.')
      }

      setSeries(nextSeries)
      setLoading(false)
    }

    void load()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  return { series, loading, error }
}

export function useEconomyAnalytics(series: EconomySeries[]) {
  return useMemo(() => buildEconomyAnalytics(series), [series])
}

export async function loadEconomyDashboardData(): Promise<EconomyDashboardData> {
  const [results, regionalResult] = await Promise.all([
    Promise.allSettled(
      ECONOMY_SERIES.map(async (config) => {
        const response = await fetch(worldBankUrl(config.indicator))

        if (!response.ok) {
          throw new Error(`${config.label} request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        const rows = Array.isArray(payload) ? payload[1] : []
        const points = normalizeWorldBankRows(rows)
        return {
          ...config,
          points,
          latest: points.length ? points[points.length - 1] ?? null : null,
          error: null,
        }
        }),
      ),
    loadRegionalPovertyInsights()
      .then((value) => ({ ok: true as const, value }))
      .catch((error: unknown) => ({
        ok: false as const,
        error: error instanceof Error ? error : new Error('Unable to load regional poverty data.'),
      })),
  ])

  const series = results.map((result, index) => {
    const config = ECONOMY_SERIES[index]!
    if (result.status === 'fulfilled') {
      return result.value
    }

    return {
      ...config,
      points: [],
      latest: null,
      error:
        result.reason instanceof Error
          ? result.reason.message
          : `Unable to load ${config.label}.`,
    }
  })

  const error = series.some((item) => item.error)
    ? 'One or more indicators could not be loaded. The page is still usable.'
    : null

  return {
    series,
    analytics: buildEconomyAnalytics(series),
    error,
    regionalPoverty: regionalResult.ok ? regionalResult.value : null,
    regionalPovertyError: regionalResult.ok ? null : regionalResult.error.message,
  }
}

export async function loadRegionalPovertyInsights(): Promise<RegionalPovertyInsights> {
  const metadata = await fetchOpenStatPovertyMetadata()
  const regionCodes = ['0', ...extractRegionCodes(metadata)]
  const dataset = await fetchOpenStatPovertyDataset(regionCodes)
  return buildRegionalPovertyInsights(dataset)
}

function extractRegionCodes(metadata: OpenStatMetadata): string[] {
  const geolocation = metadata.variables.find((variable) => variable.code === 'Geolocation')
  if (!geolocation) {
    return []
  }

  return geolocation.valueTexts
    .map((label, index) => ({ code: geolocation.values[index] ?? String(index), label }))
    .filter(({ label }) => label.startsWith('..') && !label.startsWith('....'))
    .map(({ code }) => code)
}

async function fetchOpenStatPovertyMetadata(): Promise<OpenStatMetadata> {
  const response = await fetch(OPENSTAT_POVERTY_TABLE_URL)

  if (!response.ok) {
    throw new Error(`OpenSTAT metadata request failed with status ${response.status}.`)
  }

  return (await response.json()) as OpenStatMetadata
}

async function fetchOpenStatPovertyDataset(regionCodes: string[]): Promise<OpenStatPovertyRecord[]> {
  const response = await fetch(OPENSTAT_POVERTY_TABLE_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: [
        {
          code: 'Geolocation',
          selection: {
            filter: 'item',
            values: regionCodes,
          },
        },
        {
          code: 'Threshold/Incidence/Measures of Precision',
          selection: {
            filter: 'item',
            values: ['1'],
          },
        },
        {
          code: 'Year',
          selection: {
            filter: 'item',
            values: ['0', '1', '2'],
          },
        },
      ],
      response: {
        format: 'csv',
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenSTAT poverty table request failed with status ${response.status}.`)
  }

  const csvText = await response.text()
  return d3.csvParse(csvText, (row) => {
    const record = row as Record<string, string>
    return {
      geolocation: record.Geolocation ?? '',
      year2018: parseNullableNumber(record['Poverty Incidence Among Families (%) 2018']),
      year2021: parseNullableNumber(record['Poverty Incidence Among Families (%) 2021']),
      year2023: parseNullableNumber(record['Poverty Incidence Among Families (%) 2023']),
    }
  })
}

function buildRegionalPovertyInsights(rows: OpenStatPovertyRecord[]): RegionalPovertyInsights {
  const regionMap = new Map<string, RegionalPovertySeries>()

  rows.forEach((row) => {
    if (!row.geolocation) {
      return
    }

    const nextPoints = [
      row.year2018 === null ? null : { year: 2018, value: row.year2018 },
      row.year2021 === null ? null : { year: 2021, value: row.year2021 },
      row.year2023 === null ? null : { year: 2023, value: row.year2023 },
    ].filter((point): point is SeriesPoint => point !== null)

    const code = stripOpenStatLabel(row.geolocation)
    const existing = regionMap.get(code)
    const points = existing?.points ?? []
    points.push(...nextPoints)
    regionMap.set(code, {
      code,
      label: code,
      points,
    })
  })

  const regions = [...regionMap.values()]
    .filter((region) => region.code !== 'PHILIPPINES')
    .map((region) => ({
      ...region,
      points: [...region.points].sort((left, right) => left.year - right.year),
    }))
    .sort((left, right) => latestValue(right) - latestValue(left))

  const latestYear = 2023
  const latestRegions = regions
    .map((region) => ({ region, value: latestPoint(region.points)?.value ?? null }))
    .filter((entry): entry is { region: RegionalPovertySeries; value: number } => entry.value !== null)

  const highest = latestRegions.length
    ? latestRegions.reduce((best, current) => (current.value > best.value ? current : best))
    : null
  const lowest = latestRegions.length
    ? latestRegions.reduce((best, current) => (current.value < best.value ? current : best))
    : null

  const biggestImprovement = regions
    .map((region) => {
      const first = region.points[0]
      const last = latestPoint(region.points)
      if (!first || !last) {
        return null
      }

      return {
        region,
        value: last.value - first.value,
        from: first.value,
        to: last.value,
      }
    })
    .filter(
      (entry): entry is {
        region: RegionalPovertySeries
        value: number
        from: number
        to: number
      } => entry !== null,
    )
    .reduce<{ region: RegionalPovertySeries; value: number; from: number; to: number } | null>(
      (best, current) => {
        if (!best || current.value < best.value) {
          return current
        }

        return best
      },
      null,
    )

  const nationalSeries = regionMap.get('PHILIPPINES') ?? null
  const highlightSeries = [
    nationalSeries,
    highest?.region ?? null,
    lowest?.region ?? null,
    biggestImprovement?.region ?? null,
  ]
    .filter((series): series is RegionalPovertySeries => series !== null)
    .filter(
      (series, index, array) => array.findIndex((candidate) => candidate.code === series.code) === index,
    )

  return {
    latestYear,
    regionCount: regions.length,
    averageLatest:
      latestRegions.length > 0 ? d3.mean(latestRegions, (entry) => entry.value) ?? null : null,
    nationalLatest: latestPoint(nationalSeries?.points ?? [])?.value ?? null,
    highest: highest ? { label: highest.region.label, value: highest.value } : null,
    lowest: lowest ? { label: lowest.region.label, value: lowest.value } : null,
    biggestImprovement: biggestImprovement
      ? {
          label: biggestImprovement.region.label,
          value: biggestImprovement.value,
          from: biggestImprovement.from,
          to: biggestImprovement.to,
        }
      : null,
    gap: highest && lowest ? highest.value - lowest.value : null,
    highlightSeries,
    regions,
  }
}

function latestPoint(points: SeriesPoint[]): SeriesPoint | null {
  return points.length ? points[points.length - 1] ?? null : null
}

function latestValue(region: RegionalPovertySeries): number {
  return latestPoint(region.points)?.value ?? Number.NEGATIVE_INFINITY
}

function stripOpenStatLabel(label: string) {
  return label.replace(/^\.+/, '')
}

type OpenStatMetadata = {
  title: string
  variables: Array<{
    code: string
    text: string
    values: string[]
    valueTexts: string[]
  }>
}

type OpenStatPovertyRecord = {
  geolocation: string
  year2018: number | null
  year2021: number | null
  year2023: number | null
}

const OPENSTAT_POVERTY_TABLE_URL = 'https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB/DB__1E__FY/'

function parseNullableNumber(value: string | undefined): number | null {
  if (!value) {
    return null
  }

  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : null
}

export function getScatterPairs(series: EconomySeries[]): Array<SeriesPoint & { inflation: number }> {
  const growth = series.find((item) => item.key === 'gdpGrowth')?.points ?? []
  const inflation = series.find((item) => item.key === 'inflation')?.points ?? []
  const inflationMap = new Map(inflation.map((point) => [point.year, point.value]))

  return growth
    .map((point) => {
      const matching = inflationMap.get(point.year)
      return matching === undefined
        ? null
        : { year: point.year, value: point.value, inflation: matching }
    })
    .filter(
      (point): point is SeriesPoint & { inflation: number } => point !== null,
    )
}

export function getPovertyGdpPairs(
  series: EconomySeries[],
): Array<{ year: number; gdpPerCapita: number; poverty: number }> {
  const gdpPerCapita = series.find((item) => item.key === 'gdpPerCapita')?.points ?? []
  const poverty = series.find((item) => item.key === 'poverty')?.points ?? []
  const povertyMap = new Map(poverty.map((point) => [point.year, point.value]))

  return gdpPerCapita
    .map((point) => {
      const matching = povertyMap.get(point.year)
      return matching === undefined
        ? null
        : { year: point.year, gdpPerCapita: point.value, poverty: matching }
    })
    .filter(
      (point): point is { year: number; gdpPerCapita: number; poverty: number } => point !== null,
    )
}

function buildEconomyAnalytics(series: EconomySeries[]): EconomyAnalytics {
  const lookup = new Map(series.map((item) => [item.key, item]))
  const gdpPerCapita = lookup.get('gdpPerCapita')?.points ?? []
  const growth = lookup.get('gdpGrowth')?.points ?? []
  const poverty = lookup.get('poverty')?.points ?? []
  const inflation = lookup.get('inflation')?.points ?? []

  const latestYear = Math.max(
    ...[gdpPerCapita, growth, poverty, inflation]
      .flat()
      .map((point) => point.year)
      .filter((year) => Number.isFinite(year)),
  )

  return {
    latestYear: Number.isFinite(latestYear) ? latestYear : null,
    latestPoverty: lastValue(poverty),
    latestGrowth: lastValue(growth),
    latestInflation: lastValue(inflation),
    latestGdpPerCapita: lastValue(gdpPerCapita),
    avgFiveYearGrowth: averageLastValues(growth, 5),
    povertyChange:
      poverty.length >= 2 ? poverty[poverty.length - 1]!.value - poverty[0]!.value : null,
    growthInflationCorrelation: pearsonCorrelation(buildPairs(growth, inflation)),
    bestGrowthYear: growth.length
      ? growth.reduce((best, current) => (current.value > best.value ? current : best))
      : null,
  }
}

function buildPairs(left: SeriesPoint[], right: SeriesPoint[]): Array<[number, number]> {
  const rightMap = new Map(right.map((point) => [point.year, point.value]))
  return left
    .map((point) => {
      const matching = rightMap.get(point.year)
      return matching === undefined ? null : ([point.value, matching] as [number, number])
    })
    .filter((pair): pair is [number, number] => pair !== null)
}

function worldBankUrl(indicator: string) {
  return `https://api.worldbank.org/v2/country/PHL/indicator/${indicator}?format=json&per_page=100`
}

function normalizeWorldBankRows(rows: unknown): SeriesPoint[] {
  if (!Array.isArray(rows)) {
    return []
  }

  return rows
    .map((row) => {
      if (!row || typeof row !== 'object') {
        return null
      }

      const entry = row as Record<string, unknown>
      const year = Number(entry.date)
      const value = Number(entry.value)

      if (!Number.isFinite(year) || !Number.isFinite(value)) {
        return null
      }

      return { year, value }
    })
    .filter((point): point is SeriesPoint => point !== null)
    .sort((left, right) => left.year - right.year)
}

function lastValue(points: SeriesPoint[]): number | null {
  return points.length ? points[points.length - 1]!.value : null
}

function averageLastValues(points: SeriesPoint[], count: number): number | null {
  if (!points.length) {
    return null
  }

  const slice = points.slice(Math.max(0, points.length - count))
  return slice.length ? d3.mean(slice, (point) => point.value) ?? null : null
}

function pearsonCorrelation(pairs: Array<[number, number]>): number | null {
  if (pairs.length < 2) {
    return null
  }

  const xMean = d3.mean(pairs, (pair) => pair[0])
  const yMean = d3.mean(pairs, (pair) => pair[1])

  if (xMean === undefined || yMean === undefined) {
    return null
  }

  let numerator = 0
  let xVariance = 0
  let yVariance = 0

  pairs.forEach(([x, y]) => {
    const xDelta = x - xMean
    const yDelta = y - yMean
    numerator += xDelta * yDelta
    xVariance += xDelta * xDelta
    yVariance += yDelta * yDelta
  })

  const denominator = Math.sqrt(xVariance * yVariance)
  return denominator === 0 ? null : numerator / denominator
}
