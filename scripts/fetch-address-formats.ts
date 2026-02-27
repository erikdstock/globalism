#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';
import type { Country } from '../packages/globalism/src/data/types';

const RAW_DIR = join(__dirname, '../packages/globalism/src/data/raw');
const COUNTRIES_FILE = join(RAW_DIR, 'countries.json');

const WORLDWIDE_YAML_URL =
  'https://raw.githubusercontent.com/OpenCageData/address-formatting/master/conf/countries/worldwide.yaml';

interface WorldwideYaml {
  [countryCode: string]: {
    address_template?: string;
    [key: string]: unknown;
  };
}

async function fetchAddressFormats(): Promise<void> {
  console.log('Fetching address format templates from OpenCageData...');

  let countries: Country[];
  try {
    countries = JSON.parse(readFileSync(COUNTRIES_FILE, 'utf-8'));
  } catch {
    throw new Error(
      `Could not read ${COUNTRIES_FILE}. Run fetch-countries first.`
    );
  }

  let yamlText: string;
  try {
    const response = await fetch(WORLDWIDE_YAML_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    yamlText = await response.text();
  } catch (error) {
    console.warn(`Failed to fetch address formats: ${error}`);
    console.log('Skipping address format update.');
    return;
  }

  const parsed = yaml.load(yamlText) as WorldwideYaml;

  let updated = 0;
  const countriesWithFormats = countries.map(country => {
    const entry = parsed[country.alpha2];
    if (entry?.address_template) {
      const lines = entry.address_template
        .split('\n')
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 0);
      if (lines.length > 0) {
        updated++;
        return { ...country, addressFormat: lines };
      }
    }
    return country;
  });

  writeFileSync(COUNTRIES_FILE, JSON.stringify(countriesWithFormats, null, 2), 'utf-8');
  console.log(`Updated address formats for ${updated} / ${countries.length} countries → ${COUNTRIES_FILE}`);
}

if (require.main === module) {
  fetchAddressFormats().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

export { fetchAddressFormats };
