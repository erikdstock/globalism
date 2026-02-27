import type { CountryGroup } from './types';
import countryGroupsRaw from './raw/countryGroups.json';

export const countryGroups = countryGroupsRaw as CountryGroup[];
