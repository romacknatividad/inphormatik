export type CrimeSnapshot = {
  label: string
  chartLabel: string
  beforeLabel: string
  afterLabel: string
  beforeValue: number
  afterValue: number
  source: string
  href: string
}

export type RegionalCrimeSnapshot = {
  region: string
  value: number
  window: string
  source: string
  href: string
}

export type ClimateStation = {
  station: string
  chartLabel: string
  annualRainfall: number
  rainyDays: number
  source: string
  href: string
}

export type MonthlyRainfallPoint = {
  month: string
  rainfall: number
}

export type CaseIndexRelease = {
  label: string
  href: string
  released: string
  note: string
}

export type LegalPublication = {
  title: string
  href: string
  dateRange: string
}

export const crimeSnapshots: CrimeSnapshot[] = [
  {
    label: 'National index crimes',
    chartLabel: 'National',
    beforeLabel: '2023',
    afterLabel: '2024',
    beforeValue: 38404,
    afterValue: 34841,
    source: 'PNP 34th anniversary address',
    href: 'https://pnp.gov.ph/pnp-celebrates-34-years-of-service-with-a-renewed-commitment-to-a-safer-nation/',
  },
  {
    label: 'Cybercrime reports',
    chartLabel: 'Cybercrime',
    beforeLabel: '2023',
    afterLabel: '2024',
    beforeValue: 21300,
    afterValue: 14529,
    source: 'PNP 34th anniversary address',
    href: 'https://pnp.gov.ph/pnp-celebrates-34-years-of-service-with-a-renewed-commitment-to-a-safer-nation/',
  },
  {
    label: 'Eight focus crimes',
    chartLabel: '8FC',
    beforeLabel: 'Nov 3, 2024 - Jan 11, 2025',
    afterLabel: 'Jan 12 - Mar 22, 2025',
    beforeValue: 8950,
    afterValue: 7301,
    source: 'PNP command conference briefing',
    href: 'https://pnp.gov.ph/pnp-chief-pinuri-ang-18-4-na-pagbaba-ng-krimen-binigyang-diin-ang-non-partisanship-sa-command-conference/',
  },
  {
    label: 'PRO 2 total crime volume',
    chartLabel: 'PRO2',
    beforeLabel: 'Q1 2024',
    afterLabel: 'Q1 2025',
    beforeValue: 1937,
    afterValue: 1790,
    source: 'Police Regional Office 2',
    href: 'https://pro2.pnp.gov.ph/author/pro2-valley-cops/page/9/',
  },
  {
    label: 'PRO 7 focus crimes',
    chartLabel: 'PRO7',
    beforeLabel: 'Mar 1 - 25, 2025',
    afterLabel: 'Apr 1 - 25, 2025',
    beforeValue: 3376,
    afterValue: 2994,
    source: 'Police Regional Office 7',
    href: 'https://pro7.pnp.gov.ph/pro7-shatters-crime-records-leads-nation-in-25-day-crime-reduction-surge/',
  },
  {
    label: 'PRO 7 index crimes',
    chartLabel: 'PRO7 index',
    beforeLabel: 'Q1 2024',
    afterLabel: 'Q1 2025',
    beforeValue: 982,
    afterValue: 691,
    source: 'Police Regional Office 7',
    href: 'https://pro7.pnp.gov.ph/pro7-shatters-crime-records-leads-nation-in-25-day-crime-reduction-surge/',
  },
  {
    label: 'PRO 7 index crimes',
    chartLabel: 'PRO7 H1',
    beforeLabel: 'H1 2024',
    afterLabel: 'H1 2025',
    beforeValue: 1635,
    afterValue: 1129,
    source: 'Police Regional Office 7',
    href: 'https://pro7.pnp.gov.ph/pro7-shatters-crime-records-leads-nation-in-25-day-crime-reduction-surge/',
  },
  {
    label: 'PRO 10 index crimes',
    chartLabel: 'PRO10',
    beforeLabel: 'Q1 2025',
    afterLabel: 'Q2 2025',
    beforeValue: 458,
    afterValue: 362,
    source: 'Police Regional Office 10',
    href: 'https://pro10.pnp.gov.ph/%F0%9D%90%8F%F0%9D%90%91%F0%9D%90%8E-%F0%9D%9F%8F%F0%9D%9F%8E-%F0%9D%90%91%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%AB%F0%9D%90%9D%F0%9D%90%AC-%F0%9D%9F%90%F0%9D%9F%8F-%F0%9D%90%82%F0%9D%90%AB/',
  },
]

export const regionalCrimeSnapshots: RegionalCrimeSnapshot[] = [
  {
    region: 'Metropolitan Manila',
    value: 20.27,
    window: 'Mar 1 - 25 vs Apr 1 - 25, 2025',
    source: 'PNP regional oversight update',
    href: 'https://pro7.pnp.gov.ph/pro7-shatters-crime-records-leads-nation-in-25-day-crime-reduction-surge/',
  },
  {
    region: 'Bicol Region (Region V)',
    value: 27.65,
    window: 'Mar 1 - 25 vs Apr 1 - 25, 2025',
    source: 'PNP regional oversight update',
    href: 'https://pro7.pnp.gov.ph/pro7-shatters-crime-records-leads-nation-in-25-day-crime-reduction-surge/',
  },
  {
    region: 'Cagayan Valley (Region II)',
    value: 7.59,
    window: 'Q1 2024 vs Q1 2025',
    source: 'Police Regional Office 2',
    href: 'https://pro2.pnp.gov.ph/author/pro2-valley-cops/page/9/',
  },
  {
    region: 'Central Visayas (Region VII)',
    value: 38.67,
    window: 'Mar 1 - 25 vs Apr 1 - 25, 2025',
    source: 'Police Regional Office 7',
    href: 'https://pro7.pnp.gov.ph/pro7-shatters-crime-records-leads-nation-in-25-day-crime-reduction-surge/',
  },
  {
    region: 'Northern Mindanao (Region X)',
    value: 20.96,
    window: 'Q1 2025 vs Q2 2025',
    source: 'Police Regional Office 10',
    href: 'https://pro10.pnp.gov.ph/%F0%9D%90%8F%F0%9D%90%91%F0%9D%90%8E-%F0%9D%9F%8F%F0%9D%9F%8E-%F0%9D%90%91%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%AB%F0%9D%90%9D%F0%9D%90%AC-%F0%9D%9F%90%F0%9D%9F%8F-%F0%9D%90%82%F0%9D%90%AB/',
  },
]

export const climateStations: ClimateStation[] = [
  {
    station: 'Laoag City, Ilocos Norte',
    chartLabel: 'Laoag',
    annualRainfall: 2187.0,
    rainyDays: 86,
    source: 'PAGASA climatological normals',
    href: 'https://pubfiles.pagasa.dost.gov.ph/pagasaweb/files/cad/CLIMATOLOGICAL%20NORMALS%20%281991-2020%29/LAOAG.pdf',
  },
  {
    station: 'Ambulong, Batangas',
    chartLabel: 'Ambulong',
    annualRainfall: 1816.1,
    rainyDays: 119,
    source: 'PAGASA climatological normals',
    href: 'https://pubfiles.pagasa.dost.gov.ph/pagasaweb/files/cad/CLIMATOLOGICAL%20NORMALS%20%281991-2020%29/AMBULONG.pdf',
  },
  {
    station: 'Tayabas, Quezon',
    chartLabel: 'Tayabas',
    annualRainfall: 3144.7,
    rainyDays: 181,
    source: 'PAGASA climatological normals',
    href: 'https://pubfiles.pagasa.dost.gov.ph/pagasaweb/files/cad/CLIMATOLOGICAL%20NORMALS%20%281991-2020%29/TAYABAS.pdf',
  },
  {
    station: 'Guiuan, Eastern Samar',
    chartLabel: 'Guiuan',
    annualRainfall: 3243.5,
    rainyDays: 193,
    source: 'PAGASA climatological normals',
    href: 'https://pubfiles.pagasa.dost.gov.ph/pagasaweb/files/cad/CLIMATOLOGICAL%20NORMALS%20%281991-2020%29/GUIUAN.pdf',
  },
  {
    station: 'Surigao, Surigao del Norte',
    chartLabel: 'Surigao',
    annualRainfall: 3757.3,
    rainyDays: 192,
    source: 'PAGASA climatological normals',
    href: 'https://pubfiles.pagasa.dost.gov.ph/pagasaweb/files/cad/CLIMATOLOGICAL%20NORMALS%20%281991-2020%29/SURIGAO.pdf',
  },
]

export const tayabasMonthlyRainfall: MonthlyRainfallPoint[] = [
  { month: 'Jan', rainfall: 165.2 },
  { month: 'Feb', rainfall: 132.8 },
  { month: 'Mar', rainfall: 109.6 },
  { month: 'Apr', rainfall: 99.5 },
  { month: 'May', rainfall: 159.7 },
  { month: 'Jun', rainfall: 215.3 },
  { month: 'Jul', rainfall: 273.1 },
  { month: 'Aug', rainfall: 186.4 },
  { month: 'Sep', rainfall: 271.6 },
  { month: 'Oct', rainfall: 452.0 },
  { month: 'Nov', rainfall: 545.2 },
  { month: 'Dec', rainfall: 534.3 },
]

export const caseIndexYearCounts = [
  { year: 2019, releases: 2 },
  { year: 2020, releases: 7 },
  { year: 2021, releases: 12 },
  { year: 2022, releases: 10 },
  { year: 2023, releases: 2 },
  { year: 2024, releases: 9 },
]

export const caseIndexReleases: CaseIndexRelease[] = [
  {
    label: 'November 2024',
    released: 'November 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/case_index/November_2024.pdf',
    note: 'Latest case index release in the E-Library listing.',
  },
  {
    label: 'October 2024',
    released: 'October 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/case_index/October_2024.pdf',
    note: 'Jurisprudence notes from the October 2024 batch.',
  },
  {
    label: 'August - September 2024',
    released: 'August - September 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/case_index/August-September_2024.pdf',
    note: 'Combined issue in the E-Library listing.',
  },
  {
    label: 'July 2024',
    released: 'July 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/case_index/July_2024.pdf',
    note: 'Mid-year case index release.',
  },
  {
    label: 'June 2024',
    released: 'June 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/case_index/June_2024.pdf',
    note: 'Official case index digest for June.',
  },
  {
    label: 'May 2024',
    released: 'May 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/case_index/May_2024.pdf',
    note: 'Part of the 2024 monthly index series.',
  },
]

export const recentPhilippineReports: LegalPublication[] = [
  {
    title: 'Philippine Reports Vol. 961',
    dateRange: 'November 13 - 27, 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/philrep_ebooks/Volume_961.pdf',
  },
  {
    title: 'Philippine Reports Vol. 960',
    dateRange: 'November 4 - 11, 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/philrep_ebooks/Volume_960.pdf',
  },
  {
    title: 'Philippine Reports Vol. 959',
    dateRange: 'October 1 - 30, 2024',
    href: 'https://elibrary.judiciary.gov.ph/assets/pdf/philrep_ebooks/Volume_959.pdf',
  },
]
