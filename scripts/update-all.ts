#!/usr/bin/env tsx

import { CountryDataFetcher } from './fetch-countries';
import { CountryGroupsUpdater } from './update-groups';
import { LanguageUpdater } from './update-languages';
import { fetchAddressFormats } from './fetch-address-formats';
import { DataValidator } from './validate-data';

interface UpdateOptions {
  fetchCountries?: boolean;
  fetchAddresses?: boolean;
  updateGroups?: boolean;
  updateLanguages?: boolean;
  validate?: boolean;
}

class MasterUpdater {
  async updateAll(options: UpdateOptions = {}): Promise<void> {
    const {
      fetchCountries = true,
      fetchAddresses = true,
      updateGroups = true,
      updateLanguages = true,
      validate = true,
    } = options;

    console.log('Starting data update process...\n');

    // Step 1: Languages (no deps)
    if (updateLanguages) {
      console.log('Updating languages...');
      await new LanguageUpdater().updateLanguages();
      console.log('');
    }

    // Step 2: Countries from REST API (no deps)
    if (fetchCountries) {
      console.log('Fetching country data...');
      await new CountryDataFetcher().generateCountriesFile();
      console.log('');
    }

    // Step 3: Address formats (depends on countries.json existing)
    if (fetchAddresses) {
      console.log('Fetching address format templates...');
      await fetchAddressFormats();
      console.log('');
    }

    // Step 4: Groups (depends on countries.json existing)
    if (updateGroups) {
      console.log('Updating country groups...');
      await new CountryGroupsUpdater().updateCountryGroups();
      console.log('');
    }

    // Step 5: Validate
    if (validate) {
      console.log('Validating data...');
      const result = await new DataValidator().validateAll();
      if (!result.valid) {
        console.error('Data validation failed');
        process.exit(1);
      }
      console.log('');
    }

    console.log('Data update complete!');
    console.log('Next steps: yarn test && yarn build && git diff');
  }
}

function parseArgs(): UpdateOptions {
  const args = process.argv.slice(2);
  if (args.includes('--countries-only')) {
    return { fetchCountries: true, fetchAddresses: false, updateGroups: false, updateLanguages: false, validate: false };
  }
  if (args.includes('--groups-only')) {
    return { fetchCountries: false, fetchAddresses: false, updateGroups: true, updateLanguages: false, validate: false };
  }
  if (args.includes('--languages-only')) {
    return { fetchCountries: false, fetchAddresses: false, updateGroups: false, updateLanguages: true, validate: false };
  }
  if (args.includes('--addresses-only')) {
    return { fetchCountries: false, fetchAddresses: true, updateGroups: false, updateLanguages: false, validate: false };
  }
  if (args.includes('--validate-only')) {
    return { fetchCountries: false, fetchAddresses: false, updateGroups: false, updateLanguages: false, validate: true };
  }
  if (args.includes('--no-validate')) {
    return { validate: false };
  }
  return {};
}

if (require.main === module) {
  new MasterUpdater().updateAll(parseArgs()).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

export { MasterUpdater };
