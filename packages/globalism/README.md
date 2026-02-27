# globalism

[![npm version](https://img.shields.io/npm/v/globalism)](https://www.npmjs.com/package/globalism)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../../LICENSE.md)

Country data and utilities for phone validation, address formatting, and currency display — fully typed, zero runtime dependencies.

## Install

```sh
npm install globalism
# or
yarn add globalism
```

## Quick start

```typescript
import {
  findCountryByAlpha2,
  analyzePhoneNumber,
  formatAddressLines,
  formatCurrency,
} from 'globalism';

const us = findCountryByAlpha2('US');

// Phone
analyzePhoneNumber('4155552671', us);
// → { status: 'complete', formatted: '(415) 555-2671', international: '+1 (415) 555-2671', ... }

// Address
formatAddressLines(
  { recipient: 'Jane Smith', house_number: '123', road: 'Main St',
    city: 'Springfield', state_code: 'IL', postcode: '62701' },
  us
);
// → ['Jane Smith', '123 Main St', 'Springfield, IL 62701', 'United States']

// Currency
formatCurrency(1234.56, us); // → '$1,234.56'
```

## API

### Data

| Export | Description |
|---|---|
| `countries` | Array of 250 `Country` objects |
| `countryGroups` | Regional/political groupings (UN regions, EU, etc.) |
| `languages` | ISO 639-1 language list (184 languages) |

### Lookups

| Export | Description |
|---|---|
| `findCountryByAlpha2(code)` | Look up a country by 2-letter ISO code |
| `findCountryByAlpha3(code)` | Look up a country by 3-letter ISO code |
| `findCountriesByGroup(groupId)` | All countries belonging to a group |
| `findGroupById(id)` | Look up a country group by ID |
| `findLanguageByCode(code)` | Look up a language by ISO 639-1 code |

### Phone

| Export | Description |
|---|---|
| `analyzePhoneNumber(number, country)` | Returns `PhoneNumberState` with status, formatted, and international forms |
| `validatePhoneNumber(number, country)` | Returns `boolean` |
| `formatPhoneNumber(number, country)` | Returns formatted string |
| `generatePhonePlaceholder(country)` | Returns a `#`-masked placeholder string |

**`PhoneNumberState`**
```typescript
{
  status: 'empty' | 'partial' | 'complete' | 'invalid';
  formatted: string;      // e.g. "(415) 555-2671"
  original: string;       // original input
  international: string;  // e.g. "+1 (415) 555-2671"
}
```

### Address

| Export | Description |
|---|---|
| `formatAddress(components, country)` | Format as a newline-joined string |
| `formatAddressLines(components, country)` | Format as `string[]`, one line per element |
| `getRequiredAddressComponents(country)` | Fields required by the country's template |

Address templates are sourced from [OpenCageData address-formatting](https://github.com/OpenCageData/address-formatting) and use a Handlebars-style subset with `{{field}}`, `{{{field}}}`, and `{{#first}}a || b{{/first}}` syntax.

**`AddressComponents`** (all fields optional)
```typescript
{
  recipient?, house_number?, house?, road?, neighbourhood?, suburb?,
  city_district?, city?, postal_town?, county?, state_code?, state?,
  postcode?, country?, country_code?
}
```

### Currency

| Export | Description |
|---|---|
| `formatCurrency(amount, country)` | Format using `Intl.NumberFormat` |
| `formatCurrencyWithOptions(amount, country, options?)` | With custom `Intl.NumberFormatOptions` |
| `getCurrencySymbol(country)` | Return the currency symbol |
| `formatCurrencyParts(amount, country)` | Return `Intl.NumberFormatPart[]` for custom rendering |

### `Country` shape

```typescript
{
  alpha2: string;           // 'US'
  alpha3: string;           // 'USA'
  name: string;             // 'United States'
  officialName: string;     // 'United States of America'
  flag: string;             // '🇺🇸'
  currency: string;         // 'USD'
  currencySymbol: string;   // '$'
  languages: string[];      // ['en']
  phoneCountryCode: string; // '+1'
  phoneRegexp?: string;     // national number pattern (libphonenumber-js)
  phoneFormat?: string;     // '#'-masked template, e.g. '(###) ###-####'
  tld: string;              // '.us'
  addressFormat?: string[]; // OpenCageData Mustache template lines
  groups: string[];         // group IDs this country belongs to
  postalCodeRegexp?: string;
  postalCodeFormat?: string;
}
```

## Data sources

- Country data: [REST Countries](https://restcountries.com) — CC BY-SA 4.0
- Phone patterns: [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) (MIT), data from [Google libphonenumber](https://github.com/google/libphonenumber) — Apache 2.0
- Address templates: [OpenCageData address-formatting](https://github.com/OpenCageData/address-formatting) — BSD 2-Clause

## License

The library code is MIT. The published package bundles data from the sources above — the REST Countries data is CC BY-SA 4.0 (ShareAlike), meaning redistribution of that data must carry the same license. Packages that re-export the `countries` array should note this.
