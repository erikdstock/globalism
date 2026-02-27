#!/usr/bin/env tsx

import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import type { Country, CountryGroup } from '../packages/globalism/src/data/types';
import { GroupingType } from '../packages/globalism/src/data/types';

const RAW_DIR = join(__dirname, '../packages/globalism/src/data/raw');
const COUNTRIES_JSON = join(RAW_DIR, 'countries.json');
const GROUPS_JSON = join(RAW_DIR, 'countryGroups.json');

const STATIC_GROUPS: CountryGroup[] = [
  {
    id: 'EU',
    name: 'European Union',
    type: GroupingType.PoliticalUnion,
    description: 'Political and economic union of European countries',
    members: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'],
  },
  {
    id: 'NATO',
    name: 'North Atlantic Treaty Organization',
    type: GroupingType.MilitaryAlliance,
    description: 'Military alliance of North American and European countries',
    members: ['US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'DK', 'NO', 'IS', 'LU', 'PT', 'GR', 'TR', 'CZ', 'HU', 'PL', 'BG', 'EE', 'LV', 'LT', 'RO', 'SK', 'SI', 'AL', 'HR', 'ME', 'MK', 'FI', 'SE'],
  },
  {
    id: 'OECD',
    name: 'Organisation for Economic Co-operation and Development',
    type: GroupingType.EconomicUnion,
    description: 'International organisation working to build better policies for better lives',
    members: ['AU', 'AT', 'BE', 'CA', 'CL', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IL', 'IT', 'JP', 'KR', 'LV', 'LT', 'LU', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'GB', 'US', 'CO', 'CR'],
  },
  {
    id: 'G7',
    name: 'Group of Seven',
    type: GroupingType.EconomicUnion,
    description: 'Forum of advanced economies',
    members: ['CA', 'FR', 'DE', 'IT', 'JP', 'GB', 'US'],
  },
  {
    id: 'G20',
    name: 'Group of Twenty',
    type: GroupingType.EconomicUnion,
    description: 'International forum for governments and central bank governors',
    members: ['AR', 'AU', 'BR', 'CA', 'CN', 'FR', 'DE', 'IN', 'ID', 'IT', 'JP', 'MX', 'RU', 'SA', 'ZA', 'KR', 'TR', 'GB', 'US'],
  },
  {
    id: 'BRICS',
    name: 'BRICS',
    type: GroupingType.EconomicUnion,
    description: 'Emerging economies cooperation group',
    members: ['BR', 'RU', 'IN', 'CN', 'ZA', 'EG', 'ET', 'IR', 'AE', 'SA'],
  },
  {
    id: 'ASEAN',
    name: 'Association of Southeast Asian Nations',
    type: GroupingType.EconomicUnion,
    description: 'Regional intergovernmental organisation',
    members: ['BN', 'KH', 'ID', 'LA', 'MY', 'MM', 'PH', 'SG', 'TH', 'VN'],
  },
  {
    id: 'OPEC',
    name: 'Organization of the Petroleum Exporting Countries',
    type: GroupingType.EconomicUnion,
    description: 'Intergovernmental organisation of oil-exporting countries',
    members: ['DZ', 'AO', 'CG', 'GQ', 'GA', 'IR', 'IQ', 'KW', 'LY', 'NG', 'SA', 'AE', 'VE'],
  },
  {
    id: 'COMMONWEALTH',
    name: 'Commonwealth of Nations',
    type: GroupingType.PoliticalUnion,
    description: 'Political association of countries, mostly former British territories',
    members: ['AG', 'AU', 'BS', 'BD', 'BB', 'BZ', 'BW', 'BN', 'CM', 'CA', 'CY', 'DM', 'FJ', 'GH', 'GD', 'GY', 'IN', 'JM', 'KE', 'KI', 'LS', 'MW', 'MY', 'MV', 'MT', 'MU', 'MZ', 'NR', 'NZ', 'NG', 'PK', 'PG', 'RW', 'KN', 'LC', 'VC', 'WS', 'SC', 'SL', 'SG', 'SB', 'ZA', 'LK', 'SZ', 'TZ', 'TO', 'TT', 'TV', 'UG', 'GB', 'VU', 'ZM'],
  },
  {
    id: 'AFRICA',
    name: 'Africa',
    type: GroupingType.Continent,
    description: 'African continent',
    members: ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'],
  },
  {
    id: 'EUROPE',
    name: 'Europe',
    type: GroupingType.Continent,
    description: 'European continent',
    members: ['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'GE', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'UA', 'GB', 'VA'],
  },
  {
    id: 'ASIA',
    name: 'Asia',
    type: GroupingType.Continent,
    description: 'Asian continent',
    members: ['AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'KP', 'OM', 'PK', 'PS', 'PH', 'QA', 'RU', 'SA', 'SG', 'KR', 'LK', 'SY', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'],
  },
  {
    id: 'NORTH_AMERICA',
    name: 'North America',
    type: GroupingType.Continent,
    description: 'North American continent',
    members: ['AG', 'BS', 'BB', 'BZ', 'CA', 'CR', 'CU', 'DM', 'DO', 'SV', 'GD', 'GT', 'HT', 'HN', 'JM', 'MX', 'NI', 'PA', 'KN', 'LC', 'VC', 'TT', 'US'],
  },
  {
    id: 'SOUTH_AMERICA',
    name: 'South America',
    type: GroupingType.Continent,
    description: 'South American continent',
    members: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'],
  },
  {
    id: 'OCEANIA',
    name: 'Oceania',
    type: GroupingType.Continent,
    description: 'Oceania continent',
    members: ['AU', 'FJ', 'KI', 'MH', 'FM', 'NR', 'NZ', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV', 'VU'],
  },
];

async function updateCountryGroups(): Promise<void> {
  mkdirSync(RAW_DIR, { recursive: true });

  // Read countries JSON directly
  const countries: Country[] = JSON.parse(readFileSync(COUNTRIES_JSON, 'utf-8'));
  console.log(`Loaded ${countries.length} countries`);

  // Update group memberships on countries
  const updatedCountries = countries.map(country => ({
    ...country,
    groups: STATIC_GROUPS
      .filter(g => g.members.includes(country.alpha2))
      .map(g => g.id),
  }));

  // Write updated countries JSON
  writeFileSync(COUNTRIES_JSON, JSON.stringify(updatedCountries, null, 2), 'utf-8');
  console.log('Updated country group memberships');

  // Write groups JSON (store enum values as strings — type assertion in TS handles typing)
  writeFileSync(GROUPS_JSON, JSON.stringify(STATIC_GROUPS, null, 2), 'utf-8');
  console.log(`Generated ${STATIC_GROUPS.length} groups → ${GROUPS_JSON}`);

  const stats = STATIC_GROUPS.map(g => `  ${g.name}: ${g.members.length} members`).join('\n');
  console.log(`Group statistics:\n${stats}`);
}

async function validateGroupMemberships(): Promise<void> {
  const countries: Country[] = JSON.parse(readFileSync(COUNTRIES_JSON, 'utf-8'));
  const countryAlpha2s = new Set(countries.map(c => c.alpha2));

  for (const group of STATIC_GROUPS) {
    const invalid = group.members.filter(m => !countryAlpha2s.has(m));
    if (invalid.length > 0) {
      console.warn(`${group.name} has unrecognized members: ${invalid.join(', ')}`);
    }
  }
  console.log('Group membership validation complete');
}

if (require.main === module) {
  const command = process.argv[2];
  const fn = command === 'validate' ? validateGroupMemberships : updateCountryGroups;
  fn().catch(err => { console.error(err); process.exit(1); });
}

export { updateCountryGroups, validateGroupMemberships, STATIC_GROUPS };
// Legacy named export for update-all.ts compatibility
export class CountryGroupsUpdater {
  async updateCountryGroups() { return updateCountryGroups(); }
  async validateGroupMemberships() { return validateGroupMemberships(); }
}
