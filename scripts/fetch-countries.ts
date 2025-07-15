#!/usr/bin/env tsx

import { writeFileSync } from 'fs';
import { join } from 'path';
import type { Country, CountryGroup, Language } from '../src/data/types';

interface RestCountryData {
  cca2: string;
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  idd?: {
    root: string;
    suffixes: string[];
  };
  tld?: string[];
  flag?: string;
  region?: string;
  subregion?: string;
  population?: number;
  area?: number;
  postalCode?: {
    format: string;
    regex: string;
  };
}

interface WorldBankCountryData {
  id: string;
  name: string;
  region: {
    id: string;
    value: string;
  };
  incomeLevel: {
    id: string;
    value: string;
  };
}

class CountryDataFetcher {
  private baseUrl = 'https://restcountries.com/v3.1';
  private worldBankUrl = 'https://api.worldbank.org/v2';

  async fetchRestCountries(): Promise<RestCountryData[]> {
    console.log('Fetching data from REST Countries API...');
    try {
      // Try the main endpoint first
      let response = await fetch(`${this.baseUrl}/all`);
      
      if (!response.ok) {
        console.log(`Primary endpoint failed with status ${response.status}, trying alternative...`);
        // Try alternative endpoint
        response = await fetch(`${this.baseUrl}/all?fields=name,cca2,cca3,currencies,languages,idd,tld,flag,region,subregion,population,area`);
      }
      
      if (!response.ok) {
        console.log(`Alternative endpoint failed with status ${response.status}, using fallback data...`);
        // Return minimal fallback data
        return this.getFallbackCountryData();
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching REST Countries data:', error);
      console.log('Using fallback data...');
      return this.getFallbackCountryData();
    }
  }

  private getFallbackCountryData(): RestCountryData[] {
    // Basic fallback data for common countries
    return [
      {
        cca2: 'US',
        cca3: 'USA',
        name: { common: 'United States', official: 'United States of America' },
        currencies: { USD: { name: 'United States dollar', symbol: '$' } },
        languages: { eng: 'English' },
        idd: { root: '+1', suffixes: [''] },
        tld: ['.us'],
        flag: '🇺🇸'
      },
      {
        cca2: 'CA',
        cca3: 'CAN',
        name: { common: 'Canada', official: 'Canada' },
        currencies: { CAD: { name: 'Canadian dollar', symbol: '$' } },
        languages: { eng: 'English', fra: 'French' },
        idd: { root: '+1', suffixes: [''] },
        tld: ['.ca'],
        flag: '🇨🇦'
      },
      {
        cca2: 'GB',
        cca3: 'GBR',
        name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
        currencies: { GBP: { name: 'British pound', symbol: '£' } },
        languages: { eng: 'English' },
        idd: { root: '+44', suffixes: [''] },
        tld: ['.uk'],
        flag: '🇬🇧'
      },
      {
        cca2: 'DE',
        cca3: 'DEU',
        name: { common: 'Germany', official: 'Federal Republic of Germany' },
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { deu: 'German' },
        idd: { root: '+49', suffixes: [''] },
        tld: ['.de'],
        flag: '🇩🇪'
      },
      {
        cca2: 'FR',
        cca3: 'FRA',
        name: { common: 'France', official: 'French Republic' },
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { fra: 'French' },
        idd: { root: '+33', suffixes: [''] },
        tld: ['.fr'],
        flag: '🇫🇷'
      }
    ];
  }

  async fetchWorldBankData(): Promise<WorldBankCountryData[]> {
    console.log('Fetching data from World Bank API...');
    try {
      const response = await fetch(`${this.worldBankUrl}/country?format=json&per_page=300`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data[1] || []; // World Bank API returns [metadata, data]
    } catch (error) {
      console.error('Error fetching World Bank data:', error);
      return [];
    }
  }

  private extractPhoneCode(idd?: { root: string; suffixes: string[] }): string {
    if (!idd?.root) return '';
    const suffix = idd.suffixes?.[0] || '';
    return `${idd.root}${suffix}`;
  }

  private extractCurrency(currencies?: Record<string, { name: string; symbol: string }>): {
    code: string;
    symbol: string;
  } {
    if (!currencies) return { code: '', symbol: '' };
    const [code, currency] = Object.entries(currencies)[0];
    return { code, symbol: currency.symbol || '' };
  }

  private extractLanguages(languages?: Record<string, string>): string[] {
    if (!languages) return [];
    return Object.keys(languages).map(key => {
      // Convert 3-letter codes to 2-letter codes
      const mapping: Record<string, string> = {
        'eng': 'en',
        'fra': 'fr',
        'deu': 'de',
        'spa': 'es',
        'ita': 'it',
        'por': 'pt',
        'rus': 'ru',
        'ara': 'ar',
        'zho': 'zh',
        'jpn': 'ja',
        'kor': 'ko',
        'hin': 'hi'
      };
      return mapping[key] || key;
    });
  }

  private extractNativeNames(nativeName?: Record<string, { official: string; common: string }>): string[] {
    if (!nativeName) return [];
    return Object.values(nativeName).map(name => name.common);
  }

  private generatePhoneRegex(phoneCode: string): string {
    // Basic phone regex patterns by country code
    const patterns: Record<string, string> = {
      '+1': '^\\\\(?\\\\d{3}\\\\)?[-.\\\\s]?\\\\d{3}[-.\\\\s]?\\\\d{4}$', // US/Canada
      '+44': '^\\\\d{4}\\\\s?\\\\d{6}$', // UK
      '+33': '^\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}$', // France
      '+49': '^\\\\d{3,4}\\\\s?\\\\d{7,8}$', // Germany
      '+81': '^\\\\d{2,3}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$', // Japan
      '+86': '^\\\\d{3}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$', // China
    };
    return patterns[phoneCode] || '^\\\\d{7,15}$'; // Default pattern
  }

  private generatePhoneFormat(phoneCode: string): string {
    const formats: Record<string, string> = {
      '+1': '(###) ###-####',
      '+44': '#### ######',
      '+33': '## ## ## ## ##',
      '+49': '### ########',
      '+81': '##-####-####',
      '+86': '### #### ####',
    };
    return formats[phoneCode] || '###########';
  }

  transformToCountryData(restData: RestCountryData[], worldBankData: WorldBankCountryData[]): Country[] {
    console.log(`Transforming ${restData.length} countries...`);
    
    return restData
      .filter(country => country.cca2 && country.cca3) // Filter out invalid entries
      .map(country => {
        const currency = this.extractCurrency(country.currencies);
        const phoneCode = this.extractPhoneCode(country.idd);
        
        const transformedCountry: Country = {
          alpha2: country.cca2,
          alpha3: country.cca3,
          name: country.name.common,
          officialName: country.name.official,
          nativeNames: this.extractNativeNames(country.name.nativeName),
          languages: this.extractLanguages(country.languages),
          currency: currency.code,
          currencySymbol: currency.symbol,
          phoneCountryCode: phoneCode,
          phoneRegexp: this.generatePhoneRegex(phoneCode),
          phoneFormat: this.generatePhoneFormat(phoneCode),
          tld: country.tld?.[0] || '',
          flag: country.flag || '',
          groups: [], // Will be populated by group membership scripts
          postalCodeRegexp: country.postalCode?.regex || '',
          postalCodeFormat: country.postalCode?.format || '',
        };

        return transformedCountry;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async generateCountriesFile(): Promise<void> {
    try {
      const [restData, worldBankData] = await Promise.all([
        this.fetchRestCountries(),
        this.fetchWorldBankData(),
      ]);

      const countries = this.transformToCountryData(restData, worldBankData);
      
      const fileContent = `import type { Country } from "./types";

export const countries: Country[] = ${JSON.stringify(countries, null, 2)};
`;

      const filePath = join(__dirname, '../src/data/countries.ts');
      writeFileSync(filePath, fileContent, 'utf-8');
      
      console.log(`✅ Generated ${countries.length} countries in ${filePath}`);
    } catch (error) {
      console.error('❌ Error generating countries file:', error);
      process.exit(1);
    }
  }
}

// Run the script
if (require.main === module) {
  const fetcher = new CountryDataFetcher();
  fetcher.generateCountriesFile();
}

export { CountryDataFetcher };