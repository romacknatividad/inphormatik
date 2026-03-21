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
        title: 'Philippine Poverty Statistics',
        description:
          'Official PSA poverty releases, tables, and updated statistical reports for national and regional analysis.',
        href: 'https://psa.gov.ph/poverty-press-release',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'Philippine GDP & Economic Indicators',
        description:
          'PSA economic and financial data covering national accounts, growth indicators, and related economic measures.',
        href: 'https://psa.gov.ph/content/economic-financial-data-philippines',
        source: 'Philippine Statistics Authority',
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
