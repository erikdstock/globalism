import { formatCurrency, formatCurrencyWithOptions, getCurrencySymbol, formatCurrencyParts } from '../currency';
import type { Country } from '../../data/types';

function makeCountry(overrides: Partial<Country>): Country {
  return {
    alpha2: 'US',
    alpha3: 'USA',
    name: 'United States',
    officialName: 'United States of America',
    nativeNames: [],
    languages: ['en'],
    currency: 'USD',
    currencySymbol: '$',
    phoneCountryCode: '+1',
    phoneRegexp: '',
    phoneFormat: '',
    tld: '.us',
    flag: '🇺🇸',
    groups: [],
    postalCodeRegexp: '',
    postalCodeFormat: '',
    ...overrides,
  };
}

const us = makeCountry({});
const fr = makeCountry({ alpha2: 'FR', alpha3: 'FRA', name: 'France', currency: 'EUR', currencySymbol: '€' });
const jp = makeCountry({ alpha2: 'JP', alpha3: 'JPN', name: 'Japan', currency: 'JPY', currencySymbol: '¥' });
const nocurrency = makeCountry({ currency: '', currencySymbol: '' });

describe('currency utilities', () => {
  describe('getCurrencySymbol()', () => {
    it('returns the stored currency symbol', () => {
      expect(getCurrencySymbol(us)).toBe('$');
      expect(getCurrencySymbol(fr)).toBe('€');
      expect(getCurrencySymbol(jp)).toBe('¥');
    });

    it('returns empty string for a country with no currency', () => {
      expect(getCurrencySymbol(nocurrency)).toBe('');
    });
  });

  describe('formatCurrency()', () => {
    it('formats USD with dollar sign and 2 decimal places', () => {
      const result = formatCurrency(1234.56, us);
      expect(result).toContain('1,234');
      expect(result).toContain('56');
      expect(result).toMatch(/\$/);
    });

    it('formats JPY without decimal places', () => {
      const result = formatCurrency(1000, jp);
      // JPY has no minor units — no decimal point expected
      expect(result).not.toContain('.');
      expect(result).toContain('1,000');
    });

    it('formats EUR', () => {
      const result = formatCurrency(99.99, fr);
      expect(result).toContain('99');
    });

    it('returns plain string for country with no currency code', () => {
      expect(formatCurrency(42, nocurrency)).toBe('42');
    });
  });

  describe('formatCurrencyWithOptions()', () => {
    it('applies compact notation', () => {
      const result = formatCurrencyWithOptions(1_000_000, us, { notation: 'compact' });
      // Should produce something like "$1M" or "$1 million"
      expect(result.length).toBeLessThan(20);
    });

    it('applies maximumFractionDigits: 0', () => {
      const result = formatCurrencyWithOptions(9.99, us, { maximumFractionDigits: 0 });
      expect(result).not.toContain('.');
    });
  });

  describe('formatCurrencyParts()', () => {
    it('returns an array of parts including currency and integer parts', () => {
      const parts = formatCurrencyParts(1234.56, us);
      const types = parts.map(p => p.type);
      expect(types).toContain('currency');
      expect(types).toContain('integer');
    });

    it('returns a literal fallback part for country with no currency', () => {
      const parts = formatCurrencyParts(42, nocurrency);
      expect(parts).toHaveLength(1);
      expect(parts[0].type).toBe('literal');
      expect(parts[0].value).toBe('42');
    });
  });
});
