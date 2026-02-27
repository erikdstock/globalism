# globalism

[![npm version](https://img.shields.io/npm/v/globalism)](https://www.npmjs.com/package/globalism)
[![Deploy Demo](https://github.com/erikdstock/globalism/actions/workflows/deploy.yml/badge.svg)](https://github.com/erikdstock/globalism/actions/workflows/deploy.yml)
[![Update Country Data](https://github.com/erikdstock/globalism/actions/workflows/update-data.yml/badge.svg)](https://github.com/erikdstock/globalism/actions/workflows/update-data.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

Country data and utilities for phone validation, address formatting, and currency display — fully typed, zero runtime dependencies.

**[Live demo →](https://erikdstock.github.io/globalism/)**

---

## Install

```sh
npm install globalism
# or
yarn add globalism
```

## Usage

```typescript
import {
  countries,
  findCountryByAlpha2,
  formatAddressLines,
  formatCurrency,
  analyzePhoneNumber,
} from 'globalism';

// Country lookup
const us = findCountryByAlpha2('US');

// Phone validation
const result = analyzePhoneNumber('+14155552671', us);
// → { status: 'valid', formatted: '+1 415 555 2671', ... }

// Address formatting
const lines = formatAddressLines(
  { recipient: 'Jane Smith', road: 'Main St', house_number: '123', city: 'Springfield', state_code: 'IL', postcode: '62701' },
  us
);
// → ['Jane Smith', '123 Main St', 'Springfield, IL 62701', 'United States']

// Currency formatting
formatCurrency(1234.56, us); // → '$1,234.56'
```

---

## Packages

This repository is a Yarn workspaces monorepo with two packages.

### `packages/globalism` — the library

The publishable NPM package. Data is stored as committed JSON files in `src/data/raw/` and updated by the scripts below.

**Exports:**

| Export | Description |
|---|---|
| `countries` | Array of ~250 `Country` objects |
| `countryGroups` | Regional/political groupings (UN regions, EU, etc.) |
| `languages` | ISO 639-1 language list |
| `findCountryByAlpha2(code)` | Look up a country by its 2-letter ISO code |
| `findCountryByAlpha3(code)` | Look up a country by its 3-letter ISO code |
| `findCountriesByGroup(groupId)` | All countries in a group |
| `findGroupById(id)` | Look up a country group |
| `findLanguageByCode(code)` | Look up a language by ISO 639-1 code |
| `analyzePhoneNumber(number, country)` | Validate and format a phone number |
| `formatAddress(components, country)` | Format an address as a newline-joined string |
| `formatAddressLines(components, country)` | Format an address as a `string[]` |
| `getRequiredAddressComponents(country)` | Fields needed by a country's address template |
| `formatCurrency(amount, country)` | Format a number as currency (`Intl.NumberFormat`) |
| `formatCurrencyWithOptions(amount, country, options?)` | Currency with custom `Intl` options |
| `getCurrencySymbol(country)` | Return the currency symbol for a country |
| `formatCurrencyParts(amount, country)` | Return `Intl.NumberFormatPart[]` for custom rendering |

**`Country` object shape (excerpt):**

```typescript
{
  alpha2: 'US',
  alpha3: 'USA',
  name: 'United States',
  flag: '🇺🇸',
  currency: 'USD',
  currencySymbol: '$',
  languages: ['en'],
  phoneCode: '+1',
  phoneRegexp: '^(?:[2-9]\\d{9}|3\\d{6})$',  // from libphonenumber-js metadata
  addressFormat: [             // OpenCageData Mustache template, one line per element
    '{{recipient}}',
    '{{house_number}} {{road}}',
    '{{city}}, {{state_code}} {{postcode}}',
    '{{country}}',
  ],
  groups: ['northern-america', 'americas', ...],
}
```

### `packages/demo` — the demo site

A statically exported Next.js site deployed to GitHub Pages. Serves as both interactive documentation and a live demo of the library's utilities.

Pages:
- `/` — overview, install instructions, quick-start
- `/phone` — phone number validator with per-country dial codes
- `/address` — address formatter with dynamic fields per country template
- `/currency` — currency formatter with locale-aware output

---

## Development

```sh
yarn install

# Run the demo locally
yarn dev

# Run tests
yarn test

# Build the library
yarn workspace globalism build
```

### Data pipeline

Country data is fetched from multiple sources and committed to `packages/globalism/src/data/raw/`. Scripts live in `scripts/`.

| Source | Data |
|---|---|
| [REST Countries](https://restcountries.com) | Names, flags, currencies, calling codes, languages |
| [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) | Phone number validation patterns (243/250 countries) |
| [OpenCageData address-formatting](https://github.com/OpenCageData/address-formatting) | Address templates |

```sh
# Update all data sources
yarn update-data

# Or run individual steps
yarn update-countries      # REST Countries API
yarn update-phone-data     # libphonenumber-js metadata
yarn update-address-formats
yarn update-languages
yarn update-groups
yarn validate-data
```

The `Update Country Data` GitHub Actions workflow runs this pipeline monthly and opens a PR with any changes.

---

## Data sources and licenses

- Country data: [REST Countries](https://restcountries.com) — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Phone patterns: [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) (MIT) — metadata derived from [Google's libphonenumber](https://github.com/google/libphonenumber) — [Apache 2.0](https://github.com/google/libphonenumber/blob/master/LICENSE)
- Address templates: [OpenCageData address-formatting](https://github.com/OpenCageData/address-formatting) — [BSD 2-Clause](https://github.com/OpenCageData/address-formatting/blob/master/LICENSE)

The `globalism` library code is MIT licensed. The published package bundles data from the above sources — in particular, the REST Countries data is CC BY-SA 4.0 (ShareAlike), which means any redistribution of that data must carry the same license. Application developers consuming the library are generally unaffected, but downstream packages that re-export the `countries` array should note this.
