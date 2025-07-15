#!/usr/bin/env tsx

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import type { Country, CountryGroup, GroupingType } from '../src/data/types';

interface GroupDefinition {
  id: string;
  name: string;
  type: GroupingType;
  description?: string;
  members: string[]; // alpha2 codes
  source: 'static' | 'api';
  apiUrl?: string;
}

class CountryGroupsUpdater {
  private staticGroups: GroupDefinition[] = [
    {
      id: 'EU',
      name: 'European Union',
      type: GroupingType.PoliticalUnion,
      description: 'Political and economic union of European countries',
      members: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'],
      source: 'static'
    },
    {
      id: 'NATO',
      name: 'North Atlantic Treaty Organization',
      type: GroupingType.MilitaryAlliance,
      description: 'Military alliance of North American and European countries',
      members: ['US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'DK', 'NO', 'IS', 'LU', 'PT', 'GR', 'TR', 'CZ', 'HU', 'PL', 'BG', 'EE', 'LV', 'LT', 'RO', 'SK', 'SI', 'AL', 'HR', 'ME', 'MK', 'FI', 'SE'],
      source: 'static'
    },
    {
      id: 'OECD',
      name: 'Organisation for Economic Co-operation and Development',
      type: GroupingType.EconomicUnion,
      description: 'International organisation working to build better policies for better lives',
      members: ['AU', 'AT', 'BE', 'CA', 'CL', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IL', 'IT', 'JP', 'KR', 'LV', 'LT', 'LU', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'GB', 'US', 'CO', 'CR'],
      source: 'static'
    },
    {
      id: 'G7',
      name: 'Group of Seven',
      type: GroupingType.EconomicUnion,
      description: 'Forum of advanced economies',
      members: ['CA', 'FR', 'DE', 'IT', 'JP', 'GB', 'US'],
      source: 'static'
    },
    {
      id: 'G20',
      name: 'Group of Twenty',
      type: GroupingType.EconomicUnion,
      description: 'International forum for governments and central bank governors',
      members: ['AR', 'AU', 'BR', 'CA', 'CN', 'FR', 'DE', 'IN', 'ID', 'IT', 'JP', 'MX', 'RU', 'SA', 'ZA', 'KR', 'TR', 'GB', 'US', 'EU'],
      source: 'static'
    },
    {
      id: 'BRICS',
      name: 'Brazil, Russia, India, China, South Africa',
      type: GroupingType.EconomicUnion,
      description: 'Emerging economies cooperation group',
      members: ['BR', 'RU', 'IN', 'CN', 'ZA', 'EG', 'ET', 'IR', 'AE', 'SA'],
      source: 'static'
    },
    {
      id: 'ASEAN',
      name: 'Association of Southeast Asian Nations',
      type: GroupingType.EconomicUnion,
      description: 'Regional intergovernmental organisation',
      members: ['BN', 'KH', 'ID', 'LA', 'MY', 'MM', 'PH', 'SG', 'TH', 'VN'],
      source: 'static'
    },
    {
      id: 'OPEC',
      name: 'Organization of the Petroleum Exporting Countries',
      type: GroupingType.EconomicUnion,
      description: 'Intergovernmental organisation of oil-exporting countries',
      members: ['DZ', 'AO', 'CG', 'GQ', 'GA', 'IR', 'IQ', 'KW', 'LY', 'NG', 'SA', 'AE', 'VE'],
      source: 'static'
    },
    {
      id: 'COMMONWEALTH',
      name: 'Commonwealth of Nations',
      type: GroupingType.PoliticalUnion,
      description: 'Political association of countries, mostly former British territories',
      members: ['AG', 'AU', 'BS', 'BD', 'BB', 'BZ', 'BW', 'BN', 'CM', 'CA', 'CY', 'DM', 'FJ', 'GH', 'GD', 'GY', 'IN', 'JM', 'KE', 'KI', 'LS', 'MW', 'MY', 'MV', 'MT', 'MU', 'MZ', 'NR', 'NZ', 'NG', 'PK', 'PG', 'RW', 'KN', 'LC', 'VC', 'WS', 'SC', 'SL', 'SG', 'SB', 'ZA', 'LK', 'SZ', 'TZ', 'TO', 'TT', 'TV', 'UG', 'GB', 'VU', 'ZM'],
      source: 'static'
    },
    {
      id: 'AFRICA',
      name: 'Africa',
      type: GroupingType.Continent,
      description: 'African continent',
      members: ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'],
      source: 'static'
    },
    {
      id: 'EUROPE',
      name: 'Europe',
      type: GroupingType.Continent,
      description: 'European continent',
      members: ['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'GE', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'UA', 'GB', 'VA'],
      source: 'static'
    },
    {
      id: 'ASIA',
      name: 'Asia',
      type: GroupingType.Continent,
      description: 'Asian continent',
      members: ['AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'KP', 'OM', 'PK', 'PS', 'PH', 'QA', 'RU', 'SA', 'SG', 'KR', 'LK', 'SY', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'],
      source: 'static'
    },
    {
      id: 'NORTH_AMERICA',
      name: 'North America',
      type: GroupingType.Continent,
      description: 'North American continent',
      members: ['AG', 'BS', 'BB', 'BZ', 'CA', 'CR', 'CU', 'DM', 'DO', 'SV', 'GD', 'GT', 'HT', 'HN', 'JM', 'MX', 'NI', 'PA', 'KN', 'LC', 'VC', 'TT', 'US'],
      source: 'static'
    },
    {
      id: 'SOUTH_AMERICA',
      name: 'South America',
      type: GroupingType.Continent,
      description: 'South American continent',
      members: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'],
      source: 'static'
    },
    {
      id: 'OCEANIA',
      name: 'Oceania',
      type: GroupingType.Continent,
      description: 'Oceania continent',
      members: ['AU', 'FJ', 'KI', 'MH', 'FM', 'NR', 'NZ', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV', 'VU'],
      source: 'static'
    }
  ];

  private countriesFilePath = join(__dirname, '../src/data/countries.ts');
  private groupsFilePath = join(__dirname, '../src/data/countryGroups.ts');

  async updateCountryGroups(): Promise<void> {
    try {
      // Read existing countries data
      const countriesContent = readFileSync(this.countriesFilePath, 'utf-8');
      const countriesMatch = countriesContent.match(/export const countries: Country\[\] = ([\s\S]*);/);
      
      if (!countriesMatch) {
        throw new Error('Could not parse countries data');
      }

      const countries: Country[] = JSON.parse(countriesMatch[1]);
      console.log(`Loaded ${countries.length} countries`);

      // Update country group memberships
      const updatedCountries = countries.map(country => {
        const groups = this.staticGroups
          .filter(group => group.members.includes(country.alpha2))
          .map(group => group.id);
        
        return { ...country, groups };
      });

      // Generate updated countries file
      const updatedCountriesContent = `import type { Country } from "./types";

export const countries: Country[] = ${JSON.stringify(updatedCountries, null, 2)};
`;

      writeFileSync(this.countriesFilePath, updatedCountriesContent, 'utf-8');
      console.log('✅ Updated country group memberships');

      // Generate country groups file
      const groupsContent = `import type { CountryGroup } from "./types";

export const countryGroups: CountryGroup[] = ${JSON.stringify(this.staticGroups, null, 2)};
`;

      writeFileSync(this.groupsFilePath, groupsContent, 'utf-8');
      console.log('✅ Generated country groups file');

      // Log statistics
      const groupStats = this.staticGroups.map(group => 
        `${group.name}: ${group.members.length} members`
      ).join('\n');
      
      console.log('\n📊 Group Statistics:');
      console.log(groupStats);

    } catch (error) {
      console.error('❌ Error updating country groups:', error);
      process.exit(1);
    }
  }

  async validateGroupMemberships(): Promise<void> {
    try {
      const countriesContent = readFileSync(this.countriesFilePath, 'utf-8');
      const countriesMatch = countriesContent.match(/export const countries: Country\[\] = ([\s\S]*);/);
      
      if (!countriesMatch) {
        throw new Error('Could not parse countries data');
      }

      const countries: Country[] = JSON.parse(countriesMatch[1]);
      const countryAlpha2s = new Set(countries.map(c => c.alpha2));

      console.log('🔍 Validating group memberships...');
      
      for (const group of this.staticGroups) {
        const invalidMembers = group.members.filter(member => !countryAlpha2s.has(member));
        if (invalidMembers.length > 0) {
          console.warn(`⚠️  ${group.name} has invalid members: ${invalidMembers.join(', ')}`);
        }
      }

      console.log('✅ Group membership validation complete');

    } catch (error) {
      console.error('❌ Error validating group memberships:', error);
      process.exit(1);
    }
  }
}

// Run the script
if (require.main === module) {
  const updater = new CountryGroupsUpdater();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'validate':
      updater.validateGroupMemberships();
      break;
    case 'update':
    default:
      updater.updateCountryGroups();
      break;
  }
}

export { CountryGroupsUpdater };