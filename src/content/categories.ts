export type Category = {
  slug: string
  emoji: string
  title: string
  description: string
  overview: string
  resources?: Array<{
    title: string
    description: string
    href: string
    source: string
  }>
  examples: string[]
  studyAreas: string[]
  outputs: string[]
}

export const categories: Category[] = [
  {
    slug: 'economy-development',
    emoji: '🇵🇭',
    title: 'Economy & Development',
    description:
      'Poverty, GDP, and development indicators that help explain regional gaps and policy outcomes.',
    overview:
      'This category focuses on economic conditions, growth signals, and the practical effect of development programs across the Philippines.',
    resources: [
      {
        title: 'Regional Poverty Table (OpenSTAT)',
        description:
          'PSA OpenSTAT poverty incidence by region and province for 2018, 2021, and 2023.',
        href: 'https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB/DB__1E__FY/',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Official Poverty Statistics',
        description:
          'PSA poverty releases, tables, and reports for national and regional economic analysis.',
        href: 'https://psa.gov.ph/statistics/poverty/node/1684064929',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Poverty Headcount Ratio',
        description:
          'World Bank poverty series for the Philippines, useful for tracking long-run poverty change.',
        href: 'https://data.worldbank.org/indicator/SI.POV.NAHC?locations=PH',
        source: 'World Bank',
      },
      {
        title: 'GDP per Capita',
        description:
          'World Bank GDP per capita series for a quick view of income and output trends.',
        href: 'https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=PH',
        source: 'World Bank',
      },
      {
        title: 'GDP Growth Rate',
        description:
          'World Bank GDP growth series for annual performance and cyclical analysis.',
        href: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG?locations=PH',
        source: 'World Bank',
      },
    ],
    examples: [
      'Philippine Poverty Statistics',
      'Philippine GDP & Economic Indicators',
    ],
    studyAreas: [
      'Poverty incidence and income distribution',
      'Regional disparities and development gaps',
      'Growth trends across sectors over time',
    ],
    outputs: [
      'Policy dashboards',
      'Regional comparison charts',
      'Forecasting and scenario models',
    ],
  },
  {
    slug: 'population-society',
    emoji: '🏙️',
    title: 'Population & Society',
    description:
      'Census and mobility data for understanding demographics, households, and urban behavior.',
    overview:
      'Use this category to study how people are distributed, how households change, and how movement patterns shape public services.',
    resources: [
      {
        title: 'Population and Migration',
        description:
          'OpenSTAT population, vital statistics, and migration-related data for demographic analysis.',
        href: 'https://openstat.psa.gov.ph/Database/Population-and-Migration',
        source: 'Philippine Statistics Authority',
      },
      {
        title: '2024 Census of Population',
        description:
          'Official PSA census counts and population releases for regional and local demographic work.',
        href: 'https://psa.gov.ph/statistics/population-and-housing/node/1684077791',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Transport Statistics',
        description:
          'Transport metadata covering road traffic, mobility, and transport system indicators.',
        href: 'https://openstat.psa.gov.ph/Metadata/Transport',
        source: 'Philippine Statistics Authority',
      },
    ],
    examples: [
      'Philippine Census Data (PSA)',
      'Metro Manila Traffic & Transport Data',
    ],
    studyAreas: [
      'Age, gender, and household structure',
      'Migration and population segmentation',
      'Congestion and travel-time patterns',
    ],
    outputs: [
      'Demographic profiles',
      'City planning visuals',
      'Transport optimization insights',
    ],
  },
  {
    slug: 'disaster-environment',
    emoji: '🌪️',
    title: 'Disaster & Environment',
    description:
      'Climate, seismic, and air quality data for risk analysis and environmental monitoring.',
    overview:
      'This category is built for understanding environmental exposure, disaster impact, and the relationship between location and risk.',
    resources: [
      {
        title: 'Annual Tropical Cyclone Tracks',
        description:
          'PAGASA annual cyclone track pages for typhoon path, timing, and season-level review.',
        href: 'https://bagong.pagasa.dost.gov.ph/information/annual-cyclone-track',
        source: 'PAGASA',
      },
      {
        title: 'Earthquake Information',
        description:
          'PHIVOLCS earthquake information and records for seismic activity analysis.',
        href: 'https://www.phivolcs.dost.gov.ph/index.php/earthquake/earthquake-information3',
        source: 'PHIVOLCS',
      },
      {
        title: 'OpenAQ Explorer',
        description:
          'Open air quality data for Philippine and global monitoring locations.',
        href: 'https://explore.openaq.org/locations/3004174',
        source: 'OpenAQ',
      },
    ],
    examples: [
      'Typhoon Data in the Philippines',
      'Earthquake Dataset (PHIVOLCS)',
      'Air Quality in Philippine Cities',
    ],
    studyAreas: [
      'Historical storm tracks and intensity',
      'Earthquake frequency and geospatial risk',
      'Pollution levels across time and cities',
    ],
    outputs: [
      'Risk maps',
      'Early warning visuals',
      'Environmental monitoring dashboards',
    ],
  },
  {
    slug: 'politics-governance',
    emoji: '🗳️',
    title: 'Politics & Governance',
    description:
      'Election and public-sector datasets for governance, political trends, and regional voting behavior.',
    overview:
      'Study how political outcomes vary by region and year, and how governance data can inform transparent public analysis.',
    resources: [
      {
        title: 'COMELEC Election Results',
        description:
          'Official election results and canvass pages for recent Philippine national and local elections.',
        href: 'https://www.comelec.gov.ph/?r=2022NLE%2FStatistics%2F2022RVVAVmcocfinal',
        source: 'COMELEC',
      },
      {
        title: 'Past Election Results',
        description:
          'COMELEC’s archive of previous election result pages for longitudinal voting analysis.',
        href: 'https://www.comelec.gov.ph/?r=2019NLE%2FElectionResults_',
        source: 'COMELEC',
      },
    ],
    examples: ['Philippine Election Results'],
    studyAreas: [
      'Voting patterns by region',
      'Candidate performance across cycles',
      'Comparative analysis of election years',
    ],
    outputs: [
      'Election dashboards',
      'Trend maps',
      'Regional vote analysis',
    ],
  },
  {
    slug: 'technology-social-media',
    emoji: '📱',
    title: 'Technology & Social Media',
    description:
      'Filipino and Taglish text datasets for NLP, sentiment analysis, and digital behavior research.',
    overview:
      'This category is useful for language-aware analysis of online conversation, public sentiment, and platform behavior.',
    resources: [
      {
        title: 'SentiTaglish: Products and Services',
        description:
          'A Tagalog-English sentiment dataset built from public product and service reviews.',
        href: 'https://huggingface.co/datasets/ccosme/SentiTaglishProductsAndServices',
        source: 'Hugging Face',
      },
      {
        title: 'Filipino Hate Speech Classification',
        description:
          'A Filipino Twitter dataset used for sentiment and hate-speech classification research.',
        href: 'https://huggingface.co/datasets/mteb/FilipinoHateSpeechClassification',
        source: 'Hugging Face',
      },
      {
        title: 'FiReCS',
        description:
          'Filipino-English reviews with code-switching for sentiment analysis and NLP work.',
        href: 'https://huggingface.co/datasets/ccosme/FiReCS',
        source: 'Hugging Face',
      },
    ],
    examples: ['Filipino Tweets / Social Media Sentiment'],
    studyAreas: [
      'Sentiment analysis in Filipino and Taglish',
      'Topic clustering and conversation trends',
      'NLP preprocessing for local language data',
    ],
    outputs: [
      'Sentiment dashboards',
      'Topic maps',
      'Language modeling datasets',
    ],
  },
  {
    slug: 'education',
    emoji: '🎓',
    title: 'Education',
    description:
      'Enrollment, literacy, and dropout datasets for policy work and education planning.',
    overview:
      'Analyze education indicators to understand participation, access, and the changing shape of learning outcomes across regions.',
    resources: [
      {
        title: 'Adult Functional Literacy Rate',
        description:
          'OpenSTAT education indicator for literacy analysis and national educational attainment trends.',
        href: 'https://openstat.psa.gov.ph/Metadata/3K3F1140',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Children Not in School',
        description:
          'OpenSTAT education indicator for school participation and exclusion analysis.',
        href: 'https://openstat.psa.gov.ph/Metadata/3K3F1160',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Out-of-School Children and Youth',
        description:
          'OpenSTAT indicator for age-based education participation gaps.',
        href: 'https://openstat.psa.gov.ph/Metadata/3E3E4100',
        source: 'Philippine Statistics Authority',
      },
    ],
    examples: ['Philippine Education Statistics'],
    studyAreas: [
      'Enrollment and completion patterns',
      'Dropout and literacy trends',
      'Regional education differences',
    ],
    outputs: [
      'School policy dashboards',
      'Performance comparison charts',
      'Predictive education models',
    ],
  },
  {
    slug: 'agriculture',
    emoji: '🍚',
    title: 'Agriculture',
    description:
      'Crop production and rural data for forecasting, supply chains, and agricultural planning.',
    overview:
      'This category helps explore seasonal production, regional output, and the broader role of agriculture in local economies.',
    resources: [
      {
        title: 'Agricultural Accounts',
        description:
          'OpenSTAT agricultural accounts and production statistics, including regional and provincial views.',
        href: 'https://openstat.psa.gov.ph/Database/Agriculture-Forestry-Fisheries/Agricultural-Accounts',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Agricultural Account Metadata',
        description:
          'Metadata for agricultural production and supply-utilization indicators, including rice and corn accounts.',
        href: 'https://openstat.psa.gov.ph/Metadata/Agriculture-Forestry-Fisheries/Agricultural-Account',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Food Security Indicators',
        description:
          'Support indicators that can help with crop production, availability, and supply analysis.',
        href: 'https://openstat.psa.gov.ph/Featured/PhilFSIS/Food-Security-Indicators-Metadata',
        source: 'Philippine Statistics Authority',
      },
    ],
    examples: ['Rice Production in the Philippines'],
    studyAreas: [
      'Yield trends across time and regions',
      'Seasonality and harvest patterns',
      'Food supply and forecasting signals',
    ],
    outputs: [
      'Production dashboards',
      'Regional yield comparisons',
      'Supply chain analysis',
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((category) => category.slug === slug) ?? null
}
