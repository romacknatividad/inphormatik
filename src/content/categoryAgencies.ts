export type AgencyContact = {
  name: string
  logoMark: string
  mandate: string
  email: string
  phone: string
  address: string
  website: string
}

export const categoryAgencies: Record<string, AgencyContact[]> = {
  'economy-development': [
    {
      name: 'Philippine Statistics Authority',
      logoMark: 'PSA',
      mandate:
        'Produces official statistics, conducts censuses and surveys, and compiles national accounts for public planning.',
      email: 'info@psa.gov.ph',
      phone: '(02) 8462-6600 loc. 820 / 823',
      address: 'PSA Headquarters, PSA Complex, East Avenue, Diliman, Quezon City 1101',
      website: 'https://psa.gov.ph/',
    },
    {
      name: 'National Economic and Development Authority',
      logoMark: 'NEDA',
      mandate:
        'Coordinates national development planning and sustainable development goals across government.',
      email: 'sdg@depdev.gov.ph',
      phone: '(02) 8631-0966 / (02) 8631-0968',
      address: '12 St. J. Escriva Drive, Ortigas Center, Pasig City',
      website: 'https://sdg.neda.gov.ph/contact-us/',
    },
  ],
  'population-society': [
    {
      name: 'Philippine Statistics Authority',
      logoMark: 'PSA',
      mandate:
        'Responsible for official census counts, demographic statistics, civil registration, and household data.',
      email: 'info@psa.gov.ph',
      phone: '(02) 8462-6600 loc. 820 / 823',
      address: 'PSA Headquarters, PSA Complex, East Avenue, Diliman, Quezon City 1101',
      website: 'https://psa.gov.ph/',
    },
    {
      name: 'Commission on Population and Development',
      logoMark: 'CPD',
      mandate:
        'Leads population and development research, policy, and knowledge management for people-centered planning.',
      email: 'mainmail@cpd.gov.ph',
      phone: '+63 2 8531-6805',
      address: 'Acacia Lane Ext., Welfareville Compound, Brgy. Addition Hills, Mandaluyong City',
      website: 'https://popdevacademy.cpd.gov.ph/about-us/',
    },
  ],
  'disaster-environment': [
    {
      name: 'PAGASA',
      logoMark: 'PAGASA',
      mandate:
        'Provides weather, climate, hydrometeorological, and astronomical services for public safety and planning.',
      email: 'ao@pagasa.dost.gov.ph',
      phone: '(02) 8284-0800 locals 1401 / 1402',
      address: 'Science Garden, BIR Road, Diliman, Quezon City 1101',
      website: 'https://www.pagasa.dost.gov.ph/aboutus/key-officials',
    },
    {
      name: 'PHIVOLCS',
      logoMark: 'PHIV',
      mandate:
        'Monitors volcanoes, earthquakes, and related geologic hazards to reduce disaster risk.',
      email: 'phivolcs_mail@phivolcs.dost.gov.ph',
      phone: '8426-1468 up to 79',
      address: 'PHIVOLCS Building, C.P. Garcia Ave., U.P. Diliman, Quezon City 1101',
      website: 'https://www2.phivolcs.dost.gov.ph/contact-us/',
    },
  ],
  'politics-governance': [
    {
      name: 'Department of the Interior and Local Government',
      logoMark: 'DILG',
      mandate:
        'Promotes peace and order, public safety, stronger local governance, and resilient communities.',
      email: 'dilgcarcloud@gmail.com',
      phone: '(074) 442-9030',
      address: 'DILG CAR, Brgy. Center, Upper Session Rd. cor. North Drive, Baguio City 2600',
      website: 'https://car.dilg.gov.ph/contact-us/',
    },
    {
      name: 'Commission on Elections',
      logoMark: 'COMELEC',
      mandate:
        'Administers elections, plebiscites, and related electoral processes and voter services.',
      email: 'Use the official contact information page',
      phone: 'Use the official contact information page',
      address: 'Palacio del Gobernador Bldg., Gen. Luna St., Intramuros, Manila',
      website: 'https://www.comelec.gov.ph/',
    },
  ],
  'technology-social-media': [
    {
      name: 'Department of Information and Communications Technology',
      logoMark: 'DICT',
      mandate:
        'Oversees ICT policy, digital services, data protection, and secure government technology systems.',
      email: 'BAC.caraga@dict.gov.ph',
      phone: '817-2011',
      address: 'DICT Building, J. Rosales Avenue, Butuan City',
      website: 'https://caraga.dict.gov.ph/wp-content/uploads/2023/11/FINAL-Bidding-Documents-Govnet-1.8M.pdf',
    },
    {
      name: 'National Telecommunications Commission',
      logoMark: 'NTC',
      mandate:
        'Regulates telecommunications services and helps protect consumers in the communications sector.',
      email: 'region10@ntc.gov.ph',
      phone: '(088) 858-4800 or (088) 881-4551 loc. 102',
      address: 'RN Pelaez Blvd, Kauwagan, Cagayan de Oro City',
      website: 'https://region10.ntc.gov.ph/contact-us/',
    },
  ],
  education: [
    {
      name: 'Department of Education',
      logoMark: 'DepEd',
      mandate:
        'Formulates, implements, and coordinates policy for basic education, including formal and non-formal learning.',
      email: 'depedactioncenter@deped.gov.ph',
      phone: '(02) 8633-1942 / 8636-1663 / 0919-456-0027',
      address: '2nd & 5th Floor, Bonifacio Building, DepEd Complex, Meralco Ave., Pasig City',
      website: 'https://www.deped.gov.ph/contact-us-2/',
    },
    {
      name: 'Commission on Higher Education',
      logoMark: 'CHED',
      mandate:
        'Promotes relevant, quality, and accessible higher education and protects academic freedom.',
      email: 'info@ched.gov.ph',
      phone: '(02) 8441-1260 / 0999-4445-996',
      address: 'HEDC Building, C.P. Garcia Ave., Diliman, Quezon City',
      website: 'https://ched.gov.ph/contact-us/',
    },
    {
      name: 'Technical Education and Skills Development Authority',
      logoMark: 'TESDA',
      mandate:
        'Leads technical-vocational education and skills development for employability and productivity.',
      email: 'contactcenter@tesda.gov.ph',
      phone: '8887-7777',
      address: 'TESDA Complex, East Service Road, Taguig City',
      website: 'https://tesda.gov.ph/',
    },
  ],
  'religion-culture-beliefs': [
    {
      name: 'National Commission for Culture and the Arts',
      logoMark: 'NCCA',
      mandate:
        'Coordinates policies and programs that support Philippine arts, culture, heritage, and creativity.',
      email: 'info@ncca.gov.ph',
      phone: '(02) 8527-2192',
      address: 'NCCA Building, 633 General Luna St., Intramuros, Manila',
      website: 'https://ncca.gov.ph/about-ncca-3/the-secretariat/',
    },
    {
      name: 'National Historical Commission of the Philippines',
      logoMark: 'NHCP',
      mandate:
        'Preserves and promotes the country’s historical legacies, sites, and commemorative heritage.',
      email: 'info@nhcp.gov.ph',
      phone: '+632 5335-1200 / +632 8536-3181',
      address: 'NHCP Building, T.M. Kalaw St., Ermita, Manila 1000',
      website: 'https://nhcp.gov.ph/contact-us/',
    },
    {
      name: 'National Museum of the Philippines',
      logoMark: 'NMP',
      mandate:
        'Acquires, documents, preserves, exhibits, and studies art, artifacts, and natural history collections.',
      email: 'inquiry@nationalmuseum.gov.ph',
      phone: '(+632) 8298-1100',
      address: 'P. Burgos Drive, Rizal Park, Manila',
      website: 'https://www.nationalmuseum.gov.ph/contact-us/',
    },
  ],
  'law-security-crime-climate': [
    {
      name: 'Philippine National Police',
      logoMark: 'PNP',
      mandate:
        'Enforces the law, prevents and controls crime, maintains peace and order, and protects public safety.',
      email: 'messagecenter.didm@gmail.com',
      phone: '(632) 724-8773 / 724-8767 / 724-8790',
      address: 'DIDM Building, Camp BGen. Rafael T. Crame, Quezon City',
      website: 'https://didm.pnp.gov.ph/contact-us/',
    },
    {
      name: 'Supreme Court of the Philippines',
      logoMark: 'SC',
      mandate:
        'Provides judicial oversight and legal information services for the courts and the public.',
      email: 'libraryservices.sc@judiciary.gov.ph',
      phone: '(632) 8524-2706',
      address: 'Supreme Court of the Philippines, Padre Faura, Ermita, Manila 1000',
      website: 'https://elibrary.judiciary.gov.ph/contactus/contactus_main',
    },
  ],
  agriculture: [
    {
      name: 'Department of Agriculture',
      logoMark: 'DA',
      mandate:
        'Leads agricultural policy, food security programs, and support for farmers and rural production systems.',
      email: 'osec.official@da.gov.ph',
      phone: '+63 (2) 8928-8741 to 64 / 8273-2474',
      address: 'Elliptical Road, Diliman, Quezon City 1100',
      website: 'https://www.da.gov.ph/contact-us/',
    },
    {
      name: 'Philippine Rice Research Institute',
      logoMark: 'PhilRice',
      mandate:
        'Develops rice technologies, research, and extension programs that support Filipino farmers and food security.',
      email: 'philrice@philrice.gov.ph',
      phone: '0917-111-7423 / (044) 4560 277',
      address: 'PhilRice Central Experiment Station, Maligaya, Science City of Muñoz, Nueva Ecija 3119',
      website: 'https://www.philrice.gov.ph/contact-us/',
    },
  ],
  'entertainment-music-films-arts': [
    {
      name: 'Film Development Council of the Philippines',
      logoMark: 'FDCP',
      mandate:
        'Supports film preservation, development, and promotion of the Philippine audiovisual industry.',
      email: 'info@fdcp.gov.ph',
      phone: '(+632) 7 368 7145',
      address: '7/F, Mirax Tower, 2270 Chino Roces Avenue, Makati City 1231',
      website: 'https://fdcp.ph/contact-us',
    },
    {
      name: 'National Commission for Culture and the Arts',
      logoMark: 'NCCA',
      mandate:
        'Coordinates national programs for the arts, music heritage, and cultural development.',
      email: 'info@ncca.gov.ph',
      phone: '(02) 8527-2192',
      address: 'NCCA Building, 633 General Luna St., Intramuros, Manila',
      website: 'https://ncca.gov.ph/about-ncca-3/the-secretariat/',
    },
    {
      name: 'National Museum of the Philippines',
      logoMark: 'NMP',
      mandate:
        'Cares for art collections, cultural artifacts, and historical materials that shape Philippine cultural memory.',
      email: 'inquiry@nationalmuseum.gov.ph',
      phone: '(+632) 8298-1100',
      address: 'P. Burgos Drive, Rizal Park, Manila',
      website: 'https://www.nationalmuseum.gov.ph/contact-us/',
    },
  ],
}

export function getCategoryAgencies(slug: string) {
  return categoryAgencies[slug] ?? []
}
