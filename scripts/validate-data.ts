#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join } from 'path';
import type { Country, CountryGroup, Language } from '../packages/globalism/src/data/types';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

class DataValidator {
  private countriesPath = join(__dirname, '../packages/globalism/src/data/countries.ts');
  private groupsPath = join(__dirname, '../packages/globalism/src/data/countryGroups.ts');
  private languagesPath = join(__dirname, '../packages/globalism/src/data/languages.ts');

  async validateAll(): Promise<ValidationResult> {
    console.log('🔍 Starting comprehensive data validation...\n');

    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: []
    };

    try {
      // Load all data
      const countries = this.loadCountries();
      const groups = this.loadCountryGroups();
      const languages = this.loadLanguages();

      console.log(`📊 Loaded ${countries.length} countries, ${groups.length} groups, ${languages.length} languages\n`);

      // Run validation tests
      this.validateCountries(countries, result);
      this.validateCountryGroups(groups, result);
      this.validateLanguages(languages, result);
      this.validateReferences(countries, groups, languages, result);

      // Print results
      this.printValidationResults(result);

    } catch (error) {
      result.valid = false;
      result.errors.push(`Failed to load data: ${error}`);
      console.error('❌ Validation failed:', error);
    }

    return result;
  }

  private loadCountries(): Country[] {
    const content = readFileSync(this.countriesPath, 'utf-8');
    const match = content.match(/export const countries: Country\[\] = ([\s\S]*);/);
    if (!match) throw new Error('Could not parse countries data');
    return JSON.parse(match[1]);
  }

  private loadCountryGroups(): CountryGroup[] {
    try {
      const content = readFileSync(this.groupsPath, 'utf-8');
      const match = content.match(/export const countryGroups: CountryGroup\[\] = ([\s\S]*);/);
      if (!match) {
        console.warn('Could not parse countryGroups - no match found');
        return [];
      }
      // Replace enum references with their string values for parsing
      let jsonStr = match[1]
        .replace(/GroupingType\.PoliticalUnion/g, '"POLITICAL_UNION"')
        .replace(/GroupingType\.MilitaryAlliance/g, '"MILITARY_ALLIANCE"')
        .replace(/GroupingType\.EconomicUnion/g, '"ECONOMIC_UNION"')
        .replace(/GroupingType\.Continent/g, '"CONTINENT"')
        .replace(/GroupingType\.Region/g, '"REGION"')
        .replace(/GroupingType\.CustomsUnion/g, '"CUSTOMS_UNION"')
        .replace(/GroupingType\.CurrencyUnion/g, '"CURRENCY_UNION"')
        .replace(/GroupingType\.FreeTradeArea/g, '"FREE_TRADE_AREA"')
        .replace(/GroupingType\.CulturalGroup/g, '"CULTURAL_GROUP"')
        .replace(/GroupingType\.Other/g, '"OTHER"');
      
      return JSON.parse(jsonStr);
    } catch (error) {
      console.warn('Error loading country groups:', error);
      return [];
    }
  }

  private loadLanguages(): Language[] {
    const content = readFileSync(this.languagesPath, 'utf-8');
    const match = content.match(/export const languages: Language\[\] = ([\s\S]*);/);
    if (!match) throw new Error('Could not parse languages data');
    return JSON.parse(match[1]);
  }

  private validateCountries(countries: Country[], result: ValidationResult): void {
    console.log('🌍 Validating countries...');

    const alpha2Codes = new Set<string>();
    const alpha3Codes = new Set<string>();

    for (const country of countries) {
      // Check required fields
      if (!country.alpha2 || country.alpha2.length !== 2) {
        result.errors.push(`Country "${country.name}" has invalid alpha2 code: "${country.alpha2}"`);
        result.valid = false;
      }

      if (!country.alpha3 || country.alpha3.length !== 3) {
        result.errors.push(`Country "${country.name}" has invalid alpha3 code: "${country.alpha3}"`);
        result.valid = false;
      }

      if (!country.name) {
        result.errors.push(`Country with alpha2 "${country.alpha2}" has no name`);
        result.valid = false;
      }

      // Check for duplicates
      if (alpha2Codes.has(country.alpha2)) {
        result.errors.push(`Duplicate alpha2 code: "${country.alpha2}"`);
        result.valid = false;
      }
      alpha2Codes.add(country.alpha2);

      if (alpha3Codes.has(country.alpha3)) {
        result.errors.push(`Duplicate alpha3 code: "${country.alpha3}"`);
        result.valid = false;
      }
      alpha3Codes.add(country.alpha3);

      // Check alpha2 format (uppercase)
      if (country.alpha2 !== country.alpha2.toUpperCase()) {
        result.errors.push(`Country "${country.name}" alpha2 code should be uppercase: "${country.alpha2}"`);
        result.valid = false;
      }

      // Check currency
      if (!country.currency) {
        result.warnings.push(`Country "${country.name}" has no currency`);
      } else if (country.currency.length !== 3) {
        result.warnings.push(`Country "${country.name}" currency should be 3 characters: "${country.currency}"`);
      }

      // Check phone country code
      if (country.phoneCountryCode && !country.phoneCountryCode.startsWith('+')) {
        result.warnings.push(`Country "${country.name}" phone code should start with +: "${country.phoneCountryCode}"`);
      }

      // Check languages array
      if (!country.languages || country.languages.length === 0) {
        result.warnings.push(`Country "${country.name}" has no languages`);
      }
    }

    console.log(`  ✅ Validated ${countries.length} countries`);
  }

  private validateCountryGroups(groups: CountryGroup[], result: ValidationResult): void {
    console.log('🤝 Validating country groups...');

    const groupIds = new Set<string>();

    for (const group of groups) {
      // Check required fields
      if (!group.id) {
        result.errors.push(`Group has no ID: ${JSON.stringify(group)}`);
        result.valid = false;
      }

      if (!group.name) {
        result.errors.push(`Group "${group.id}" has no name`);
        result.valid = false;
      }

      if (!group.type) {
        result.errors.push(`Group "${group.id}" has no type`);
        result.valid = false;
      }

      // Check for duplicates
      if (groupIds.has(group.id)) {
        result.errors.push(`Duplicate group ID: "${group.id}"`);
        result.valid = false;
      }
      groupIds.add(group.id);

      // Check members
      if (!group.members || group.members.length === 0) {
        result.warnings.push(`Group "${group.id}" has no members`);
      }

      // Check member format
      for (const member of group.members) {
        if (!member || member.length !== 2) {
          result.warnings.push(`Group "${group.id}" has invalid member code: "${member}"`);
        }
      }
    }

    console.log(`  ✅ Validated ${groups.length} country groups`);
  }

  private validateLanguages(languages: Language[], result: ValidationResult): void {
    console.log('📚 Validating languages...');

    const languageCodes = new Set<string>();

    for (const language of languages) {
      // Check required fields
      if (!language.code) {
        result.errors.push(`Language has no code: ${JSON.stringify(language)}`);
        result.valid = false;
      }

      if (!language.name) {
        result.errors.push(`Language "${language.code}" has no name`);
        result.valid = false;
      }

      if (!language.nativeName) {
        result.errors.push(`Language "${language.code}" has no native name`);
        result.valid = false;
      }

      // Check for duplicates
      if (languageCodes.has(language.code)) {
        result.errors.push(`Duplicate language code: "${language.code}"`);
        result.valid = false;
      }
      languageCodes.add(language.code);

      // Check code format (lowercase, 2-3 chars)
      if (language.code !== language.code.toLowerCase() || language.code.length < 2 || language.code.length > 3) {
        result.warnings.push(`Language "${language.name}" code should be lowercase 2-3 chars: "${language.code}"`);
      }
    }

    console.log(`  ✅ Validated ${languages.length} languages`);
  }

  private validateReferences(countries: Country[], groups: CountryGroup[], languages: Language[], result: ValidationResult): void {
    console.log('🔗 Validating cross-references...');

    const languageCodes = new Set(languages.map(l => l.code));
    const groupIds = new Set(groups.map(g => g.id));
    const countryCodes = new Set(countries.map(c => c.alpha2));

    // Check language references in countries
    for (const country of countries) {
      for (const langCode of country.languages) {
        if (!languageCodes.has(langCode)) {
          result.errors.push(`Country "${country.name}" references unknown language: "${langCode}"`);
          result.valid = false;
        }
      }

      // Check group references in countries
      for (const groupId of country.groups) {
        if (!groupIds.has(groupId)) {
          result.errors.push(`Country "${country.name}" references unknown group: "${groupId}"`);
          result.valid = false;
        }
      }
    }

    // Check country references in groups
    for (const group of groups) {
      for (const memberCode of group.members) {
        if (!countryCodes.has(memberCode)) {
          result.warnings.push(`Group "${group.name}" references unknown country: "${memberCode}"`);
        }
      }
    }

    console.log(`  ✅ Cross-reference validation complete`);
  }

  private printValidationResults(result: ValidationResult): void {
    console.log('\n📊 Validation Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (result.valid) {
      console.log('✅ Data validation passed!');
    } else {
      console.log('❌ Data validation failed!');
    }

    if (result.errors.length > 0) {
      console.log(`\n🚨 Errors (${result.errors.length}):`);
      result.errors.forEach(error => console.log(`  • ${error}`));
    }

    if (result.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
      result.warnings.forEach(warning => console.log(`  • ${warning}`));
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
}

// Run the script
if (require.main === module) {
  const validator = new DataValidator();
  validator.validateAll().then(result => {
    process.exit(result.valid ? 0 : 1);
  });
}

export { DataValidator };