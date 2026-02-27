import type { Country, CountryGroup, Language } from '../data/types';
import { countries } from '../data/countries';
import { countryGroups } from '../data/countryGroups';
import { languages } from '../data/languages';

export const findCountryByAlpha2 = (alpha2: string): Country | undefined =>
  countries.find(c => c.alpha2.toUpperCase() === alpha2.toUpperCase());

export const findCountryByAlpha3 = (alpha3: string): Country | undefined =>
  countries.find(c => c.alpha3.toUpperCase() === alpha3.toUpperCase());

export const findCountriesByGroup = (groupId: string): Country[] =>
  countries.filter(c => c.groups.includes(groupId));

export const findGroupById = (id: string): CountryGroup | undefined =>
  countryGroups.find(g => g.id === id);

export const findLanguageByCode = (code: string): Language | undefined =>
  languages.find(l => l.code === code);
