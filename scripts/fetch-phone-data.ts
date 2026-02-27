#!/usr/bin/env tsx
/**
 * Enriches countries.json with phone number regexps from libphonenumber-js metadata.
 * libphonenumber-js is a dev dependency and NOT bundled into the published library.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Country } from '../packages/globalism/src/data/types';

// libphonenumber-js metadata: countries[alpha2] is an array where index 2 = national number pattern
import metadata from 'libphonenumber-js/metadata.min.json';

const COUNTRIES_PATH = join(__dirname, '../packages/globalism/src/data/raw/countries.json');

type PhoneMetadataEntry = [
  callingCode: string,
  idd: unknown,
  nationalNumberPattern: string,
  ...rest: unknown[]
];

type CountriesMetadata = Record<string, PhoneMetadataEntry>;

function fetchPhoneData(): void {
  const countries: Country[] = JSON.parse(readFileSync(COUNTRIES_PATH, 'utf-8'));
  const phoneMeta = (metadata as { countries: CountriesMetadata }).countries;

  let updated = 0;
  let missing = 0;

  const enriched = countries.map((country) => {
    const entry = phoneMeta[country.alpha2];
    if (!entry || typeof entry[2] !== 'string' || !entry[2]) {
      missing++;
      return country;
    }

    // Wrap the national number pattern in anchors
    const phoneRegexp = `^(?:${entry[2]})$`;
    updated++;
    return { ...country, phoneRegexp };
  });

  writeFileSync(COUNTRIES_PATH, JSON.stringify(enriched, null, 2));
  console.log(`Phone data: updated ${updated} countries, ${missing} had no metadata`);
}

if (require.main === module) {
  fetchPhoneData();
}

export { fetchPhoneData };
