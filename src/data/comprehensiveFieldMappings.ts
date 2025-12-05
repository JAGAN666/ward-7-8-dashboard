// Comprehensive ACS Field Code to Human-Readable Label Mappings
// Source: American Community Survey 5-Year Estimates Data Profiles
// All field codes mapped with descriptions for research-grade accuracy

export type FieldFormat = 'number' | 'currency' | 'percent' | 'boolean' | 'ratio';

export interface FieldMapping {
  label: string;
  description: string;
  format: FieldFormat;
  category?: string;
}

// =====================================================
// DP02 - SOCIAL CHARACTERISTICS (154 fields)
// =====================================================
export const SOCIAL_FIELDS: Record<string, FieldMapping> = {
  // Households by Type
  DP02_0001E: { label: 'Total Households', description: 'Total number of households', format: 'number', category: 'Households' },
  DP02_0002E: { label: 'Married-couple Family Households', description: 'Married-couple family households', format: 'number', category: 'Households' },
  DP02_0003E: { label: 'With Own Children Under 18', description: 'Married-couple family with own children under 18', format: 'number', category: 'Households' },
  DP02_0004E: { label: 'Cohabiting Couple Households', description: 'Cohabiting couple households', format: 'number', category: 'Households' },
  DP02_0005E: { label: 'Cohabiting with Own Children', description: 'Cohabiting couple with own children under 18', format: 'number', category: 'Households' },
  DP02_0006E: { label: 'Male Householder, No Spouse', description: 'Male householder, no spouse/partner present', format: 'number', category: 'Households' },
  DP02_0007E: { label: 'Male Householder with Children', description: 'Male householder with own children under 18', format: 'number', category: 'Households' },
  DP02_0008E: { label: 'Female Householder, No Spouse', description: 'Female householder, no spouse/partner present', format: 'number', category: 'Households' },
  DP02_0009E: { label: 'Female Householder with Children', description: 'Female householder with own children under 18', format: 'number', category: 'Households' },
  DP02_0010E: { label: 'Nonfamily Households', description: 'Nonfamily households', format: 'number', category: 'Households' },
  DP02_0011E: { label: 'Householder Living Alone', description: 'Householder living alone', format: 'number', category: 'Households' },
  DP02_0012E: { label: 'Householder 65+ Living Alone', description: 'Householder 65 years and over living alone', format: 'number', category: 'Households' },
  DP02_0013E: { label: 'Households with Children Under 18', description: 'Households with one or more people under 18 years', format: 'number', category: 'Households' },
  DP02_0014E: { label: 'Households with 65+ Member', description: 'Households with one or more people 65 years and over', format: 'number', category: 'Households' },
  DP02_0015E: { label: 'Average Household Size', description: 'Average household size', format: 'ratio', category: 'Households' },
  DP02_0016E: { label: 'Average Family Size', description: 'Average family size', format: 'ratio', category: 'Households' },

  // Relationship
  DP02_0017E: { label: 'Population in Households', description: 'Population in households', format: 'number', category: 'Relationship' },
  DP02_0018E: { label: 'Householder', description: 'Householder', format: 'number', category: 'Relationship' },
  DP02_0019E: { label: 'Spouse', description: 'Spouse', format: 'number', category: 'Relationship' },
  DP02_0020E: { label: 'Unmarried Partner', description: 'Unmarried partner', format: 'number', category: 'Relationship' },
  DP02_0021E: { label: 'Child', description: 'Child', format: 'number', category: 'Relationship' },
  DP02_0022E: { label: 'Other Relatives', description: 'Other relatives', format: 'number', category: 'Relationship' },
  DP02_0023E: { label: 'Nonrelatives', description: 'Nonrelatives', format: 'number', category: 'Relationship' },
  DP02_0024E: { label: 'Unmarried Partner (Nonrelative)', description: 'Unmarried partner (nonrelative)', format: 'number', category: 'Relationship' },

  // Marital Status
  DP02_0025E: { label: 'Males 15+ Population', description: 'Males 15 years and over', format: 'number', category: 'Marital Status' },
  DP02_0026E: { label: 'Males Never Married', description: 'Males never married', format: 'number', category: 'Marital Status' },
  DP02_0027E: { label: 'Males Now Married', description: 'Males now married, except separated', format: 'number', category: 'Marital Status' },
  DP02_0028E: { label: 'Males Separated', description: 'Males separated', format: 'number', category: 'Marital Status' },
  DP02_0029E: { label: 'Males Widowed', description: 'Males widowed', format: 'number', category: 'Marital Status' },
  DP02_0030E: { label: 'Males Divorced', description: 'Males divorced', format: 'number', category: 'Marital Status' },
  DP02_0031E: { label: 'Females 15+ Population', description: 'Females 15 years and over', format: 'number', category: 'Marital Status' },
  DP02_0032E: { label: 'Females Never Married', description: 'Females never married', format: 'number', category: 'Marital Status' },
  DP02_0033E: { label: 'Females Now Married', description: 'Females now married, except separated', format: 'number', category: 'Marital Status' },
  DP02_0034E: { label: 'Females Separated', description: 'Females separated', format: 'number', category: 'Marital Status' },
  DP02_0035E: { label: 'Females Widowed', description: 'Females widowed', format: 'number', category: 'Marital Status' },
  DP02_0036E: { label: 'Females Divorced', description: 'Females divorced', format: 'number', category: 'Marital Status' },

  // Fertility
  DP02_0037E: { label: 'Women 15-50 Who Had Birth', description: 'Women 15 to 50 years who had a birth in past 12 months', format: 'number', category: 'Fertility' },
  DP02_0038E: { label: 'Unmarried Women Who Had Birth', description: 'Unmarried women who had a birth in past 12 months', format: 'number', category: 'Fertility' },
  DP02_0039E: { label: 'Per 1,000 Unmarried Women', description: 'Per 1,000 unmarried women 15 to 50 years', format: 'ratio', category: 'Fertility' },
  DP02_0040E: { label: 'Per 1,000 Women 15-19', description: 'Per 1,000 women 15 to 19 years', format: 'ratio', category: 'Fertility' },
  DP02_0041E: { label: 'Per 1,000 Women 20-34', description: 'Per 1,000 women 20 to 34 years', format: 'ratio', category: 'Fertility' },
  DP02_0042E: { label: 'Per 1,000 Women 35-50', description: 'Per 1,000 women 35 to 50 years', format: 'ratio', category: 'Fertility' },

  // Grandparents
  DP02_0043E: { label: 'Grandparents Living with Grandchildren', description: 'Grandparents living with own grandchildren under 18', format: 'number', category: 'Grandparents' },
  DP02_0044E: { label: 'Grandparents Responsible for Grandchildren', description: 'Grandparents responsible for grandchildren', format: 'number', category: 'Grandparents' },

  // School Enrollment
  DP02_0053E: { label: 'Population 3+ Enrolled in School', description: 'Population 3 years and over enrolled in school', format: 'number', category: 'School Enrollment' },
  DP02_0054E: { label: 'Nursery School, Preschool', description: 'Nursery school, preschool', format: 'number', category: 'School Enrollment' },
  DP02_0055E: { label: 'Kindergarten', description: 'Kindergarten', format: 'number', category: 'School Enrollment' },
  DP02_0056E: { label: 'Elementary School (Grades 1-8)', description: 'Elementary school (grades 1-8)', format: 'number', category: 'School Enrollment' },
  DP02_0057E: { label: 'High School (Grades 9-12)', description: 'High school (grades 9-12)', format: 'number', category: 'School Enrollment' },
  DP02_0058E: { label: 'College or Graduate School', description: 'College or graduate school', format: 'number', category: 'School Enrollment' },

  // Educational Attainment
  DP02_0059E: { label: 'Population 25+ Years', description: 'Population 25 years and over', format: 'number', category: 'Education' },
  DP02_0060E: { label: 'Less than 9th Grade', description: 'Less than 9th grade', format: 'number', category: 'Education' },
  DP02_0061E: { label: '9th-12th Grade (No Diploma)', description: '9th to 12th grade, no diploma', format: 'number', category: 'Education' },
  DP02_0062E: { label: 'High School Graduate', description: 'High school graduate (includes equivalency)', format: 'number', category: 'Education' },
  DP02_0063E: { label: 'Some College (No Degree)', description: 'Some college, no degree', format: 'number', category: 'Education' },
  DP02_0064E: { label: "Associate's Degree", description: "Associate's degree", format: 'number', category: 'Education' },
  DP02_0065E: { label: "Bachelor's Degree", description: "Bachelor's degree", format: 'number', category: 'Education' },
  DP02_0066E: { label: 'Graduate/Professional Degree', description: 'Graduate or professional degree', format: 'number', category: 'Education' },
  DP02_0067E: { label: 'High School Graduate or Higher', description: 'High school graduate or higher', format: 'percent', category: 'Education' },
  DP02_0068E: { label: "Bachelor's Degree or Higher", description: "Bachelor's degree or higher", format: 'percent', category: 'Education' },

  // Veteran Status
  DP02_0069E: { label: 'Civilian Veterans', description: 'Civilian veterans 18 years and over', format: 'number', category: 'Veterans' },

  // Disability Status
  DP02_0071E: { label: 'Total Civilian Noninstitutionalized', description: 'Total civilian noninstitutionalized population', format: 'number', category: 'Disability' },
  DP02_0072E: { label: 'With a Disability', description: 'With a disability', format: 'number', category: 'Disability' },
  DP02_0073E: { label: 'Under 18 With Disability', description: 'Under 18 years with disability', format: 'number', category: 'Disability' },
  DP02_0074E: { label: '18-64 With Disability', description: '18 to 64 years with disability', format: 'number', category: 'Disability' },
  DP02_0075E: { label: '65+ With Disability', description: '65 years and over with disability', format: 'number', category: 'Disability' },

  // Residence 1 Year Ago
  DP02_0079E: { label: 'Population 1+ Years', description: 'Population 1 year and over', format: 'number', category: 'Residence' },
  DP02_0080E: { label: 'Same House', description: 'Same house 1 year ago', format: 'number', category: 'Residence' },
  DP02_0081E: { label: 'Different House in U.S.', description: 'Different house in U.S.', format: 'number', category: 'Residence' },
  DP02_0082E: { label: 'Same County', description: 'Same county', format: 'number', category: 'Residence' },
  DP02_0083E: { label: 'Different County, Same State', description: 'Different county, same state', format: 'number', category: 'Residence' },
  DP02_0084E: { label: 'Different State', description: 'Different state', format: 'number', category: 'Residence' },
  DP02_0085E: { label: 'Abroad', description: 'Abroad', format: 'number', category: 'Residence' },

  // Place of Birth
  DP02_0088E: { label: 'Total Population', description: 'Total population', format: 'number', category: 'Place of Birth' },
  DP02_0089E: { label: 'Native', description: 'Native', format: 'number', category: 'Place of Birth' },
  DP02_0090E: { label: 'Born in U.S.', description: 'Born in United States', format: 'number', category: 'Place of Birth' },
  DP02_0091E: { label: 'Born in State of Residence', description: 'Born in state of residence', format: 'number', category: 'Place of Birth' },
  DP02_0092E: { label: 'Born in Different State', description: 'Born in different state', format: 'number', category: 'Place of Birth' },
  DP02_0093E: { label: 'Born in Puerto Rico/U.S. Islands', description: 'Born in Puerto Rico, U.S. Island areas, or born abroad to American parent(s)', format: 'number', category: 'Place of Birth' },
  DP02_0094E: { label: 'Foreign Born', description: 'Foreign born', format: 'number', category: 'Place of Birth' },

  // U.S. Citizenship Status
  DP02_0095E: { label: 'Foreign-Born Population', description: 'Foreign-born population', format: 'number', category: 'Citizenship' },
  DP02_0096E: { label: 'Naturalized U.S. Citizen', description: 'Naturalized U.S. citizen', format: 'number', category: 'Citizenship' },
  DP02_0097E: { label: 'Not a U.S. Citizen', description: 'Not a U.S. citizen', format: 'number', category: 'Citizenship' },

  // Language Spoken at Home
  DP02_0112E: { label: 'Population 5+ Years', description: 'Population 5 years and over', format: 'number', category: 'Language' },
  DP02_0113E: { label: 'English Only', description: 'English only', format: 'number', category: 'Language' },
  DP02_0114E: { label: 'Language Other than English', description: 'Language other than English', format: 'number', category: 'Language' },
  DP02_0115E: { label: 'Speak English Less than Very Well', description: 'Speak English less than "very well"', format: 'number', category: 'Language' },

  // Ancestry
  DP02_0124E: { label: 'Total Population for Ancestry', description: 'Total population', format: 'number', category: 'Ancestry' },
  DP02_0125E: { label: 'American', description: 'American ancestry', format: 'number', category: 'Ancestry' },
  DP02_0126E: { label: 'Arab', description: 'Arab ancestry', format: 'number', category: 'Ancestry' },
  DP02_0127E: { label: 'Czech', description: 'Czech ancestry', format: 'number', category: 'Ancestry' },
  DP02_0128E: { label: 'Danish', description: 'Danish ancestry', format: 'number', category: 'Ancestry' },
  DP02_0129E: { label: 'Dutch', description: 'Dutch ancestry', format: 'number', category: 'Ancestry' },
  DP02_0130E: { label: 'English', description: 'English ancestry', format: 'number', category: 'Ancestry' },
  DP02_0131E: { label: 'French (Except Basque)', description: 'French (except Basque) ancestry', format: 'number', category: 'Ancestry' },
  DP02_0132E: { label: 'French Canadian', description: 'French Canadian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0133E: { label: 'German', description: 'German ancestry', format: 'number', category: 'Ancestry' },
  DP02_0134E: { label: 'Greek', description: 'Greek ancestry', format: 'number', category: 'Ancestry' },
  DP02_0135E: { label: 'Hungarian', description: 'Hungarian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0136E: { label: 'Irish', description: 'Irish ancestry', format: 'number', category: 'Ancestry' },
  DP02_0137E: { label: 'Italian', description: 'Italian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0138E: { label: 'Lithuanian', description: 'Lithuanian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0139E: { label: 'Norwegian', description: 'Norwegian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0140E: { label: 'Polish', description: 'Polish ancestry', format: 'number', category: 'Ancestry' },
  DP02_0141E: { label: 'Portuguese', description: 'Portuguese ancestry', format: 'number', category: 'Ancestry' },
  DP02_0142E: { label: 'Russian', description: 'Russian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0143E: { label: 'Scotch-Irish', description: 'Scotch-Irish ancestry', format: 'number', category: 'Ancestry' },
  DP02_0144E: { label: 'Scottish', description: 'Scottish ancestry', format: 'number', category: 'Ancestry' },
  DP02_0145E: { label: 'Slovak', description: 'Slovak ancestry', format: 'number', category: 'Ancestry' },
  DP02_0146E: { label: 'Sub-Saharan African', description: 'Sub-Saharan African ancestry', format: 'number', category: 'Ancestry' },
  DP02_0147E: { label: 'Swedish', description: 'Swedish ancestry', format: 'number', category: 'Ancestry' },
  DP02_0148E: { label: 'Swiss', description: 'Swiss ancestry', format: 'number', category: 'Ancestry' },
  DP02_0149E: { label: 'Ukrainian', description: 'Ukrainian ancestry', format: 'number', category: 'Ancestry' },
  DP02_0150E: { label: 'Welsh', description: 'Welsh ancestry', format: 'number', category: 'Ancestry' },
  DP02_0151E: { label: 'West Indian', description: 'West Indian (excluding Hispanic origin groups) ancestry', format: 'number', category: 'Ancestry' },

  // Computers and Internet Use
  DP02_0152E: { label: 'Total Households (Computers)', description: 'Total households', format: 'number', category: 'Technology' },
  DP02_0153E: { label: 'With a Computer', description: 'With a computer', format: 'number', category: 'Technology' },
  DP02_0154E: { label: 'With Broadband Internet', description: 'With a broadband Internet subscription', format: 'number', category: 'Technology' },
};

// =====================================================
// DP03 - ECONOMIC CHARACTERISTICS (137 fields)
// =====================================================
export const ECONOMIC_FIELDS: Record<string, FieldMapping> = {
  // Employment Status
  DP03_0001E: { label: 'Population 16+ Years', description: 'Population 16 years and over', format: 'number', category: 'Employment' },
  DP03_0002E: { label: 'In Labor Force', description: 'In labor force', format: 'number', category: 'Employment' },
  DP03_0003E: { label: 'Civilian Labor Force', description: 'Civilian labor force', format: 'number', category: 'Employment' },
  DP03_0004E: { label: 'Employed', description: 'Employed', format: 'number', category: 'Employment' },
  DP03_0005E: { label: 'Unemployed', description: 'Unemployed', format: 'number', category: 'Employment' },
  DP03_0006E: { label: 'Armed Forces', description: 'Armed Forces', format: 'number', category: 'Employment' },
  DP03_0007E: { label: 'Not in Labor Force', description: 'Not in labor force', format: 'number', category: 'Employment' },
  DP03_0008E: { label: 'Civilian Labor Force (16+)', description: 'Civilian labor force', format: 'number', category: 'Employment' },
  DP03_0009PE: { label: 'Unemployment Rate', description: 'Unemployment rate', format: 'percent', category: 'Employment' },

  // Employment by Sex and Age
  DP03_0010E: { label: 'Females 16+ Years', description: 'Females 16 years and over', format: 'number', category: 'Employment' },
  DP03_0011E: { label: 'Females in Labor Force', description: 'Females in labor force', format: 'number', category: 'Employment' },
  DP03_0012E: { label: 'Females Civilian Labor Force', description: 'Females civilian labor force', format: 'number', category: 'Employment' },
  DP03_0013E: { label: 'Females Employed', description: 'Females employed', format: 'number', category: 'Employment' },

  // Commuting to Work
  DP03_0018E: { label: 'Workers 16+ Years', description: 'Workers 16 years and over', format: 'number', category: 'Commuting' },
  DP03_0019E: { label: 'Car, Truck, or Van - Drove Alone', description: 'Car, truck, or van -- drove alone', format: 'number', category: 'Commuting' },
  DP03_0020E: { label: 'Car, Truck, or Van - Carpooled', description: 'Car, truck, or van -- carpooled', format: 'number', category: 'Commuting' },
  DP03_0021E: { label: 'Public Transportation', description: 'Public transportation (excluding taxicab)', format: 'number', category: 'Commuting' },
  DP03_0022E: { label: 'Walked', description: 'Walked', format: 'number', category: 'Commuting' },
  DP03_0023E: { label: 'Other Means', description: 'Other means', format: 'number', category: 'Commuting' },
  DP03_0024E: { label: 'Worked from Home', description: 'Worked from home', format: 'number', category: 'Commuting' },
  DP03_0025E: { label: 'Mean Travel Time (Minutes)', description: 'Mean travel time to work (minutes)', format: 'number', category: 'Commuting' },

  // Occupation
  DP03_0026E: { label: 'Civilian Employed 16+ Years', description: 'Civilian employed population 16 years and over', format: 'number', category: 'Occupation' },
  DP03_0027E: { label: 'Management, Business, Science, Arts', description: 'Management, business, science, and arts occupations', format: 'number', category: 'Occupation' },
  DP03_0028E: { label: 'Service Occupations', description: 'Service occupations', format: 'number', category: 'Occupation' },
  DP03_0029E: { label: 'Sales and Office', description: 'Sales and office occupations', format: 'number', category: 'Occupation' },
  DP03_0030E: { label: 'Natural Resources, Construction, Maintenance', description: 'Natural resources, construction, and maintenance occupations', format: 'number', category: 'Occupation' },
  DP03_0031E: { label: 'Production, Transportation, Material Moving', description: 'Production, transportation, and material moving occupations', format: 'number', category: 'Occupation' },

  // Industry
  DP03_0032E: { label: 'Civilian Employed (Industry)', description: 'Civilian employed population 16 years and over', format: 'number', category: 'Industry' },
  DP03_0033E: { label: 'Agriculture, Forestry, Fishing, Hunting, Mining', description: 'Agriculture, forestry, fishing and hunting, and mining', format: 'number', category: 'Industry' },
  DP03_0034E: { label: 'Construction', description: 'Construction', format: 'number', category: 'Industry' },
  DP03_0035E: { label: 'Manufacturing', description: 'Manufacturing', format: 'number', category: 'Industry' },
  DP03_0036E: { label: 'Wholesale Trade', description: 'Wholesale trade', format: 'number', category: 'Industry' },
  DP03_0037E: { label: 'Retail Trade', description: 'Retail trade', format: 'number', category: 'Industry' },
  DP03_0038E: { label: 'Transportation, Warehousing, Utilities', description: 'Transportation and warehousing, and utilities', format: 'number', category: 'Industry' },
  DP03_0039E: { label: 'Information', description: 'Information', format: 'number', category: 'Industry' },
  DP03_0040E: { label: 'Finance, Insurance, Real Estate', description: 'Finance and insurance, and real estate and rental and leasing', format: 'number', category: 'Industry' },
  DP03_0041E: { label: 'Professional, Scientific, Management', description: 'Professional, scientific, and management, and administrative and waste management services', format: 'number', category: 'Industry' },
  DP03_0042E: { label: 'Educational Services, Health Care', description: 'Educational services, and health care and social assistance', format: 'number', category: 'Industry' },
  DP03_0043E: { label: 'Arts, Entertainment, Recreation, Food', description: 'Arts, entertainment, and recreation, and accommodation and food services', format: 'number', category: 'Industry' },
  DP03_0044E: { label: 'Other Services', description: 'Other services, except public administration', format: 'number', category: 'Industry' },
  DP03_0045E: { label: 'Public Administration', description: 'Public administration', format: 'number', category: 'Industry' },

  // Class of Worker
  DP03_0046E: { label: 'Civilian Employed (Class)', description: 'Civilian employed population 16 years and over', format: 'number', category: 'Class of Worker' },
  DP03_0047E: { label: 'Private Wage and Salary', description: 'Private wage and salary workers', format: 'number', category: 'Class of Worker' },
  DP03_0048E: { label: 'Government Workers', description: 'Government workers', format: 'number', category: 'Class of Worker' },
  DP03_0049E: { label: 'Self-Employed (Not Incorporated)', description: 'Self-employed in own not incorporated business workers', format: 'number', category: 'Class of Worker' },
  DP03_0050E: { label: 'Unpaid Family Workers', description: 'Unpaid family workers', format: 'number', category: 'Class of Worker' },

  // Income and Benefits
  DP03_0051E: { label: 'Total Households', description: 'Total households', format: 'number', category: 'Income' },
  DP03_0052E: { label: 'Less than $10,000', description: 'Less than $10,000', format: 'number', category: 'Income' },
  DP03_0053E: { label: '$10,000 to $14,999', description: '$10,000 to $14,999', format: 'number', category: 'Income' },
  DP03_0054E: { label: '$15,000 to $24,999', description: '$15,000 to $24,999', format: 'number', category: 'Income' },
  DP03_0055E: { label: '$25,000 to $34,999', description: '$25,000 to $34,999', format: 'number', category: 'Income' },
  DP03_0056E: { label: '$35,000 to $49,999', description: '$35,000 to $49,999', format: 'number', category: 'Income' },
  DP03_0057E: { label: '$50,000 to $74,999', description: '$50,000 to $74,999', format: 'number', category: 'Income' },
  DP03_0058E: { label: '$75,000 to $99,999', description: '$75,000 to $99,999', format: 'number', category: 'Income' },
  DP03_0059E: { label: '$100,000 to $149,999', description: '$100,000 to $149,999', format: 'number', category: 'Income' },
  DP03_0060E: { label: '$150,000 to $199,999', description: '$150,000 to $199,999', format: 'number', category: 'Income' },
  DP03_0061E: { label: '$200,000 or More', description: '$200,000 or more', format: 'number', category: 'Income' },
  DP03_0062E: { label: 'Median Household Income', description: 'Median household income (dollars)', format: 'currency', category: 'Income' },
  DP03_0063E: { label: 'Mean Household Income', description: 'Mean household income (dollars)', format: 'currency', category: 'Income' },

  // Income Types
  DP03_0064E: { label: 'With Earnings', description: 'With earnings', format: 'number', category: 'Income Sources' },
  DP03_0065E: { label: 'Mean Earnings', description: 'Mean earnings (dollars)', format: 'currency', category: 'Income Sources' },
  DP03_0066E: { label: 'With Social Security', description: 'With Social Security', format: 'number', category: 'Income Sources' },
  DP03_0067E: { label: 'Mean Social Security Income', description: 'Mean Social Security income (dollars)', format: 'currency', category: 'Income Sources' },
  DP03_0068E: { label: 'With Retirement Income', description: 'With retirement income', format: 'number', category: 'Income Sources' },
  DP03_0069E: { label: 'Mean Retirement Income', description: 'Mean retirement income (dollars)', format: 'currency', category: 'Income Sources' },
  DP03_0070E: { label: 'With Supplemental Security Income', description: 'With Supplemental Security Income', format: 'number', category: 'Income Sources' },
  DP03_0071E: { label: 'Mean SSI', description: 'Mean Supplemental Security Income (dollars)', format: 'currency', category: 'Income Sources' },
  DP03_0072E: { label: 'With Cash Public Assistance', description: 'With cash public assistance income', format: 'number', category: 'Income Sources' },
  DP03_0073E: { label: 'Mean Cash Public Assistance', description: 'Mean cash public assistance income (dollars)', format: 'currency', category: 'Income Sources' },
  DP03_0074E: { label: 'With Food Stamp/SNAP Benefits', description: 'With Food Stamp/SNAP benefits in past 12 months', format: 'number', category: 'Income Sources' },

  // Families
  DP03_0075E: { label: 'Families', description: 'Families', format: 'number', category: 'Family Income' },
  DP03_0086E: { label: 'Median Family Income', description: 'Median family income (dollars)', format: 'currency', category: 'Family Income' },
  DP03_0087E: { label: 'Mean Family Income', description: 'Mean family income (dollars)', format: 'currency', category: 'Family Income' },

  // Per Capita Income
  DP03_0088E: { label: 'Per Capita Income', description: 'Per capita income (dollars)', format: 'currency', category: 'Income' },

  // Nonfamily Households
  DP03_0089E: { label: 'Nonfamily Households', description: 'Nonfamily households', format: 'number', category: 'Income' },
  DP03_0090E: { label: 'Median Nonfamily Income', description: 'Median nonfamily income (dollars)', format: 'currency', category: 'Income' },
  DP03_0091E: { label: 'Mean Nonfamily Income', description: 'Mean nonfamily income (dollars)', format: 'currency', category: 'Income' },

  // Median Earnings by Sex
  DP03_0092E: { label: 'Median Earnings for Workers', description: 'Median earnings for workers (dollars)', format: 'currency', category: 'Earnings' },
  DP03_0093E: { label: 'Median Earnings for Male Full-Time', description: 'Median earnings for male full-time, year-round workers (dollars)', format: 'currency', category: 'Earnings' },
  DP03_0094E: { label: 'Median Earnings for Female Full-Time', description: 'Median earnings for female full-time, year-round workers (dollars)', format: 'currency', category: 'Earnings' },

  // Health Insurance Coverage
  DP03_0095E: { label: 'Civilian Noninstitutionalized', description: 'Civilian noninstitutionalized population', format: 'number', category: 'Health Insurance' },
  DP03_0096E: { label: 'With Health Insurance', description: 'With health insurance coverage', format: 'number', category: 'Health Insurance' },
  DP03_0097E: { label: 'With Private Health Insurance', description: 'With private health insurance', format: 'number', category: 'Health Insurance' },
  DP03_0098E: { label: 'With Public Coverage', description: 'With public coverage', format: 'number', category: 'Health Insurance' },
  DP03_0099E: { label: 'No Health Insurance', description: 'No health insurance coverage', format: 'number', category: 'Health Insurance' },

  // Poverty Status
  DP03_0119PE: { label: 'Families Below Poverty', description: 'Percent of families with income below poverty level', format: 'percent', category: 'Poverty' },
  DP03_0128PE: { label: 'Individuals Below Poverty', description: 'Percent of population with income below poverty level', format: 'percent', category: 'Poverty' },
};

// =====================================================
// DP04 - HOUSING CHARACTERISTICS (143 fields)
// =====================================================
export const HOUSING_FIELDS: Record<string, FieldMapping> = {
  // Housing Occupancy
  DP04_0001E: { label: 'Total Housing Units', description: 'Total housing units', format: 'number', category: 'Occupancy' },
  DP04_0002E: { label: 'Occupied Housing Units', description: 'Occupied housing units', format: 'number', category: 'Occupancy' },
  DP04_0003E: { label: 'Vacant Housing Units', description: 'Vacant housing units', format: 'number', category: 'Occupancy' },
  DP04_0004E: { label: 'Homeowner Vacancy Rate', description: 'Homeowner vacancy rate', format: 'percent', category: 'Occupancy' },
  DP04_0005E: { label: 'Rental Vacancy Rate', description: 'Rental vacancy rate', format: 'percent', category: 'Occupancy' },

  // Units in Structure
  DP04_0006E: { label: 'Total Housing Units (Structure)', description: 'Total housing units', format: 'number', category: 'Structure' },
  DP04_0007E: { label: '1-Unit Detached', description: '1-unit, detached', format: 'number', category: 'Structure' },
  DP04_0008E: { label: '1-Unit Attached', description: '1-unit, attached', format: 'number', category: 'Structure' },
  DP04_0009E: { label: '2 Units', description: '2 units', format: 'number', category: 'Structure' },
  DP04_0010E: { label: '3 or 4 Units', description: '3 or 4 units', format: 'number', category: 'Structure' },
  DP04_0011E: { label: '5 to 9 Units', description: '5 to 9 units', format: 'number', category: 'Structure' },
  DP04_0012E: { label: '10 to 19 Units', description: '10 to 19 units', format: 'number', category: 'Structure' },
  DP04_0013E: { label: '20 or More Units', description: '20 or more units', format: 'number', category: 'Structure' },
  DP04_0014E: { label: 'Mobile Home', description: 'Mobile home', format: 'number', category: 'Structure' },
  DP04_0015E: { label: 'Boat, RV, Van, etc.', description: 'Boat, RV, van, etc.', format: 'number', category: 'Structure' },

  // Year Structure Built
  DP04_0016E: { label: 'Total Housing Units (Year Built)', description: 'Total housing units', format: 'number', category: 'Year Built' },
  DP04_0017E: { label: 'Built 2020 or Later', description: 'Built 2020 or later', format: 'number', category: 'Year Built' },
  DP04_0018E: { label: 'Built 2010 to 2019', description: 'Built 2010 to 2019', format: 'number', category: 'Year Built' },
  DP04_0019E: { label: 'Built 2000 to 2009', description: 'Built 2000 to 2009', format: 'number', category: 'Year Built' },
  DP04_0020E: { label: 'Built 1990 to 1999', description: 'Built 1990 to 1999', format: 'number', category: 'Year Built' },
  DP04_0021E: { label: 'Built 1980 to 1989', description: 'Built 1980 to 1989', format: 'number', category: 'Year Built' },
  DP04_0022E: { label: 'Built 1970 to 1979', description: 'Built 1970 to 1979', format: 'number', category: 'Year Built' },
  DP04_0023E: { label: 'Built 1960 to 1969', description: 'Built 1960 to 1969', format: 'number', category: 'Year Built' },
  DP04_0024E: { label: 'Built 1950 to 1959', description: 'Built 1950 to 1959', format: 'number', category: 'Year Built' },
  DP04_0025E: { label: 'Built 1940 to 1949', description: 'Built 1940 to 1949', format: 'number', category: 'Year Built' },
  DP04_0026E: { label: 'Built 1939 or Earlier', description: 'Built 1939 or earlier', format: 'number', category: 'Year Built' },

  // Rooms
  DP04_0027E: { label: 'Total Housing Units (Rooms)', description: 'Total housing units', format: 'number', category: 'Rooms' },
  DP04_0028E: { label: '1 Room', description: '1 room', format: 'number', category: 'Rooms' },
  DP04_0029E: { label: '2 Rooms', description: '2 rooms', format: 'number', category: 'Rooms' },
  DP04_0030E: { label: '3 Rooms', description: '3 rooms', format: 'number', category: 'Rooms' },
  DP04_0031E: { label: '4 Rooms', description: '4 rooms', format: 'number', category: 'Rooms' },
  DP04_0032E: { label: '5 Rooms', description: '5 rooms', format: 'number', category: 'Rooms' },
  DP04_0033E: { label: '6 Rooms', description: '6 rooms', format: 'number', category: 'Rooms' },
  DP04_0034E: { label: '7 Rooms', description: '7 rooms', format: 'number', category: 'Rooms' },
  DP04_0035E: { label: '8 Rooms', description: '8 rooms', format: 'number', category: 'Rooms' },
  DP04_0036E: { label: '9 or More Rooms', description: '9 or more rooms', format: 'number', category: 'Rooms' },
  DP04_0037E: { label: 'Median Rooms', description: 'Median rooms', format: 'number', category: 'Rooms' },

  // Bedrooms
  DP04_0038E: { label: 'Total Housing Units (Bedrooms)', description: 'Total housing units', format: 'number', category: 'Bedrooms' },
  DP04_0039E: { label: 'No Bedroom', description: 'No bedroom', format: 'number', category: 'Bedrooms' },
  DP04_0040E: { label: '1 Bedroom', description: '1 bedroom', format: 'number', category: 'Bedrooms' },
  DP04_0041E: { label: '2 Bedrooms', description: '2 bedrooms', format: 'number', category: 'Bedrooms' },
  DP04_0042E: { label: '3 Bedrooms', description: '3 bedrooms', format: 'number', category: 'Bedrooms' },
  DP04_0043E: { label: '4 Bedrooms', description: '4 bedrooms', format: 'number', category: 'Bedrooms' },
  DP04_0044E: { label: '5 or More Bedrooms', description: '5 or more bedrooms', format: 'number', category: 'Bedrooms' },

  // Housing Tenure
  DP04_0045E: { label: 'Occupied Housing Units', description: 'Occupied housing units', format: 'number', category: 'Tenure' },
  DP04_0046E: { label: 'Owner-Occupied', description: 'Owner-occupied', format: 'number', category: 'Tenure' },
  DP04_0047E: { label: 'Renter-Occupied', description: 'Renter-occupied', format: 'number', category: 'Tenure' },
  DP04_0048E: { label: 'Average Household Size (Owner)', description: 'Average household size of owner-occupied unit', format: 'ratio', category: 'Tenure' },
  DP04_0049E: { label: 'Average Household Size (Renter)', description: 'Average household size of renter-occupied unit', format: 'ratio', category: 'Tenure' },

  // Year Householder Moved Into Unit
  DP04_0050E: { label: 'Occupied Housing Units (Year Moved)', description: 'Occupied housing units', format: 'number', category: 'Year Moved' },
  DP04_0051E: { label: 'Moved in 2021 or Later', description: 'Moved in 2021 or later', format: 'number', category: 'Year Moved' },
  DP04_0052E: { label: 'Moved in 2018 to 2020', description: 'Moved in 2018 to 2020', format: 'number', category: 'Year Moved' },
  DP04_0053E: { label: 'Moved in 2010 to 2017', description: 'Moved in 2010 to 2017', format: 'number', category: 'Year Moved' },
  DP04_0054E: { label: 'Moved in 2000 to 2009', description: 'Moved in 2000 to 2009', format: 'number', category: 'Year Moved' },
  DP04_0055E: { label: 'Moved in 1990 to 1999', description: 'Moved in 1990 to 1999', format: 'number', category: 'Year Moved' },
  DP04_0056E: { label: 'Moved in 1989 or Earlier', description: 'Moved in 1989 or earlier', format: 'number', category: 'Year Moved' },

  // Vehicles Available
  DP04_0057E: { label: 'Occupied Housing Units (Vehicles)', description: 'Occupied housing units', format: 'number', category: 'Vehicles' },
  DP04_0058E: { label: 'No Vehicles', description: 'No vehicles available', format: 'number', category: 'Vehicles' },
  DP04_0059E: { label: '1 Vehicle', description: '1 vehicle available', format: 'number', category: 'Vehicles' },
  DP04_0060E: { label: '2 Vehicles', description: '2 vehicles available', format: 'number', category: 'Vehicles' },
  DP04_0061E: { label: '3 or More Vehicles', description: '3 or more vehicles available', format: 'number', category: 'Vehicles' },

  // House Heating Fuel
  DP04_0062E: { label: 'Occupied Housing Units (Fuel)', description: 'Occupied housing units', format: 'number', category: 'Heating Fuel' },
  DP04_0063E: { label: 'Utility Gas', description: 'Utility gas', format: 'number', category: 'Heating Fuel' },
  DP04_0064E: { label: 'Bottled/Tank/LP Gas', description: 'Bottled, tank, or LP gas', format: 'number', category: 'Heating Fuel' },
  DP04_0065E: { label: 'Electricity', description: 'Electricity', format: 'number', category: 'Heating Fuel' },
  DP04_0066E: { label: 'Fuel Oil/Kerosene', description: 'Fuel oil, kerosene, etc.', format: 'number', category: 'Heating Fuel' },
  DP04_0067E: { label: 'Coal/Coke', description: 'Coal or coke', format: 'number', category: 'Heating Fuel' },
  DP04_0068E: { label: 'Wood', description: 'Wood', format: 'number', category: 'Heating Fuel' },
  DP04_0069E: { label: 'Solar Energy', description: 'Solar energy', format: 'number', category: 'Heating Fuel' },
  DP04_0070E: { label: 'Other Fuel', description: 'Other fuel', format: 'number', category: 'Heating Fuel' },
  DP04_0071E: { label: 'No Fuel Used', description: 'No fuel used', format: 'number', category: 'Heating Fuel' },

  // Selected Characteristics
  DP04_0072E: { label: 'Occupied Housing Units (Characteristics)', description: 'Occupied housing units', format: 'number', category: 'Characteristics' },
  DP04_0073E: { label: 'Lacking Complete Plumbing', description: 'Lacking complete plumbing facilities', format: 'number', category: 'Characteristics' },
  DP04_0074E: { label: 'Lacking Complete Kitchen', description: 'Lacking complete kitchen facilities', format: 'number', category: 'Characteristics' },
  DP04_0075E: { label: 'No Telephone Service', description: 'No telephone service available', format: 'number', category: 'Characteristics' },

  // Home Value
  DP04_0080E: { label: 'Owner-Occupied Units (Value)', description: 'Owner-occupied units', format: 'number', category: 'Value' },
  DP04_0081E: { label: 'Less than $50,000', description: 'Less than $50,000', format: 'number', category: 'Value' },
  DP04_0082E: { label: '$50,000 to $99,999', description: '$50,000 to $99,999', format: 'number', category: 'Value' },
  DP04_0083E: { label: '$100,000 to $149,999', description: '$100,000 to $149,999', format: 'number', category: 'Value' },
  DP04_0084E: { label: '$150,000 to $199,999', description: '$150,000 to $199,999', format: 'number', category: 'Value' },
  DP04_0085E: { label: '$200,000 to $299,999', description: '$200,000 to $299,999', format: 'number', category: 'Value' },
  DP04_0086E: { label: '$300,000 to $499,999', description: '$300,000 to $499,999', format: 'number', category: 'Value' },
  DP04_0087E: { label: '$500,000 to $999,999', description: '$500,000 to $999,999', format: 'number', category: 'Value' },
  DP04_0088E: { label: '$1,000,000 or More', description: '$1,000,000 or more', format: 'number', category: 'Value' },
  DP04_0089E: { label: 'Median Home Value', description: 'Median (dollars)', format: 'currency', category: 'Value' },

  // Gross Rent
  DP04_0126E: { label: 'Renter-Occupied Units (Rent)', description: 'Occupied units paying rent', format: 'number', category: 'Rent' },
  DP04_0127E: { label: 'Less than $500', description: 'Less than $500', format: 'number', category: 'Rent' },
  DP04_0128E: { label: '$500 to $999', description: '$500 to $999', format: 'number', category: 'Rent' },
  DP04_0129E: { label: '$1,000 to $1,499', description: '$1,000 to $1,499', format: 'number', category: 'Rent' },
  DP04_0130E: { label: '$1,500 to $1,999', description: '$1,500 to $1,999', format: 'number', category: 'Rent' },
  DP04_0131E: { label: '$2,000 to $2,499', description: '$2,000 to $2,499', format: 'number', category: 'Rent' },
  DP04_0132E: { label: '$2,500 to $2,999', description: '$2,500 to $2,999', format: 'number', category: 'Rent' },
  DP04_0133E: { label: '$3,000 or More', description: '$3,000 or more', format: 'number', category: 'Rent' },
  DP04_0134E: { label: 'Median Gross Rent', description: 'Median (dollars)', format: 'currency', category: 'Rent' },

  // Gross Rent as Percentage of Income
  DP04_0136E: { label: 'Occupied Units Paying Rent', description: 'Occupied units paying rent (excluding units where GRAPI cannot be computed)', format: 'number', category: 'Rent Burden' },
  DP04_0137E: { label: 'Less than 15% Income', description: 'Less than 15.0 percent', format: 'number', category: 'Rent Burden' },
  DP04_0138E: { label: '15-19.9% Income', description: '15.0 to 19.9 percent', format: 'number', category: 'Rent Burden' },
  DP04_0139E: { label: '20-24.9% Income', description: '20.0 to 24.9 percent', format: 'number', category: 'Rent Burden' },
  DP04_0140E: { label: '25-29.9% Income', description: '25.0 to 29.9 percent', format: 'number', category: 'Rent Burden' },
  DP04_0141E: { label: '30-34.9% Income', description: '30.0 to 34.9 percent', format: 'number', category: 'Rent Burden' },
  DP04_0142E: { label: '35% or More Income', description: '35.0 percent or more', format: 'number', category: 'Rent Burden' },
  DP04_0143E: { label: 'Not Computed', description: 'Not computed', format: 'number', category: 'Rent Burden' },
};

// =====================================================
// DP05 - DEMOGRAPHIC CHARACTERISTICS (91 fields)
// =====================================================
export const DEMOGRAPHIC_FIELDS: Record<string, FieldMapping> = {
  // Sex and Age
  DP05_0001E: { label: 'Total Population', description: 'Total population', format: 'number', category: 'Population' },
  DP05_0002E: { label: 'Male', description: 'Male', format: 'number', category: 'Sex' },
  DP05_0003E: { label: 'Female', description: 'Female', format: 'number', category: 'Sex' },
  DP05_0004E: { label: 'Sex Ratio', description: 'Sex ratio (males per 100 females)', format: 'ratio', category: 'Sex' },

  // Age
  DP05_0005E: { label: 'Under 5 Years', description: 'Under 5 years', format: 'number', category: 'Age' },
  DP05_0006E: { label: '5 to 9 Years', description: '5 to 9 years', format: 'number', category: 'Age' },
  DP05_0007E: { label: '10 to 14 Years', description: '10 to 14 years', format: 'number', category: 'Age' },
  DP05_0008E: { label: '15 to 19 Years', description: '15 to 19 years', format: 'number', category: 'Age' },
  DP05_0009E: { label: '20 to 24 Years', description: '20 to 24 years', format: 'number', category: 'Age' },
  DP05_0010E: { label: '25 to 34 Years', description: '25 to 34 years', format: 'number', category: 'Age' },
  DP05_0011E: { label: '35 to 44 Years', description: '35 to 44 years', format: 'number', category: 'Age' },
  DP05_0012E: { label: '45 to 54 Years', description: '45 to 54 years', format: 'number', category: 'Age' },
  DP05_0013E: { label: '55 to 59 Years', description: '55 to 59 years', format: 'number', category: 'Age' },
  DP05_0014E: { label: '60 to 64 Years', description: '60 to 64 years', format: 'number', category: 'Age' },
  DP05_0015E: { label: '65 to 74 Years', description: '65 to 74 years', format: 'number', category: 'Age' },
  DP05_0016E: { label: '75 to 84 Years', description: '75 to 84 years', format: 'number', category: 'Age' },
  DP05_0017E: { label: '85 Years and Over', description: '85 years and over', format: 'number', category: 'Age' },
  DP05_0018E: { label: 'Median Age', description: 'Median age (years)', format: 'number', category: 'Age' },
  DP05_0019E: { label: 'Under 18 Years', description: 'Under 18 years', format: 'number', category: 'Age' },
  DP05_0020E: { label: '16 Years and Over', description: '16 years and over', format: 'number', category: 'Age' },
  DP05_0021E: { label: '18 Years and Over', description: '18 years and over', format: 'number', category: 'Age' },
  DP05_0022E: { label: '21 Years and Over', description: '21 years and over', format: 'number', category: 'Age' },
  DP05_0023E: { label: '62 Years and Over', description: '62 years and over', format: 'number', category: 'Age' },
  DP05_0024E: { label: '65 Years and Over', description: '65 years and over', format: 'number', category: 'Age' },

  // Race
  DP05_0033E: { label: 'Total Population (Race)', description: 'Total population', format: 'number', category: 'Race' },
  DP05_0034E: { label: 'One Race', description: 'One race', format: 'number', category: 'Race' },
  DP05_0035E: { label: 'Two or More Races', description: 'Two or more races', format: 'number', category: 'Race' },
  DP05_0037E: { label: 'White', description: 'White', format: 'number', category: 'Race' },
  DP05_0038E: { label: 'Black or African American', description: 'Black or African American', format: 'number', category: 'Race' },
  DP05_0039E: { label: 'American Indian and Alaska Native', description: 'American Indian and Alaska Native', format: 'number', category: 'Race' },
  DP05_0044E: { label: 'Asian', description: 'Asian', format: 'number', category: 'Race' },
  DP05_0052E: { label: 'Native Hawaiian and Pacific Islander', description: 'Native Hawaiian and Other Pacific Islander', format: 'number', category: 'Race' },
  DP05_0057E: { label: 'Some Other Race', description: 'Some other race', format: 'number', category: 'Race' },

  // Hispanic or Latino
  DP05_0070E: { label: 'Hispanic or Latino (Any Race)', description: 'Hispanic or Latino (of any race)', format: 'number', category: 'Hispanic Origin' },
  DP05_0071E: { label: 'Not Hispanic or Latino', description: 'Not Hispanic or Latino', format: 'number', category: 'Hispanic Origin' },

  // Race Alone or in Combination
  DP05_0076E: { label: 'White Alone or in Combination', description: 'White alone or in combination with one or more other races', format: 'number', category: 'Race Combination' },
  DP05_0077E: { label: 'Black Alone or in Combination', description: 'Black or African American alone or in combination with one or more other races', format: 'number', category: 'Race Combination' },
  DP05_0078E: { label: 'American Indian Alone or in Combination', description: 'American Indian and Alaska Native alone or in combination with one or more other races', format: 'number', category: 'Race Combination' },
  DP05_0079E: { label: 'Asian Alone or in Combination', description: 'Asian alone or in combination with one or more other races', format: 'number', category: 'Race Combination' },
  DP05_0080E: { label: 'Native Hawaiian Alone or in Combination', description: 'Native Hawaiian and Other Pacific Islander alone or in combination with one or more other races', format: 'number', category: 'Race Combination' },
  DP05_0081E: { label: 'Some Other Race Alone or in Combination', description: 'Some other race alone or in combination with one or more other races', format: 'number', category: 'Race Combination' },

  // Citizen Voting Age Population
  DP05_0087E: { label: 'Citizen Voting Age Population', description: 'Citizen, 18 and over population', format: 'number', category: 'Voting' },
};

// =====================================================
// FOOD ACCESS FIELDS
// =====================================================
export const FOOD_ACCESS_FIELDS: Record<string, FieldMapping> = {
  LILATracts_1And10: { label: 'LILA Tract (1mi/10mi)', description: 'Low Income, Low Access at 1 mile (urban) / 10 miles (rural)', format: 'boolean', category: 'Food Access' },
  LILATracts_halfAnd10: { label: 'LILA Tract (0.5mi/10mi)', description: 'Low Income, Low Access at 0.5 mile (urban) / 10 miles (rural)', format: 'boolean', category: 'Food Access' },
  LILATracts_Vehicle: { label: 'LILA Tract (Vehicle)', description: 'Low Income, Low Access using vehicle access', format: 'boolean', category: 'Food Access' },
  TractLOWI: { label: 'Low Income Tract', description: 'Low income census tract', format: 'boolean', category: 'Food Access' },
  TractHUNV: { label: 'Low Vehicle Access', description: 'Census tract with many households without vehicles', format: 'boolean', category: 'Food Access' },
  PovertyRate: { label: 'Poverty Rate', description: 'Tract poverty rate', format: 'percent', category: 'Food Access' },
  MedianFamilyIncome: { label: 'Median Family Income', description: 'Tract median family income', format: 'currency', category: 'Food Access' },
  LA1and10: { label: 'Low Access (1mi/10mi)', description: 'Low access at 1 mile (urban) / 10 miles (rural)', format: 'boolean', category: 'Food Access' },
  LAhalfand10: { label: 'Low Access (0.5mi/10mi)', description: 'Low access at 0.5 mile (urban) / 10 miles (rural)', format: 'boolean', category: 'Food Access' },
  LAPOP1_10: { label: 'Low Access Population (1mi)', description: 'Population with low access at 1 mile', format: 'number', category: 'Food Access' },
  LATracts1: { label: 'Low Access Tract (1mi)', description: 'Low access tract at 1 mile', format: 'boolean', category: 'Food Access' },
  LATractsVehicle_20: { label: 'Vehicle Low Access Tract', description: 'Low access tract using vehicle access', format: 'boolean', category: 'Food Access' },
};

// =====================================================
// STORE TYPE MAPPINGS
// =====================================================
export const STORE_TYPES: Record<string, string> = {
  'Supermarket': 'supermarket',
  'Super Store': 'supermarket',
  'Large Grocery Store': 'grocery',
  'Medium Grocery Store': 'grocery',
  'Small Grocery Store': 'grocery',
  'Convenience Store': 'convenience',
  'Combination Grocery/Other': 'other',
  "Farmers' Market": 'farmersMarket',
  'Farmers Market': 'farmersMarket',
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================
export function getAllFieldMappings(): Record<string, FieldMapping> {
  return {
    ...SOCIAL_FIELDS,
    ...ECONOMIC_FIELDS,
    ...HOUSING_FIELDS,
    ...DEMOGRAPHIC_FIELDS,
    ...FOOD_ACCESS_FIELDS,
  };
}

export function getFieldsByCategory(fields: Record<string, FieldMapping>, category: string): Record<string, FieldMapping> {
  return Object.fromEntries(
    Object.entries(fields).filter(([, mapping]) => mapping.category === category)
  );
}

export function getCategoriesFromFields(fields: Record<string, FieldMapping>): string[] {
  const categories = new Set<string>();
  Object.values(fields).forEach(mapping => {
    if (mapping.category) categories.add(mapping.category);
  });
  return Array.from(categories);
}

// Export all categories for each data type
export const SOCIAL_CATEGORIES = getCategoriesFromFields(SOCIAL_FIELDS);
export const ECONOMIC_CATEGORIES = getCategoriesFromFields(ECONOMIC_FIELDS);
export const HOUSING_CATEGORIES = getCategoriesFromFields(HOUSING_FIELDS);
export const DEMOGRAPHIC_CATEGORIES = getCategoriesFromFields(DEMOGRAPHIC_FIELDS);
