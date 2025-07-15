#!/usr/bin/env tsx

import { CountryDataFetcher } from './fetch-countries';
import { CountryGroupsUpdater } from './update-groups';
import { LanguageUpdater } from './update-languages';

interface UpdateOptions {
  fetchCountries?: boolean;
  updateGroups?: boolean;
  updateLanguages?: boolean;
  validate?: boolean;
}

class MasterUpdater {
  private countryFetcher = new CountryDataFetcher();
  private groupsUpdater = new CountryGroupsUpdater();
  private languageUpdater = new LanguageUpdater();

  async updateAll(options: UpdateOptions = {}): Promise<void> {
    const {
      fetchCountries = true,
      updateGroups = true,
      updateLanguages = true,
      validate = true
    } = options;

    console.log('🚀 Starting data update process...\n');

    try {
      // Step 1: Update languages first (they're referenced by countries)
      if (updateLanguages) {
        console.log('📚 Updating languages...');
        await this.languageUpdater.updateLanguages();
        console.log('');
      }

      // Step 2: Fetch country data from APIs
      if (fetchCountries) {
        console.log('🌍 Fetching country data...');
        await this.countryFetcher.generateCountriesFile();
        console.log('');
      }

      // Step 3: Update country group memberships
      if (updateGroups) {
        console.log('🤝 Updating country groups...');
        await this.groupsUpdater.updateCountryGroups();
        console.log('');
      }

      // Step 4: Validate all data
      if (validate) {
        console.log('🔍 Validating data...');
        await this.validateAllData();
        console.log('');
      }

      console.log('✅ Data update process completed successfully!');
      this.printSummary();

    } catch (error) {
      console.error('❌ Data update process failed:', error);
      process.exit(1);
    }
  }

  private async validateAllData(): Promise<void> {
    console.log('  → Validating country group memberships...');
    await this.groupsUpdater.validateGroupMemberships();
    
    console.log('  → Validating language usage...');
    await this.languageUpdater.validateLanguageUsage();
  }

  private printSummary(): void {
    console.log('\n📊 Update Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Countries data updated from REST Countries API');
    console.log('✅ Country group memberships updated');
    console.log('✅ Language definitions updated');
    console.log('✅ Data validation completed');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎯 Next steps:');
    console.log('• Run tests: npm test');
    console.log('• Check TypeScript: npm run type-check');
    console.log('• Review changes: git diff');
    console.log('• Commit changes: git add . && git commit -m "Update country data"');
  }
}

// Parse command line arguments
function parseArgs(): UpdateOptions {
  const args = process.argv.slice(2);
  const options: UpdateOptions = {};

  if (args.includes('--countries-only')) {
    options.fetchCountries = true;
    options.updateGroups = false;
    options.updateLanguages = false;
    options.validate = false;
  } else if (args.includes('--groups-only')) {
    options.fetchCountries = false;
    options.updateGroups = true;
    options.updateLanguages = false;
    options.validate = false;
  } else if (args.includes('--languages-only')) {
    options.fetchCountries = false;
    options.updateGroups = false;
    options.updateLanguages = true;
    options.validate = false;
  } else if (args.includes('--validate-only')) {
    options.fetchCountries = false;
    options.updateGroups = false;
    options.updateLanguages = false;
    options.validate = true;
  } else if (args.includes('--no-validate')) {
    options.validate = false;
  }

  return options;
}

// Run the script
if (require.main === module) {
  const options = parseArgs();
  const updater = new MasterUpdater();
  updater.updateAll(options);
}

export { MasterUpdater };