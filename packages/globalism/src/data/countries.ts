import type { Country } from './types';
import countriesRaw from './raw/countries.json';

export const countries = countriesRaw as Country[];
