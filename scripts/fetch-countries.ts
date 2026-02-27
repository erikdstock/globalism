#!/usr/bin/env tsx

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import type { Country } from '../packages/globalism/src/data/types';

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
  postalCode?: {
    format: string;
    regex: string;
  };
}

class CountryDataFetcher {
  private baseUrl = 'https://restcountries.com/v3.1';

  async fetchRestCountries(): Promise<RestCountryData[]> {
    console.log('Fetching data from REST Countries API...');
    try {
      const fields = 'cca2,cca3,name,currencies,languages,idd,tld,flag,postalCode';
      const response = await fetch(`${this.baseUrl}/all?fields=${fields}`);
      if (!response.ok) {
        console.log(`Primary endpoint failed (${response.status}), using fallback data...`);
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
    console.error('ERROR: Could not fetch country data from REST Countries API. countries.json will be empty.');
    return [];
  }

  private extractPhoneCode(idd?: { root: string; suffixes: string[] }): string {
    if (!idd?.root) return '';
    const suffix = idd.suffixes?.[0] ?? '';
    return `${idd.root}${suffix}`;
  }

  private extractCurrency(currencies?: Record<string, { name: string; symbol: string }>): {
    code: string;
    symbol: string;
  } {
    const entry = currencies && Object.entries(currencies)[0];
    if (!entry) return { code: '', symbol: '' };
    const [code, currency] = entry;
    return { code, symbol: currency.symbol ?? '' };
  }

  // Complete ISO 639-1: 3-letter → 2-letter code mapping
  private readonly iso3To2: Record<string, string> = {
    'afr': 'af', 'aka': 'ak', 'sqi': 'sq', 'amh': 'am', 'ara': 'ar', 'arg': 'an',
    'hye': 'hy', 'ava': 'av', 'aze': 'az', 'bam': 'bm', 'bak': 'ba', 'eus': 'eu',
    'bel': 'be', 'ben': 'bn', 'bih': 'bh', 'bis': 'bi', 'bos': 'bs', 'bre': 'br',
    'bul': 'bg', 'mya': 'my', 'cat': 'ca', 'cha': 'ch', 'che': 'ce', 'nya': 'ny',
    'zho': 'zh', 'chv': 'cv', 'cor': 'kw', 'cos': 'co', 'cre': 'cr', 'hrv': 'hr',
    'ces': 'cs', 'dan': 'da', 'div': 'dv', 'nld': 'nl', 'dzo': 'dz', 'eng': 'en',
    'epo': 'eo', 'est': 'et', 'ewe': 'ee', 'fao': 'fo', 'fij': 'fj', 'fin': 'fi',
    'fra': 'fr', 'ful': 'ff', 'glg': 'gl', 'kat': 'ka', 'deu': 'de', 'ell': 'el',
    'grn': 'gn', 'guj': 'gu', 'hat': 'ht', 'hau': 'ha', 'heb': 'he', 'her': 'hz',
    'hin': 'hi', 'hmo': 'ho', 'hun': 'hu', 'ina': 'ia', 'ind': 'id', 'ile': 'ie',
    'gle': 'ga', 'ibo': 'ig', 'iku': 'iu', 'ido': 'io', 'isl': 'is', 'ita': 'it',
    'iii': 'ii', 'inu': 'ik', 'jpn': 'ja', 'jav': 'jv', 'kln': 'kl', 'kan': 'kn',
    'kau': 'kr', 'kas': 'ks', 'kaz': 'kk', 'khm': 'km', 'kik': 'ki', 'kin': 'rw',
    'kir': 'ky', 'kom': 'kv', 'kon': 'kg', 'kor': 'ko', 'kur': 'ku', 'kua': 'kj',
    'lat': 'la', 'ltz': 'lb', 'lug': 'lg', 'lim': 'li', 'lin': 'ln', 'lao': 'lo',
    'lit': 'lt', 'lub': 'lu', 'lav': 'lv', 'glv': 'gv', 'mkd': 'mk', 'mlg': 'mg',
    'msa': 'ms', 'mal': 'ml', 'mlt': 'mt', 'mri': 'mi', 'mar': 'mr', 'mah': 'mh',
    'mon': 'mn', 'nau': 'na', 'nav': 'nv', 'nob': 'nb', 'nde': 'nd', 'nep': 'ne',
    'ndo': 'ng', 'nno': 'nn', 'nor': 'no', 'nbl': 'nr', 'oci': 'oc', 'oji': 'oj',
    'ori': 'or', 'orm': 'om', 'oss': 'os', 'pan': 'pa', 'pli': 'pi', 'fas': 'fa',
    'pol': 'pl', 'pus': 'ps', 'por': 'pt', 'que': 'qu', 'roh': 'rm', 'run': 'rn',
    'ron': 'ro', 'rus': 'ru', 'san': 'sa', 'srd': 'sc', 'snd': 'sd', 'sme': 'se',
    'smo': 'sm', 'sag': 'sg', 'srp': 'sr', 'gla': 'gd', 'sna': 'sn', 'sin': 'si',
    'slk': 'sk', 'slv': 'sl', 'som': 'so', 'sot': 'st', 'spa': 'es', 'sun': 'su',
    'swa': 'sw', 'ssw': 'ss', 'swe': 'sv', 'tam': 'ta', 'tel': 'te', 'tgk': 'tg',
    'tha': 'th', 'tir': 'ti', 'bod': 'bo', 'tuk': 'tk', 'tgl': 'tl', 'tsn': 'tn',
    'ton': 'to', 'tur': 'tr', 'tso': 'ts', 'tat': 'tt', 'twi': 'tw', 'tah': 'ty',
    'uig': 'ug', 'ukr': 'uk', 'urd': 'ur', 'uzb': 'uz', 'ven': 've', 'vie': 'vi',
    'vol': 'vo', 'wln': 'wa', 'cym': 'cy', 'wol': 'wo', 'fry': 'fy', 'xho': 'xh',
    'yid': 'yi', 'yor': 'yo', 'zha': 'za', 'zul': 'zu',
  };

  private extractLanguages(languages?: Record<string, string>): string[] {
    if (!languages) return [];
    return Object.keys(languages).map(key => this.iso3To2[key]).filter((code): code is string => !!code);
  }

  private extractNativeNames(nativeName?: Record<string, { official: string; common: string }>): string[] {
    if (!nativeName) return [];
    return Object.values(nativeName).map(n => n.common);
  }

  private generatePhoneFormat(phoneCode: string): string {
    const formats: Record<string, string> = {
      '+1':  '(###) ###-####',
      '+44': '#### ######',
      '+33': '## ## ## ## ##',
      '+49': '### ########',
      '+81': '##-####-####',
      '+86': '### #### ####',
      '+91': '##### #####',
      '+61': '## #### ####',
      '+55': '(##) #####-####',
      '+7':  '### ###-##-##',
    };
    return formats[phoneCode] ?? '###########';
  }

  transformToCountryData(restData: RestCountryData[]): Country[] {
    console.log(`Transforming ${restData.length} countries...`);

    return restData
      .filter(c => c.cca2 && c.cca3)
      .map(country => {
        const currency = this.extractCurrency(country.currencies);
        const phoneCode = this.extractPhoneCode(country.idd);
        const phoneFormat = this.generatePhoneFormat(phoneCode);
        const nativeNames = this.extractNativeNames(country.name.nativeName);

        const transformed: Country = {
          alpha2: country.cca2.toUpperCase(),
          alpha3: country.cca3.toUpperCase(),
          name: country.name.common,
          officialName: country.name.official,
          nativeNames,
          languages: this.extractLanguages(country.languages),
          currency: currency.code,
          currencySymbol: currency.symbol,
          phoneCountryCode: phoneCode,
          tld: country.tld?.[0] ?? '',
          flag: country.flag ?? '',
          groups: [],
          ...(phoneFormat !== '###########' && { phoneFormat }),
          ...(country.postalCode?.regex && { postalCodeRegexp: country.postalCode.regex }),
          ...(country.postalCode?.format && { postalCodeFormat: country.postalCode.format }),
        };

        return transformed;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async generateCountriesFile(): Promise<void> {
    const restData = await this.fetchRestCountries();
    const countries = this.transformToCountryData(restData);

    const outputPath = join(__dirname, '../packages/globalism/src/data/raw/countries.json');
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(countries, null, 2), 'utf-8');

    console.log(`Generated ${countries.length} countries → ${outputPath}`);
  }
}

if (require.main === module) {
  const fetcher = new CountryDataFetcher();
  fetcher.generateCountriesFile().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

export { CountryDataFetcher };
