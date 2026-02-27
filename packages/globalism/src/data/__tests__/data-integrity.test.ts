/**
 * Data integrity tests — validate the raw JSON data files that ship with the package.
 * These complement the standalone scripts/validate-data.ts script and run in CI via `yarn test`.
 */
import { countries } from '../countries';
import { countryGroups } from '../countryGroups';
import { languages } from '../languages';

describe('data integrity', () => {
  // These tests are skipped when data files are empty stubs (before `yarn update-data` has run).
  const hasData = countries.length > 0;

  describe('countries', () => {
    it('contains at least one country (run yarn update-data if this fails)', () => {
      expect(hasData).toBe(true);
    });

    it('every country has a valid alpha2 code', () => {
      for (const c of countries) {
        expect(c.alpha2).toMatch(/^[A-Z]{2}$/);
      }
    });

    it('every country has a valid alpha3 code', () => {
      for (const c of countries) {
        expect(c.alpha3).toMatch(/^[A-Z]{3}$/);
      }
    });

    it('every country has a non-empty name', () => {
      for (const c of countries) {
        expect(typeof c.name).toBe('string');
        expect(c.name.length).toBeGreaterThan(0);
      }
    });

    it('alpha2 codes are unique', () => {
      const codes = countries.map(c => c.alpha2);
      const unique = new Set(codes);
      expect(unique.size).toBe(codes.length);
    });

    it('alpha3 codes are unique', () => {
      const codes = countries.map(c => c.alpha3);
      const unique = new Set(codes);
      expect(unique.size).toBe(codes.length);
    });

    it('phoneRegexp patterns are valid RegExp when present', () => {
      for (const c of countries) {
        if (c.phoneRegexp) {
          expect(() => new RegExp(c.phoneRegexp!)).not.toThrow();
        }
      }
    });

    it('postalCodeRegexp patterns are valid RegExp when present', () => {
      for (const c of countries) {
        if (c.postalCodeRegexp) {
          expect(() => new RegExp(c.postalCodeRegexp!)).not.toThrow();
        }
      }
    });
  });

  describe('cross-references', () => {
    it('language codes referenced in countries exist in languages list', () => {
      if (languages.length === 0) return; // skip if languages not populated
      const langCodes = new Set(languages.map(l => l.code));
      for (const c of countries) {
        for (const code of c.languages) {
          expect(langCodes.has(code)).toBe(true);
        }
      }
    });

    it('group IDs referenced in countries exist in countryGroups', () => {
      if (countryGroups.length === 0) return; // skip if groups not populated
      const groupIds = new Set(countryGroups.map(g => g.id));
      for (const c of countries) {
        for (const id of c.groups) {
          expect(groupIds.has(id)).toBe(true);
        }
      }
    });

    it('country codes referenced in group members exist in countries', () => {
      // Only enforce this when the full country dataset is present (>50 countries).
      // With the fallback 5-country dataset, groups will reference countries not yet loaded.
      if (countryGroups.length === 0 || countries.length < 50) return;
      const alpha2Set = new Set(countries.map(c => c.alpha2));
      for (const g of countryGroups) {
        for (const code of g.members) {
          expect(alpha2Set.has(code)).toBe(true);
        }
      }
    });
  });

  describe('languages', () => {
    it('language codes are unique', () => {
      if (languages.length === 0) return;
      const codes = languages.map(l => l.code);
      expect(new Set(codes).size).toBe(codes.length);
    });

    it('every language has a name and nativeName', () => {
      for (const l of languages) {
        expect(l.name.length).toBeGreaterThan(0);
        expect(l.nativeName.length).toBeGreaterThan(0);
      }
    });
  });

  describe('countryGroups', () => {
    it('group IDs are unique', () => {
      if (countryGroups.length === 0) return;
      const ids = countryGroups.map(g => g.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('every group has an id, name and type', () => {
      for (const g of countryGroups) {
        expect(g.id.length).toBeGreaterThan(0);
        expect(g.name.length).toBeGreaterThan(0);
        expect(g.type.length).toBeGreaterThan(0);
      }
    });
  });
});
