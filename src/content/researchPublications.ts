export type ResearchPublication = {
  title: string
  authors: string[]
  year: number
  href: string
}

export const researchPublicationsByCategory: Record<string, ResearchPublication[]> = {
  'economy-development': [
    {
      title: 'Determinants of GDP Growth in the Philippines: 1970-2020',
      authors: ['Mathew Kieran Lumabao'],
      year: 2023,
      href: 'https://al-kindipublishers.org/index.php/jefas/article/view/4564',
    },
    {
      title: 'Poverty in the Philippines: Causes, Constraints and Opportunities',
      authors: ['Fernando T. Aldaba'],
      year: 2009,
      href: 'https://archium.ateneo.edu/economics-faculty-pubs/65/',
    },
    {
      title: 'Poverty Measurement and Decomposition of Aggregate Poverty Change in the Philippines',
      authors: ['Marichu Fajardo-Duka'],
      year: 1992,
      href: 'https://pre.econ.upd.edu.ph/index.php/pre/article/view/154',
    },
    {
      title: 'Income and Happiness: A Philippine Context',
      authors: ['Rosalina Palanca-Tan'],
      year: 2021,
      href: 'https://philjournalsci.dost.gov.ph/publication/regular-issues/past-issues/108-vol-150-no-5-october-2021/1447-income-and-happiness-a-philippine-context',
    },
    {
      title: 'Urban-rural income and wage gaps in the Philippines: measurement error, unequal endowments, or factor market failure?',
      authors: ['Karl Kendrick Chua', 'Louie Limkin', 'John Nye', 'Jeffrey Williamson'],
      year: 2015,
      href: 'https://pre.econ.upd.edu.ph/index.php/pre/article/view/921',
    },
    {
      title: 'Political Dynasties, Business, and Poverty in the Philippines',
      authors: ['Ronald U. Mendoza', 'Jurel K. Yap', 'Gabrielle Ann S. Mendoza', 'Leonardo M. Jaminola III', 'Erica Celine Yu'],
      year: 2022,
      href: 'https://archium.ateneo.edu/asog-pubs/265/',
    },
    {
      title: 'Spatial Disparities and Poverty: The Case of Three Provinces in the Philippines',
      authors: ['Ronald U. Mendoza', 'Rosechin Olfindo', 'Camille Regina Maala'],
      year: 2017,
      href: 'https://doi.org/10.1007/978-3-319-27589-5_2',
    },
    {
      title: 'Dynamics of Growth, Poverty and Inequality: A Panel Analysis of Regional Data from Thailand and the Philippines',
      authors: ['Kyosuke Kurita', 'Takashi Kurosaki'],
      year: 2011,
      href: 'https://doi.org/10.1111/j.1467-8381.2011.02046.x',
    },
    {
      title: 'The Colonial Origins of Comparative Development: An Empirical Investigation',
      authors: ['Daron Acemoglu', 'Simon Johnson', 'James A. Robinson'],
      year: 2001,
      href: 'https://doi.org/10.1257/aer.91.5.1369',
    },
  ],
  'population-society': [
    {
      title: 'The Philippine Population Problem: Myth or Reality',
      authors: ['Mercedes B. Concepcion'],
      year: 2012,
      href: 'https://archium.ateneo.edu/phstudies/vol42/iss2/1/',
    },
    {
      title: 'The Population History of the Philippines: A Genetic Overview',
      authors: ['Frederick C. Delfin'],
      year: 2015,
      href: 'https://archium.ateneo.edu/phstudies/vol63/iss4/2/',
    },
    {
      title: 'The Formulation of Philippine Population Policy',
      authors: ['Maria Elena Lopez', 'Ana Maria Nemenzo'],
      year: 1976,
      href: 'https://archium.ateneo.edu/phstudies/vol24/iss4/4/',
    },
    {
      title: 'Philippine Population',
      authors: ['Vitaliano R. Gorospe'],
      year: 1976,
      href: 'https://archium.ateneo.edu/phstudies/vol24/iss2/10/',
    },
    {
      title: 'Philippine Demography: Population Growth and Manpower in the Philippines',
      authors: ['Jose V. Abueva'],
      year: 1961,
      href: 'https://archium.ateneo.edu/phstudies/vol9/iss4/28/',
    },
    {
      title: 'Birth and Death in Cagayan De Oro: Population Dynamics in a Medium-Sized Philippine City',
      authors: ['Gabriel C. Alvarez'],
      year: 1976,
      href: 'https://archium.ateneo.edu/phstudies/vol24/iss4/18/',
    },
    {
      title: 'Health of Philippine Emigrants Study (HoPES): study design and rationale',
      authors: ['Gilbert C. Gee', 'A. B. de Castro', 'Catherine M. Crespi', 'May C. Wang', 'Karen Llave', 'Eleanor Brindle', 'Nanette R. Lee', 'Maria Midea M. Kabamalan', 'Anna K. Hing'],
      year: 2018,
      href: 'https://doi.org/10.1186/s12889-018-5670-8',
    },
    {
      title: 'Living arrangements of the Filipino elderly',
      authors: ['L. J. Domingo', 'J. B. Casterline'],
      year: 1992,
      href: 'https://pubmed.ncbi.nlm.nih.gov/12317667/',
    },
    {
      title: 'Migration and regional population aging in the Philippines',
      authors: ['J. F. Watkins', 'R. Ulack'],
      year: 1991,
      href: 'https://doi.org/10.1007/BF00120068',
    },
  ],
  'disaster-environment': [
    {
      title: 'Knowledges Integration in Philippine Policies for Disaster and Climate Change Management: A Critical Policy Analysis',
      authors: ['Liberty Pascua de Rivera'],
      year: 2024,
      href: 'https://archium.ateneo.edu/phstudies/vol72/iss1/3/',
    },
    {
      title: 'Understanding the Materiality of Disaster Injustice in Post-disaster Housing Reconstruction',
      authors: ['Pamela Gloria Cajilig', 'Monica F. Santos', 'Simon Mapua Cervantes', 'Olivia Alma Sicam'],
      year: 2023,
      href: 'https://archium.ateneo.edu/phstudies/vol71/iss4/4/',
    },
    {
      title: 'Mapping and Assessing High-Resolution Typhoon Exposure and Vulnerability in the Philippines: A Scoping Review',
      authors: ['J. Andres F. Ignacio'],
      year: 2025,
      href: 'https://archium.ateneo.edu/jmgs/vol12/iss2/8/',
    },
    {
      title: 'Of timelines and timeliness: lessons from Typhoon Haiyan in early disaster response',
      authors: ['Joseph Sedfrey S. Santiago', 'Wilfred S. Manuela Jr.', 'Marion Lara L. Tan', 'Siegfried Kiel Sañez', 'Aldo Zelig U. Tong'],
      year: 2016,
      href: 'https://archium.ateneo.edu/marketing-and-law-faculty-pubs/1/',
    },
    {
      title: 'Community-Based Disaster Risk Management Experience of the Philippines',
      authors: ['Glenn Fernandez', 'Noralene Uy', 'Rajib Shaw'],
      year: 2012,
      href: 'https://doi.org/10.1108/S2040-7262(2012)0000010017',
    },
    {
      title: 'Social Protection and Disaster Risk Management in the Philippines: The Case of Typhoon Yolanda (Haiyan)',
      authors: ['Thomas Bowen'],
      year: 2015,
      href: 'https://doi.org/10.1596/1813-9450-7482',
    },
    {
      title: 'Local-indigenous knowledge on disaster risk reduction: Insights from the Mamanwa indigenous peoples in Basey, Samar after Typhoon Haiyan in the Philippines',
      authors: ['Ginbert Permejo Cuaton', 'Yvonne Su'],
      year: 2020,
      href: 'https://doi.org/10.1016/j.ijdrr.2020.101596',
    },
  ],
  'politics-governance': [
    {
      title: 'Making Sense of the Seal of Good Local Governance: Policy Design Layering and Implications for Shaping Local Government Performance',
      authors: ['Czarina Medina-Guce', 'Robert Sanders Jr.'],
      year: 2024,
      href: 'https://archium.ateneo.edu/dev-stud-faculty-pubs/150/',
    },
    {
      title: 'Governance and Institutions in the Philippines',
      authors: ['Ronald U. Mendoza', 'Rosechin Olfindo', 'Louisa Camille Poco'],
      year: 2017,
      href: 'https://archium.ateneo.edu/asog-pubs/39/',
    },
    {
      title: 'Governance and institutions',
      authors: ['Ronald U. Mendoza', 'Rosechin Olfindo'],
      year: 2018,
      href: 'https://archium.ateneo.edu/asog-pubs/159/',
    },
    {
      title: 'Transformation in Philippine local government',
      authors: ['Mendiola Teng-Calleja', 'Ma. Regina Hechanova', 'Ramon Benedicto A. Alampay', 'Nico Canoy', 'Edna P. Franco', 'Erwin A. Alampay'],
      year: 2017,
      href: 'https://archium.ateneo.edu/psychology-faculty-pubs/84/',
    },
    {
      title: 'Political Dynasties, Business, and Poverty in the Philippines',
      authors: ['Ronald U. Mendoza', 'Jurel K. Yap', 'Gabrielle Ann S. Mendoza', 'Leonardo M. Jaminola III', 'Erica Celine Yu'],
      year: 2022,
      href: 'https://archium.ateneo.edu/asog-pubs/265/',
    },
    {
      title: "Trends in National-Level Governance and Implementation of the Philippines' Responsible Parenthood and Reproductive Health Law from 2014 to 2020",
      authors: ['Vanessa T. Siy Van', 'Jhanna Uy', 'Joy Bagas', 'Valerie Gilbert T. Ulep'],
      year: 2021,
      href: 'https://doi.org/10.9745/GHSP-D-21-00184',
    },
    {
      title: 'The Practice of Power by Regional Managers in the Implementation of an Indigenous Peoples Health Policy in the Philippines',
      authors: ['Ryan C. Guinaran', 'Erlinda B. Alupias', 'Lucy Gilson'],
      year: 2021,
      href: 'https://doi.org/10.34172/ijhpm.2020.246',
    },
    {
      title: 'Election Campaign through Social Media: The Political impact of Facebook, Instagram, Twitter and Youtube on Voting Decision in Lanao Del Sur, Philippines',
      authors: ['Jawad Z. Salic'],
      year: 2023,
      href: 'https://doi.org/10.55927/mudima.v3i4.3245',
    },
  ],
  'technology-social-media': [
    {
      title: 'Sentiment Analysis of Code-Switched Filipino-English Product and Service Reviews Using Transformers-Based Large Language Models',
      authors: ['Camilla Johnine Cosme', 'Marlene M. De Leon'],
      year: 2024,
      href: 'https://doi.org/10.1007/978-981-99-8349-0_11',
    },
    {
      title: 'Contested social representations of a religious ritual in the Philippines: Text mining online discourses on the Traslacion',
      authors: ['Jose S. Medriano III', 'Jose Abelardo Torio'],
      year: 2020,
      href: 'https://archium.ateneo.edu/psychology-faculty-pubs/377/',
    },
    {
      title: 'Fearless, Powerful, Filipino: Identity Positioning in the Hashtag Activism of #BabaeAko',
      authors: ['Aniceta Patricia T. Alingasa', 'Mira Alexis P. Ofreneo'],
      year: 2020,
      href: 'https://archium.ateneo.edu/psychology-faculty-pubs/340/',
    },
    {
      title: 'Application of Naive Bayes Algorithm in Sentiment Analysis of Filipino, English and Taglish Facebook Comments',
      authors: ['Ronel J. Bilog'],
      year: 2020,
      href: 'https://doi.org/10.35940/ijmh.E0524.014520',
    },
    {
      title: 'Attention-based Bilateral LSTM-CNN for the Sentiment Analysis of Code-mixed Filipino-English Social Media Texts',
      authors: ['Reyjohn R. Frias', 'Ruji P. Medina', 'Ariel S. Sison'],
      year: 2023,
      href: 'https://doi.org/10.1109/ICDATE58146.2023.10248926',
    },
    {
      title: 'Attitude towards technology, social media usage and grade-point average as predictors of global citizenship identification in Filipino University Students',
      authors: ['Romeo B. Lee', 'Rito Baring', 'Madelene Sta. Maria', 'Stephen Reysen'],
      year: 2017,
      href: 'https://doi.org/10.1002/ijop.12200',
    },
  ],
  education: [
    {
      title: 'Compulsory Kindergarten Education and Early-Teenage Literacy in the Philippines',
      authors: ['Michael Abrigo', 'Kris Francisco'],
      year: 2023,
      href: 'https://doi.org/10.56506/hcks6480',
    },
    {
      title: 'Teacher Education in the Philippines',
      authors: ['Julieta M. Savellano'],
      year: 2012,
      href: 'https://archium.ateneo.edu/phstudies/vol47/iss2/6/',
    },
    {
      title: 'Education and parenting in the Philippines',
      authors: ['Liane Peña Alampay', 'Aileen S. Garcia'],
      year: 2019,
      href: 'https://archium.ateneo.edu/psychology-faculty-pubs/97/',
    },
    {
      title: 'Toward greater access and impact: Directions for a sociological understanding of Philippine higher education',
      authors: ['Enrique Niño P. Leviste', 'Jose Eos R. Trinidad'],
      year: 2020,
      href: 'https://archium.ateneo.edu/sa-faculty-pubs/74/',
    },
    {
      title: 'The State of Indigenous Education in the Philippines Today',
      authors: ['Jayeel Cornelio', 'David Faustino T. de Castro'],
      year: 2016,
      href: 'https://archium.ateneo.edu/dev-stud-faculty-pubs/29/',
    },
    {
      title: 'Attributions and Attitudes of Mothers and Fathers in the Philippines',
      authors: ['Liane Peña Alampay', 'Rosanne M. Jocson'],
      year: 2011,
      href: 'https://archium.ateneo.edu/psychology-faculty-pubs/159/',
    },
    {
      title: 'English Teacher Education in Postcolonial Philippines',
      authors: ['Maria Luz C. Vilches'],
      year: 2020,
      href: 'https://archium.ateneo.edu/english-faculty-pubs/122/',
    },
    {
      title: 'The health knowledge mechanism: evidence on the link between education and health lifestyle in the Philippines',
      authors: ['Roman Hoffmann'],
      year: 2019,
      href: 'https://doi.org/10.1007/s10198-017-0950-2',
    },
    {
      title: 'Profiling low-proficiency science students in the Philippines using machine learning',
      authors: ['Allan B. I. Bernardo', 'Macario O. Cordel 2nd', 'Marissa Ortiz Calleja', 'Jude Michael M. Teves', 'Sashmir A. Yap', 'Unisse C. Chua'],
      year: 2023,
      href: 'https://doi.org/10.1057/s41599-023-01705-y',
    },
  ],
  agriculture: [
    {
      title: 'Rice Tariffication, Good Governance, and Real Food Security',
      authors: ['Ronald U. Mendoza', 'Ayn G. Torres'],
      year: 2019,
      href: 'https://archium.ateneo.edu/asog-pubs/164/',
    },
    {
      title: 'Rice and Magic: A Cultural History from the Precolonial World to the Present',
      authors: ['Filomeno V. Aguilar Jr.'],
      year: 2013,
      href: 'https://archium.ateneo.edu/history-faculty-pubs/16/',
    },
    {
      title: 'The Agrarian Proletariat in the Rice-Growing Areas of the Philippines',
      authors: ['Filomeno V. Aguilar Jr.'],
      year: 1983,
      href: 'https://archium.ateneo.edu/phstudies/vol31/iss3/4/',
    },
    {
      title: 'Imperative: An Agricultural Policy in the Philippines',
      authors: ['Salvador Araneta'],
      year: 1953,
      href: 'https://archium.ateneo.edu/phstudies/vol1/iss1/2/',
    },
    {
      title: 'Rice Blast Disease Forecasting for Northern Philippines',
      authors: ['Proceso L. Fernandez Jr.', 'Alvin R. Malicdem'],
      year: 2015,
      href: 'https://archium.ateneo.edu/discs-faculty-pubs/79/',
    },
    {
      title: 'Agronomic impacts of climate variability on rice production in the Philippines',
      authors: ['F. P. Lansigan', 'W. L. de los Santos', 'J. O. Coladilla'],
      year: 2000,
      href: 'https://doi.org/10.1016/S0167-8809(00)00222-X',
    },
    {
      title: 'Downscaling Seasonal Climate Forecasts for Risks Management of Rice Production in the Philippines',
      authors: ['Virgilio Julius P. Manzano', 'Amor V. M. Ines'],
      year: 2020,
      href: 'https://doi.org/10.17485/IJST/v13i01/147074',
    },
    {
      title: 'Climate-based suitability assessment for alternate wetting and drying water management in the Philippines: a novel approach for mapping methane mitigation potential in rice production',
      authors: ['Bjoern Ole Sander', 'Reiner Wassmann', 'Leo Kris Palao', 'Andrew Nelson'],
      year: 2017,
      href: 'https://doi.org/10.1080/17583004.2017.1362945',
    },
  ],
}

export function getResearchPublications(slug: string) {
  return researchPublicationsByCategory[slug] ?? []
}
