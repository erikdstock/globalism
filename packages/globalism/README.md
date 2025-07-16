# Globalism

Comprehensive country data and utilities for phone numbers, addresses, and more.

## Installation

```bash
npm install globalism
# or
yarn add globalism
```

## Usage

### Basic Country Data

```typescript
import { countries, Country } from 'globalism';

// Get all countries
console.log(countries);

// Find a specific country
const us = countries.find(c => c.alpha2 === 'US');
```

### Phone Number Utilities

```typescript
import { analyzePhoneNumber, validatePhoneNumber, formatPhoneNumber } from 'globalism';

const country = countries.find(c => c.alpha2 === 'US');

// Analyze a phone number (returns status, formatted, original, international)
const result = analyzePhoneNumber('5551234567', country);
console.log(result);
// {
//   status: 'complete',
//   formatted: '(555) 123-4567',
//   original: '5551234567',
//   international: '+1 (555) 123-4567'
// }

// Validate a phone number
const isValid = validatePhoneNumber('(555) 123-4567', country);

// Format a phone number
const formatted = formatPhoneNumber('5551234567', country);
```

### Country Lookups

```typescript
import { findCountryByAlpha2, findCountryByAlpha3, findCountryByName } from 'globalism';

const country = findCountryByAlpha2('US');
const country2 = findCountryByAlpha3('USA');
const country3 = findCountryByName('United States');
```

## API

### Types

#### `Country`
- `alpha2: string` - ISO 3166-1 alpha-2 code
- `alpha3: string` - ISO 3166-1 alpha-3 code
- `name: string` - Country name
- `officialName: string` - Official country name
- `flag: string` - Flag emoji
- `phoneCountryCode: string` - Phone country code (e.g., "+1")
- `phoneRegexp?: string` - Phone validation regex
- `phoneFormat?: string` - Phone format template (e.g., "(###) ###-####")
- `currency: string` - Currency code
- `currencySymbol: string` - Currency symbol
- `languages: string[]` - Language codes
- `tld: string` - Top-level domain

#### `PhoneNumberStatus`
- `'empty'` - No digits entered
- `'partial'` - Partially complete number
- `'complete'` - Valid complete number
- `'invalid'` - Invalid number (too long, wrong format, etc.)

#### `PhoneNumberState`
- `status: PhoneNumberStatus` - Current status
- `formatted: string` - Formatted version
- `original: string` - Original input
- `international: string` - International format with country code

### Functions

#### `analyzePhoneNumber(phoneNumber: string, country: Country): PhoneNumberState`
Analyzes a phone number and returns comprehensive state information.

#### `validatePhoneNumber(phoneNumber: string, country: Country): boolean`
Validates if a phone number matches the country's format.

#### `formatPhoneNumber(phoneNumber: string, country: Country, allowPartial?: boolean): string`
Formats a phone number according to the country's format.

#### `generatePhonePlaceholder(country: Country): string | null`
Generates a placeholder string for phone input fields.

## License

MIT