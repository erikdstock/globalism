# Data Sources for Country Information

## Primary Sources

### 1. REST Countries API
- **URL**: https://restcountries.com/v3.1/all
- **Data**: Basic country info, currencies, languages, regions, flags
- **Rate Limit**: None
- **Reliability**: High, actively maintained

### 2. World Bank API
- **URL**: https://api.worldbank.org/v2/country
- **Data**: Economic data, population, GDP
- **Rate Limit**: 120 requests/minute
- **Reliability**: Very high, official data

### 3. UN Data API
- **URL**: https://unstats.un.org/sdgs/UNSDG/API/
- **Data**: Official UN country codes, regions
- **Rate Limit**: Reasonable
- **Reliability**: Very high, official UN data

### 4. ISO 3166 Country Codes
- **Source**: Static data from ISO standard
- **Data**: Official alpha-2, alpha-3, numeric codes
- **Reliability**: Definitive source

## Political/Economic Groups

### 1. European Union
- **Source**: europa.eu API or static data
- **Data**: EU member states, candidate countries

### 2. NATO
- **Source**: Static data from nato.int
- **Data**: NATO member countries

### 3. OECD
- **Source**: OECD API or static data
- **Data**: OECD member countries

### 4. G7, G20, BRICS
- **Source**: Static data (changes infrequently)
- **Data**: Member countries for each group

## Implementation Strategy

1. **Primary Data Source**: REST Countries API for basic info
2. **Supplementary Sources**: World Bank for economic data
3. **Static Data**: Political groups (EU, NATO, etc.)
4. **Update Frequency**: Monthly or on-demand
5. **Validation**: Cross-reference multiple sources