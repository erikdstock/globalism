import type { Country } from "./types";

export const countries: Country[] = [
  {
    "alpha2": "CA",
    "alpha3": "CAN",
    "name": "Canada",
    "officialName": "Canada",
    "nativeNames": [],
    "languages": [
      "en",
      "fr"
    ],
    "currency": "CAD",
    "currencySymbol": "$",
    "phoneCountryCode": "+1",
    "phoneRegexp": "^\\\\(?\\\\d{3}\\\\)?[-.\\\\s]?\\\\d{3}[-.\\\\s]?\\\\d{4}$",
    "phoneFormat": "(###) ###-####",
    "tld": ".ca",
    "flag": "🇨🇦",
    "groups": [],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "FR",
    "alpha3": "FRA",
    "name": "France",
    "officialName": "French Republic",
    "nativeNames": [],
    "languages": [
      "fr"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+33",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}$",
    "phoneFormat": "## ## ## ## ##",
    "tld": ".fr",
    "flag": "🇫🇷",
    "groups": [],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "DE",
    "alpha3": "DEU",
    "name": "Germany",
    "officialName": "Federal Republic of Germany",
    "nativeNames": [],
    "languages": [
      "de"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+49",
    "phoneRegexp": "^\\\\d{3,4}\\\\s?\\\\d{7,8}$",
    "phoneFormat": "### ########",
    "tld": ".de",
    "flag": "🇩🇪",
    "groups": [],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "GB",
    "alpha3": "GBR",
    "name": "United Kingdom",
    "officialName": "United Kingdom of Great Britain and Northern Ireland",
    "nativeNames": [],
    "languages": [
      "en"
    ],
    "currency": "GBP",
    "currencySymbol": "£",
    "phoneCountryCode": "+44",
    "phoneRegexp": "^\\\\d{4}\\\\s?\\\\d{6}$",
    "phoneFormat": "#### ######",
    "tld": ".uk",
    "flag": "🇬🇧",
    "groups": [],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "US",
    "alpha3": "USA",
    "name": "United States",
    "officialName": "United States of America",
    "nativeNames": [],
    "languages": [
      "en"
    ],
    "currency": "USD",
    "currencySymbol": "$",
    "phoneCountryCode": "+1",
    "phoneRegexp": "^\\\\(?\\\\d{3}\\\\)?[-.\\\\s]?\\\\d{3}[-.\\\\s]?\\\\d{4}$",
    "phoneFormat": "(###) ###-####",
    "tld": ".us",
    "flag": "🇺🇸",
    "groups": [],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  }
];
