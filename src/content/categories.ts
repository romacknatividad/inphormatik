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
    slug: 'entertainment-music-films-arts',
    emoji: '🎬',
    title: 'Entertainment, Music, Films & Arts',
    description:
      'Film archives, music heritage, and art collections for studying creative culture and media history.',
    overview:
      'Use this category to explore how Philippine music, film, and visual arts are documented, preserved, and analyzed across institutions and archives.',
    resources: [
      {
        title: 'Philippine Film Archive Collection',
        description:
          'A public collection of audiovisual materials, restored titles, and archival records from the FDCP.',
        href: 'https://philippinefilmarchive.fdcp.ph/collection',
        source: 'Film Development Council of the Philippines',
      },
      {
        title: 'Philippine Film Archive Catalogue',
        description:
          'Browse the archive catalogue to explore restored and preserved Philippine film titles.',
        href: 'https://philippinefilmarchive.fdcp.ph/catalogue/filipinas',
        source: 'Film Development Council of the Philippines',
      },
      {
        title: 'Linggo ng Musikang Pilipino',
        description:
          'NCCA’s official initiative for celebrating and promoting Philippine music heritage.',
        href: 'https://ncca.gov.ph/linggo-ng-musikang-pilipino/',
        source: 'National Commission for Culture and the Arts',
      },
      {
        title: 'NCCA Composition Prize',
        description:
          'A program that supports and enriches Philippine concert music literature through original composition.',
        href: 'https://ncca.gov.ph/ncca-composition-prize-2024/',
        source: 'National Commission for Culture and the Arts',
      },
      {
        title: 'National Museum of Fine Arts',
        description:
          'The National Museum’s fine arts collection and research materials for Philippine visual art history.',
        href: 'https://www.nationalmuseum.gov.ph/our-museums/national-museum-of-fine-arts/',
        source: 'National Museum of the Philippines',
      },
    ],
    examples: [
      'Philippine film catalogues and restored titles',
      'Music heritage and composition records',
      'Fine arts collections and artist archives',
    ],
    studyAreas: [
      'Film history and audiovisual preservation',
      'Music heritage and composition analysis',
      'Visual arts collections and curation',
    ],
    outputs: [
      'Archive discovery dashboards',
      'Cultural media timelines',
      'Arts and heritage catalogues',
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
    slug: 'religion-culture-beliefs',
    emoji: '🛕',
    title: 'Religion, Culture & Beliefs',
    description:
      'Religious affiliation, cultural heritage, and identity datasets for understanding beliefs and community life.',
    overview:
      'This category explores how religion, culture, and heritage are measured across the Philippines through census results and cultural inventories.',
    resources: [
      {
        title: 'Religious Affiliation in the Philippines',
        description:
          'PSA’s 2020 Census release on religious affiliation by household population, with regional and provincial breakdowns.',
        href: 'https://psa.gov.ph/content/religious-affiliation-philippines-2020-census-population-and-housing?vcode=xvMkX2',
        source: 'Philippine Statistics Authority',
      },
      {
        title: 'PRECUP - Philippine Registry of Cultural Property',
        description:
          'NCCA’s registry of cultural properties and heritage resources, useful for cultural inventories and preservation work.',
        href: 'https://ncca.gov.ph/philippine-registry-cultural-property-precup/',
        source: 'National Commission for Culture and the Arts',
      },
      {
        title: 'Cultural Mapping Program',
        description:
          'NCCA’s cultural mapping program that helps LGUs build baseline cultural profiles and inventories.',
        href: 'https://ncca.gov.ph/about-ncca-3/ncca-cultural-mapping-program/',
        source: 'National Commission for Culture and the Arts',
      },
      {
        title: 'Sagisag Kultura ng Filipinas',
        description:
          'A cultural database of Philippine symbols, heritage, and icons curated by the NCCA.',
        href: 'https://ncca.gov.ph/philippine-cultural-education-program-pcep/sagisag-kultura/',
        source: 'National Commission for Culture and the Arts',
      },
    ],
    examples: [
      'Religious affiliation by province',
      'Cultural property inventories',
    ],
    studyAreas: [
      'Religious affiliation and social geography',
      'Cultural heritage inventories and mapping',
      'Belief systems and community identity',
    ],
    outputs: [
      'Cultural profile dashboards',
      'Heritage mapping visuals',
      'Community studies and briefs',
    ],
  },
  {
    slug: 'law-security-crime-climate',
    emoji: '⚖️',
    title: 'Law, Security & Crime',
    description:
      'Legal research, public safety, and crime trends for risk and governance analysis.',
    overview:
      'This category brings together legal research tools and public safety statistics to help explore how rules, policing, and justice intersect in the Philippines.',
    resources: [
      {
        title: 'Supreme Court E-Library',
        description:
          'Philippine Supreme Court legal research library for cases, rules, and judicial materials.',
        href: 'https://elibrary.judiciary.gov.ph/elibsearch',
        source: 'Supreme Court of the Philippines',
      },
      {
        title: 'PNP Crime Statistics',
        description:
          'Official Philippine National Police crime statistics portal for crime trend and public safety analysis.',
        href: 'https://pnp.gov.ph/crime-statistics/',
        source: 'Philippine National Police',
      },
      {
        title: 'PNP Nationwide Crime Statistics',
        description:
          'FOI request page for nationwide crime statistics and related public-safety records.',
        href: 'https://www.foi.gov.ph/agencies/pnp/pnp-nationwide-crime-statistics/',
        source: 'Philippines FOI Portal',
      },
    ],
    examples: [
      'Philippine legal cases and rulings',
      'Crime statistics and security trends',
    ],
    studyAreas: [
      'Legal research and jurisprudence',
      'Crime incidence and public safety',
      'Case tracking and law enforcement analytics',
    ],
    outputs: [
      'Policy and legal briefs',
      'Safety monitoring dashboards',
      'Court and police trend visualizations',
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
