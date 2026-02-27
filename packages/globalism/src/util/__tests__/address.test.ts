import { formatAddress, formatAddressLines, getRequiredAddressComponents } from '../address';
import type { Country, AddressComponents } from '../../data/types';

const baseCountry: Omit<Country, 'addressFormat'> = {
  alpha2: 'US',
  alpha3: 'USA',
  name: 'United States',
  officialName: 'United States of America',
  nativeNames: [],
  languages: ['en'],
  currency: 'USD',
  currencySymbol: '$',
  phoneCountryCode: '+1',
  phoneRegexp: '^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$',
  phoneFormat: '(###) ###-####',
  tld: '.us',
  flag: '🇺🇸',
  groups: [],
  postalCodeRegexp: '^\\d{5}(-\\d{4})?$',
  postalCodeFormat: '#####',
};

const usCountry: Country = {
  ...baseCountry,
  addressFormat: [
    '{{recipient}}',
    '{{house_number}} {{road}}',
    '{{city}}, {{state_code}} {{postcode}}',
    '{{country}}',
  ],
};

const jpCountry: Country = {
  ...baseCountry,
  alpha2: 'JP',
  alpha3: 'JPN',
  name: 'Japan',
  officialName: 'Japan',
  currency: 'JPY',
  currencySymbol: '¥',
  phoneCountryCode: '+81',
  tld: '.jp',
  flag: '🇯🇵',
  addressFormat: [
    '〒{{postcode}}',
    '{{state}}{{city}}{{road}}{{house_number}}',
    '{{recipient}}',
  ],
};

const noFormatCountry: Country = {
  ...baseCountry,
  alpha2: 'XX',
  alpha3: 'XXX',
  name: 'Test',
  officialName: 'Test',
};

describe('address utilities', () => {
  describe('formatAddressLines()', () => {
    it('formats a US address into lines', () => {
      const components: AddressComponents = {
        recipient: 'Jane Smith',
        house_number: '123',
        road: 'Main St',
        city: 'Springfield',
        state_code: 'IL',
        postcode: '62701',
        country: 'United States',
      };
      const lines = formatAddressLines(components, usCountry);
      expect(lines).toEqual([
        'Jane Smith',
        '123 Main St',
        'Springfield, IL 62701',
        'United States',
      ]);
    });

    it('omits lines where all components are empty', () => {
      const components: AddressComponents = {
        house_number: '123',
        road: 'Main St',
        city: 'Springfield',
        state_code: 'IL',
        postcode: '62701',
      };
      const lines = formatAddressLines(components, usCountry);
      // recipient and country lines should be omitted
      expect(lines).toEqual(['123 Main St', 'Springfield, IL 62701']);
    });

    it('formats a Japan address with reversed order', () => {
      const components: AddressComponents = {
        postcode: '100-0001',
        state: '東京都',
        city: '千代田区',
        road: '千代田',
        house_number: '1-1',
        recipient: '田中太郎',
      };
      const lines = formatAddressLines(components, jpCountry);
      expect(lines).toEqual([
        '〒100-0001',
        '東京都千代田区千代田1-1',
        '田中太郎',
      ]);
    });

    it('returns null when country has no addressFormat', () => {
      const components: AddressComponents = { city: 'Somewhere' };
      expect(formatAddressLines(components, noFormatCountry)).toBeNull();
    });

    it('returns an empty array when all rendered lines are blank', () => {
      const components: AddressComponents = {};
      const lines = formatAddressLines(components, usCountry);
      expect(lines).toEqual([]);
    });
  });

  describe('formatAddress()', () => {
    it('joins lines with newlines', () => {
      const components: AddressComponents = {
        house_number: '1',
        road: 'Elm St',
        city: 'Shelbyville',
        state_code: 'TN',
        postcode: '37160',
      };
      const result = formatAddress(components, usCountry);
      expect(result).toBe('1 Elm St\nShelbyville, TN 37160');
    });

    it('returns null when country has no addressFormat', () => {
      expect(formatAddress({}, noFormatCountry)).toBeNull();
    });
  });

  describe('getRequiredAddressComponents()', () => {
    it('returns the components used in the US template', () => {
      const fields = getRequiredAddressComponents(usCountry);
      expect(fields).toContain('recipient');
      expect(fields).toContain('house_number');
      expect(fields).toContain('road');
      expect(fields).toContain('city');
      expect(fields).toContain('state_code');
      expect(fields).toContain('postcode');
      expect(fields).toContain('country');
    });

    it('returns fields in canonical AddressComponents key order', () => {
      const fields = getRequiredAddressComponents(usCountry);
      const houseIdx = fields.indexOf('house_number');
      const cityIdx = fields.indexOf('city');
      const postcodeIdx = fields.indexOf('postcode');
      expect(houseIdx).toBeLessThan(cityIdx);
      expect(cityIdx).toBeLessThan(postcodeIdx);
    });

    it('returns empty array for country with no addressFormat', () => {
      expect(getRequiredAddressComponents(noFormatCountry)).toEqual([]);
    });
  });

  describe('conditional blocks', () => {
    const countryWithConditional: Country = {
      ...baseCountry,
      addressFormat: [
        '{{#recipient}}{{recipient}}{{/recipient}}',
        '{{house_number}} {{road}}',
        '{{city}}, {{state_code}} {{postcode}}',
      ],
    };

    it('renders block when variable is present', () => {
      const components: AddressComponents = {
        recipient: 'Acme Corp',
        house_number: '42',
        road: 'Industrial Rd',
        city: 'Detroit',
        state_code: 'MI',
        postcode: '48201',
      };
      const lines = formatAddressLines(components, countryWithConditional);
      expect(lines![0]).toBe('Acme Corp');
    });

    it('omits block when variable is absent', () => {
      const components: AddressComponents = {
        house_number: '42',
        road: 'Industrial Rd',
        city: 'Detroit',
        state_code: 'MI',
        postcode: '48201',
      };
      const lines = formatAddressLines(components, countryWithConditional);
      expect(lines![0]).toBe('42 Industrial Rd');
    });
  });
});
