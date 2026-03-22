export type CensusPoint = {
  year: number
  totalPopulation: number
  sourceLabel: string
  href: string
}

export type HouseholdPoint = {
  year: number
  totalPopulation: number
  householdPopulation: number
  households: number
  averageHouseholdSize: number
  sourceLabel: string
  href: string
}

export type RegionalPopulationPoint = {
  region: string
  population: number
  sourceLabel: string
  href: string
}

export type PopulationStat = {
  label: string
  value: string
  note: string
}

export const nationalCensusTimeline: CensusPoint[] = [
  {
    year: 2010,
    totalPopulation: 92337852,
    sourceLabel: '2010 Census of Population and Housing',
    href: 'https://psa.gov.ph/content/highlights-philippine-population-2020-census-population-and-housing-2020-cph',
  },
  {
    year: 2015,
    totalPopulation: 100981437,
    sourceLabel: '2015 Census of Population',
    href: 'https://psa.gov.ph/content/highlights-philippine-population-2020-census-population-and-housing-2020-cph',
  },
  {
    year: 2020,
    totalPopulation: 109035343,
    sourceLabel: '2020 Census of Population and Housing',
    href: 'https://psa.gov.ph/content/highlights-philippine-population-2020-census-population-and-housing-2020-cph',
  },
  {
    year: 2024,
    totalPopulation: 112729484,
    sourceLabel: '2024 Census of Population',
    href: 'https://psa.gov.ph/content/2024-census-population-popcen-population-counts-declared-official-president',
  },
]

export const householdTimeline: HouseholdPoint[] = [
  {
    year: 2000,
    totalPopulation: 76506928,
    householdPopulation: 76332470,
    households: 15275046,
    averageHouseholdSize: 5.0,
    sourceLabel: '2000 Census of Population and Housing',
    href: 'https://www.psa.gov.ph/system/files/phcd/2022-12/1_Press%2520Release_Number%2520of%2520Households_RML_032122_rev_RRDH_CRD-signed.pdf',
  },
  {
    year: 2010,
    totalPopulation: 92337852,
    householdPopulation: 92097978,
    households: 20171899,
    averageHouseholdSize: 4.6,
    sourceLabel: '2010 Census of Population and Housing',
    href: 'https://www.psa.gov.ph/system/files/phcd/2022-12/1_Press%2520Release_Number%2520of%2520Households_RML_032122_rev_RRDH_CRD-signed.pdf',
  },
  {
    year: 2015,
    totalPopulation: 100981437,
    householdPopulation: 100573715,
    households: 22975630,
    averageHouseholdSize: 4.4,
    sourceLabel: '2015 Census of Population',
    href: 'https://www.psa.gov.ph/system/files/phcd/2022-12/1_Press%2520Release_Number%2520of%2520Households_RML_032122_rev_RRDH_CRD-signed.pdf',
  },
  {
    year: 2020,
    totalPopulation: 109035343,
    householdPopulation: 108667043,
    households: 26393906,
    averageHouseholdSize: 4.1,
    sourceLabel: '2020 Census of Population and Housing',
    href: 'https://www.psa.gov.ph/system/files/phcd/2022-12/1_Press%2520Release_Number%2520of%2520Households_RML_032122_rev_RRDH_CRD-signed.pdf',
  },
]

export const regionalPopulation2024: RegionalPopulationPoint[] = [
  {
    region: 'Region IV-A (CALABARZON)',
    population: 16933234,
    sourceLabel: 'PSA Region IV-A release',
    href: 'https://psa.gov.ph/content/highlights-region-iv-calabarzon-population-2024-census-population-2024-popcen',
  },
  {
    region: 'National Capital Region (NCR)',
    population: 14001751,
    sourceLabel: 'PSA NCR release',
    href: 'https://psa.gov.ph/content/highlights-national-capital-region-ncr-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region III (Central Luzon)',
    population: 12989074,
    sourceLabel: 'PSA Region III release',
    href: 'https://psa.gov.ph/content/highlights-population-region-iii-central-luzon-2024-census-population-popcen',
  },
  {
    region: 'Region VII (Central Visayas)',
    population: 6640875,
    sourceLabel: 'PSA Region VII release',
    href: 'https://psa.gov.ph/content/highlights-region-vii-central-visayas-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region V (Bicol Region)',
    population: 6064426,
    sourceLabel: 'PSA Region V release',
    href: 'https://psa.gov.ph/content/highlights-region-v-bicol-region-population-2024-census-population-2024-popcen',
  },
  {
    region: 'BARMM',
    population: 5691583,
    sourceLabel: 'PSA BARMM release',
    href: 'https://psa.gov.ph/system/files/phcd/2024%20POPCEN%20Press%20Release_BARMM_ONS-signed.pdf',
  },
  {
    region: 'Region XI (Davao Region)',
    population: 5389422,
    sourceLabel: 'PSA Region XI release',
    href: 'https://psa.gov.ph/content/highlights-region-xi-davao-region-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region I (Ilocos Region)',
    population: 5342453,
    sourceLabel: 'PSA Region I release',
    href: 'https://psa.gov.ph/content/highlights-region-i-ilocos-region-population-2024-census-population-2024-popcen?vcode=1HpQoo',
  },
  {
    region: 'Region X (Northern Mindanao)',
    population: 5178326,
    sourceLabel: 'PSA Region X release',
    href: 'https://psa.gov.ph/content/highlights-region-x-northern-mindanao-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Negros Island Region (NIR)',
    population: 4904944,
    sourceLabel: 'PSA NIR release',
    href: 'https://psa.gov.ph/content/highlights-negros-island-region-nir-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region VI (Western Visayas)',
    population: 4861911,
    sourceLabel: 'PSA Region VI release',
    href: 'https://psa.gov.ph/system/files/phcd/2024%20POPCEN%20Press%20Release_Region%20VI_ONS-signed.pdf',
  },
  {
    region: 'Region VIII (Eastern Visayas)',
    population: 4625929,
    sourceLabel: 'PSA Region VIII release',
    href: 'https://psa.gov.ph/content/highlights-region-viii-eastern-visayas-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region XII (SOCCSKSARGEN)',
    population: 4462776,
    sourceLabel: 'PSA Region XII release',
    href: 'https://psa.gov.ph/content/highlights-region-xii-soccsksargen-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region IX (Zamboanga Peninsula)',
    population: 3943837,
    sourceLabel: 'PSA Region IX release',
    href: 'https://rsso09.psa.gov.ph/highlights-region-ix-zamboanga-peninsula-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region II (Cagayan Valley)',
    population: 3777608,
    sourceLabel: 'PSA Region II release',
    href: 'https://psa.gov.ph/statistics/population-and-housing/node/1684077791',
  },
  {
    region: 'MIMAROPA Region',
    population: 3245446,
    sourceLabel: 'PSA MIMAROPA release',
    href: 'https://psa.gov.ph/content/highlights-mimaropa-region-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Region XIII (Caraga)',
    population: 2865196,
    sourceLabel: 'PSA Caraga release',
    href: 'https://rssocaraga.psa.gov.ph/content/highlights-region-xiii-caraga-population-2024-census-population-2024-popcen',
  },
  {
    region: 'Cordillera Administrative Region (CAR)',
    population: 1808985,
    sourceLabel: 'PSA CAR release',
    href: 'https://psa.gov.ph/content/highlights-cordillera-administrative-region-population-2024-census-population-2024-popcen',
  },
]

export const populationStats: PopulationStat[] = [
  {
    label: 'Official 2024 population',
    value: '112.73M',
    note: 'Declared official by the President in July 2025.',
  },
  {
    label: '2020 household population',
    value: '108.67M',
    note: '99.7% of the 2020 total population.',
  },
  {
    label: '2020 households',
    value: '26.39M',
    note: 'Nationwide household count from the 2020 CPH.',
  },
  {
    label: '2020 urban population',
    value: '58.93M',
    note: 'Equivalent to 54.0% of the Philippine population.',
  },
]

export const populationSources = [
  {
    title: '2024 POPCEN declaration',
    description: 'National and regional 2024 population counts officially declared by PSA.',
    href: 'https://psa.gov.ph/system/files/phcd/1_2024%20POPCEN%20Press%20Release_Declaration%20of%20Count_Revised_ONS-signed_0.pdf',
    source: 'Philippine Statistics Authority',
  },
  {
    title: 'Household population and size',
    description: 'National 2020 household population, number of households, and average household size.',
    href: 'https://www.psa.gov.ph/system/files/phcd/2022-12/1_Press%2520Release_Number%2520of%2520Households_RML_032122_rev_RRDH_CRD-signed.pdf',
    source: 'Philippine Statistics Authority',
  },
  {
    title: 'Population and Migration',
    description: 'OpenSTAT population and migration database for Philippine demographic analysis.',
    href: 'https://openstat.psa.gov.ph/Database/Population-and-Migration',
    source: 'Philippine Statistics Authority',
  },
  {
    title: 'Transport Statistics',
    description: 'OpenSTAT transport metadata for mobility and congestion-related context.',
    href: 'https://openstat.psa.gov.ph/Metadata/Transport',
    source: 'Philippine Statistics Authority',
  },
]

