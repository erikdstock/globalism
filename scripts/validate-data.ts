#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join } from 'path';
import type { Country, CountryGroup, Language } from '../packages/globalism/src/data/types';

const RAW_DIR = join(__dirname, '../packages/globalism/src/data/raw');

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

class DataValidator {
  private loadCountries(): Country[] {
    return JSON.parse(readFileSync(join(RAW_DIR, 'countries.json'), 'utf-8'));
  }

  private loadCountryGroups(): CountryGroup[] {
    try {
      return JSON.parse(readFileSync(join(RAW_DIR, 'countryGroups.json'), 'utf-8'));
    } catch {
      console.warn('countryGroups.json not found — skipping group validation');
      return [];
    }
  }

  private loadLanguages(): Language[] {
    try {
      return JSON.parse(readFileSync(join(RAW_DIR, 'languages.json'), 'utf-8'));
    } catch {
      console.warn('languages.json not found — skipping language validation');
      return [];
    }
  }

  async validateAll(): Promise<ValidationResult> {
    console.log('Starting comprehensive data validation...\n');

    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    try {
      const countries = this.loadCountries();
      const groups = this.loadCountryGroups();
      const languages = this.loadLanguages();

      console.log(`Loaded ${countries.length} countries, ${groups.length} groups, ${languages.length} languages\n`);

      this.validateCountries(countries, result);
      this.validateCountryGroups(groups, result);
      this.validateLanguages(languages, result);
      this.validateReferences(countries, groups, languages, result);
      this.printResults(result);
    } catch (error) {
      result.valid = false;
      result.errors.push(`Failed to load data: ${error}`);
      console.error('Validation failed:', error);
    }

    return result;
  }

  private validateCountries(countries: Country[], result: ValidationResult): void {
    console.log('Validating countries...');
    const alpha2Codes = new Set<string>();
    const alpha3Codes = new Set<string>();

    for (const c of countries) {
      if (!c.alpha2 || c.alpha2.length !== 2) {
        result.errors.push(`"${c.name}" has invalid alpha2: "${c.alpha2}"`);
        result.valid = false;
      }
      if (!c.alpha3 || c.alpha3.length !== 3) {
        result.errors.push(`"${c.name}" has invalid alpha3: "${c.alpha3}"`);
        result.valid = false;
      }
      if (!c.name) {
        result.errors.push(`Country with alpha2 "${c.alpha2}" has no name`);
        result.valid = false;
      }
      if (alpha2Codes.has(c.alpha2)) {
        result.errors.push(`Duplicate alpha2: "${c.alpha2}"`);
        result.valid = false;
      }
      alpha2Codes.add(c.alpha2);
      if (alpha3Codes.has(c.alpha3)) {
        result.errors.push(`Duplicate alpha3: "${c.alpha3}"`);
        result.valid = false;
      }
      alpha3Codes.add(c.alpha3);
      if (c.alpha2 !== c.alpha2.toUpperCase()) {
        result.errors.push(`"${c.name}" alpha2 should be uppercase: "${c.alpha2}"`);
        result.valid = false;
      }
      if (!c.currency) {
        result.warnings.push(`"${c.name}" has no currency`);
      }
      if (c.phoneRegexp) {
        try {
          new RegExp(c.phoneRegexp);
        } catch {
          result.errors.push(`"${c.name}" has invalid phoneRegexp: "${c.phoneRegexp}"`);
          result.valid = false;
        }
      }
    }
    console.log(`  Validated ${countries.length} countries`);
  }

  private validateCountryGroups(groups: CountryGroup[], result: ValidationResult): void {
    if (groups.length === 0) return;
    console.log('Validating country groups...');
    const groupIds = new Set<string>();
    for (const g of groups) {
      if (!g.id) { result.errors.push(`Group has no ID`); result.valid = false; }
      if (!g.name) { result.errors.push(`Group "${g.id}" has no name`); result.valid = false; }
      if (!g.type) { result.errors.push(`Group "${g.id}" has no type`); result.valid = false; }
      if (groupIds.has(g.id)) {
        result.errors.push(`Duplicate group ID: "${g.id}"`);
        result.valid = false;
      }
      groupIds.add(g.id);
      if (!g.members?.length) result.warnings.push(`Group "${g.id}" has no members`);
    }
    console.log(`  Validated ${groups.length} groups`);
  }

  private validateLanguages(languages: Language[], result: ValidationResult): void {
    if (languages.length === 0) return;
    console.log('Validating languages...');
    const codes = new Set<string>();
    for (const l of languages) {
      if (!l.code) { result.errors.push(`Language has no code`); result.valid = false; }
      if (!l.name) { result.errors.push(`Language "${l.code}" has no name`); result.valid = false; }
      if (!l.nativeName) { result.errors.push(`Language "${l.code}" has no nativeName`); result.valid = false; }
      if (codes.has(l.code)) {
        result.errors.push(`Duplicate language code: "${l.code}"`);
        result.valid = false;
      }
      codes.add(l.code);
    }
    console.log(`  Validated ${languages.length} languages`);
  }

  private validateReferences(countries: Country[], groups: CountryGroup[], languages: Language[], result: ValidationResult): void {
    console.log('Validating cross-references...');
    const langCodes = new Set(languages.map(l => l.code));
    const groupIds = new Set(groups.map(g => g.id));
    const countryCodes = new Set(countries.map(c => c.alpha2));

    for (const c of countries) {
      for (const code of c.languages) {
        if (langCodes.size > 0 && !langCodes.has(code)) {
          result.errors.push(`"${c.name}" references unknown language: "${code}"`);
          result.valid = false;
        }
      }
      for (const id of c.groups) {
        if (groupIds.size > 0 && !groupIds.has(id)) {
          result.errors.push(`"${c.name}" references unknown group: "${id}"`);
          result.valid = false;
        }
      }
    }
    for (const g of groups) {
      for (const code of g.members) {
        if (!countryCodes.has(code)) {
          result.warnings.push(`Group "${g.name}" references unknown country: "${code}"`);
        }
      }
    }
    console.log('  Cross-reference validation complete');
  }

  private printResults(result: ValidationResult): void {
    console.log('\nValidation Results:');
    console.log('─'.repeat(60));
    console.log(result.valid ? 'PASSED' : 'FAILED');
    if (result.errors.length > 0) {
      console.log(`\nErrors (${result.errors.length}):`);
      result.errors.forEach(e => console.log(`  • ${e}`));
    }
    if (result.warnings.length > 0) {
      console.log(`\nWarnings (${result.warnings.length}):`);
      result.warnings.forEach(w => console.log(`  • ${w}`));
    }
    console.log('─'.repeat(60));
  }
}

if (require.main === module) {
  const validator = new DataValidator();
  validator.validateAll().then(result => process.exit(result.valid ? 0 : 1));
}

export { DataValidator };
