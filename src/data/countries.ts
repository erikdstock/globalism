import type { Country } from "./types";

export const countries: Country[] = [
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
    "groups": [
      "NATO",
      "OECD",
      "G7",
      "G20",
      "NORTH_AMERICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
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
    "groups": [
      "NATO",
      "OECD",
      "G7",
      "G20",
      "COMMONWEALTH",
      "NORTH_AMERICA"
    ],
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
    "groups": [
      "NATO",
      "OECD",
      "G7",
      "G20",
      "COMMONWEALTH",
      "EUROPE"
    ],
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
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "G7",
      "G20",
      "EUROPE"
    ],
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
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "G7",
      "G20",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "IT",
    "alpha3": "ITA",
    "name": "Italy",
    "officialName": "Italian Republic",
    "nativeNames": [],
    "languages": [
      "it"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+39",
    "phoneRegexp": "^\\\\d{2,3}\\\\s?\\\\d{6,7}$",
    "phoneFormat": "### #######",
    "tld": ".it",
    "flag": "🇮🇹",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "G7",
      "G20",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "JP",
    "alpha3": "JPN",
    "name": "Japan",
    "officialName": "Japan",
    "nativeNames": [],
    "languages": [
      "ja"
    ],
    "currency": "JPY",
    "currencySymbol": "¥",
    "phoneCountryCode": "+81",
    "phoneRegexp": "^\\\\d{2,3}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-####-####",
    "tld": ".jp",
    "flag": "🇯🇵",
    "groups": [
      "OECD",
      "G7",
      "G20",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "ES",
    "alpha3": "ESP",
    "name": "Spain",
    "officialName": "Kingdom of Spain",
    "nativeNames": [],
    "languages": [
      "es"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+34",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ### ###",
    "tld": ".es",
    "flag": "🇪🇸",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "NL",
    "alpha3": "NLD",
    "name": "Netherlands",
    "officialName": "Kingdom of the Netherlands",
    "nativeNames": [],
    "languages": [
      "nl"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+31",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ### ####",
    "tld": ".nl",
    "flag": "🇳🇱",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "BE",
    "alpha3": "BEL",
    "name": "Belgium",
    "officialName": "Kingdom of Belgium",
    "nativeNames": [],
    "languages": [
      "nl",
      "fr",
      "de"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+32",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}$",
    "phoneFormat": "### ## ## ##",
    "tld": ".be",
    "flag": "🇧🇪",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "AT",
    "alpha3": "AUT",
    "name": "Austria",
    "officialName": "Republic of Austria",
    "nativeNames": [],
    "languages": [
      "de"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+43",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ### ###",
    "tld": ".at",
    "flag": "🇦🇹",
    "groups": [
      "EU",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "CH",
    "alpha3": "CHE",
    "name": "Switzerland",
    "officialName": "Swiss Confederation",
    "nativeNames": [],
    "languages": [
      "de",
      "fr",
      "it"
    ],
    "currency": "CHF",
    "currencySymbol": "Fr",
    "phoneCountryCode": "+41",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{2}\\\\s?\\\\d{2}$",
    "phoneFormat": "## ### ## ##",
    "tld": ".ch",
    "flag": "🇨🇭",
    "groups": [
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "SE",
    "alpha3": "SWE",
    "name": "Sweden",
    "officialName": "Kingdom of Sweden",
    "nativeNames": [],
    "languages": [
      "sv"
    ],
    "currency": "SEK",
    "currencySymbol": "kr",
    "phoneCountryCode": "+46",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{2}\\\\s?\\\\d{2}$",
    "phoneFormat": "## ### ## ##",
    "tld": ".se",
    "flag": "🇸🇪",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "DK",
    "alpha3": "DNK",
    "name": "Denmark",
    "officialName": "Kingdom of Denmark",
    "nativeNames": [],
    "languages": [
      "da"
    ],
    "currency": "DKK",
    "currencySymbol": "kr",
    "phoneCountryCode": "+45",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}\\\\s?\\\\d{2}$",
    "phoneFormat": "## ## ## ##",
    "tld": ".dk",
    "flag": "🇩🇰",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "NO",
    "alpha3": "NOR",
    "name": "Norway",
    "officialName": "Kingdom of Norway",
    "nativeNames": [],
    "languages": [
      "no"
    ],
    "currency": "NOK",
    "currencySymbol": "kr",
    "phoneCountryCode": "+47",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{2}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ## ###",
    "tld": ".no",
    "flag": "🇳🇴",
    "groups": [
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "FI",
    "alpha3": "FIN",
    "name": "Finland",
    "officialName": "Republic of Finland",
    "nativeNames": [],
    "languages": [
      "fi",
      "sv"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+358",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ### ####",
    "tld": ".fi",
    "flag": "🇫🇮",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "PL",
    "alpha3": "POL",
    "name": "Poland",
    "officialName": "Republic of Poland",
    "nativeNames": [],
    "languages": [
      "pl"
    ],
    "currency": "PLN",
    "currencySymbol": "zł",
    "phoneCountryCode": "+48",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ### ###",
    "tld": ".pl",
    "flag": "🇵🇱",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "CZ",
    "alpha3": "CZE",
    "name": "Czech Republic",
    "officialName": "Czech Republic",
    "nativeNames": [],
    "languages": [
      "cs"
    ],
    "currency": "CZK",
    "currencySymbol": "Kč",
    "phoneCountryCode": "+420",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ### ###",
    "tld": ".cz",
    "flag": "🇨🇿",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "HU",
    "alpha3": "HUN",
    "name": "Hungary",
    "officialName": "Hungary",
    "nativeNames": [],
    "languages": [
      "hu"
    ],
    "currency": "HUF",
    "currencySymbol": "Ft",
    "phoneCountryCode": "+36",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ### ####",
    "tld": ".hu",
    "flag": "🇭🇺",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "PT",
    "alpha3": "PRT",
    "name": "Portugal",
    "officialName": "Portuguese Republic",
    "nativeNames": [],
    "languages": [
      "pt"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+351",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ### ###",
    "tld": ".pt",
    "flag": "🇵🇹",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "GR",
    "alpha3": "GRC",
    "name": "Greece",
    "officialName": "Hellenic Republic",
    "nativeNames": [],
    "languages": [
      "el"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+30",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "### ### ####",
    "tld": ".gr",
    "flag": "🇬🇷",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "IE",
    "alpha3": "IRL",
    "name": "Ireland",
    "officialName": "Ireland",
    "nativeNames": [],
    "languages": [
      "en",
      "ga"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+353",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ### ####",
    "tld": ".ie",
    "flag": "🇮🇪",
    "groups": [
      "EU",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "CN",
    "alpha3": "CHN",
    "name": "China",
    "officialName": "People's Republic of China",
    "nativeNames": [],
    "languages": [
      "zh"
    ],
    "currency": "CNY",
    "currencySymbol": "¥",
    "phoneCountryCode": "+86",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "### #### ####",
    "tld": ".cn",
    "flag": "🇨🇳",
    "groups": [
      "G20",
      "BRICS",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "IN",
    "alpha3": "IND",
    "name": "India",
    "officialName": "Republic of India",
    "nativeNames": [],
    "languages": [
      "hi",
      "en"
    ],
    "currency": "INR",
    "currencySymbol": "₹",
    "phoneCountryCode": "+91",
    "phoneRegexp": "^\\\\d{5}\\\\s?\\\\d{5}$",
    "phoneFormat": "##### #####",
    "tld": ".in",
    "flag": "🇮🇳",
    "groups": [
      "G20",
      "BRICS",
      "COMMONWEALTH",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "KR",
    "alpha3": "KOR",
    "name": "South Korea",
    "officialName": "Republic of Korea",
    "nativeNames": [],
    "languages": [
      "ko"
    ],
    "currency": "KRW",
    "currencySymbol": "₩",
    "phoneCountryCode": "+82",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-####-####",
    "tld": ".kr",
    "flag": "🇰🇷",
    "groups": [
      "OECD",
      "G20",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "SG",
    "alpha3": "SGP",
    "name": "Singapore",
    "officialName": "Republic of Singapore",
    "nativeNames": [],
    "languages": [
      "en",
      "ms",
      "zh",
      "ta"
    ],
    "currency": "SGD",
    "currencySymbol": "$",
    "phoneCountryCode": "+65",
    "phoneRegexp": "^\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "#### ####",
    "tld": ".sg",
    "flag": "🇸🇬",
    "groups": [
      "ASEAN",
      "COMMONWEALTH",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "TH",
    "alpha3": "THA",
    "name": "Thailand",
    "officialName": "Kingdom of Thailand",
    "nativeNames": [],
    "languages": [
      "th"
    ],
    "currency": "THB",
    "currencySymbol": "฿",
    "phoneCountryCode": "+66",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ### ####",
    "tld": ".th",
    "flag": "🇹🇭",
    "groups": [
      "ASEAN",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "MY",
    "alpha3": "MYS",
    "name": "Malaysia",
    "officialName": "Malaysia",
    "nativeNames": [],
    "languages": [
      "ms",
      "en"
    ],
    "currency": "MYR",
    "currencySymbol": "RM",
    "phoneCountryCode": "+60",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-###-####",
    "tld": ".my",
    "flag": "🇲🇾",
    "groups": [
      "ASEAN",
      "COMMONWEALTH",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "ID",
    "alpha3": "IDN",
    "name": "Indonesia",
    "officialName": "Republic of Indonesia",
    "nativeNames": [],
    "languages": [
      "id"
    ],
    "currency": "IDR",
    "currencySymbol": "Rp",
    "phoneCountryCode": "+62",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".id",
    "flag": "🇮🇩",
    "groups": [
      "G20",
      "ASEAN",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "PH",
    "alpha3": "PHL",
    "name": "Philippines",
    "officialName": "Republic of the Philippines",
    "nativeNames": [],
    "languages": [
      "en",
      "tl"
    ],
    "currency": "PHP",
    "currencySymbol": "₱",
    "phoneCountryCode": "+63",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".ph",
    "flag": "🇵🇭",
    "groups": [
      "ASEAN",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "VN",
    "alpha3": "VNM",
    "name": "Vietnam",
    "officialName": "Socialist Republic of Vietnam",
    "nativeNames": [],
    "languages": [
      "vi"
    ],
    "currency": "VND",
    "currencySymbol": "₫",
    "phoneCountryCode": "+84",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".vn",
    "flag": "🇻🇳",
    "groups": [
      "ASEAN",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "MX",
    "alpha3": "MEX",
    "name": "Mexico",
    "officialName": "United Mexican States",
    "nativeNames": [],
    "languages": [
      "es"
    ],
    "currency": "MXN",
    "currencySymbol": "$",
    "phoneCountryCode": "+52",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "## #### ####",
    "tld": ".mx",
    "flag": "🇲🇽",
    "groups": [
      "OECD",
      "G20",
      "NORTH_AMERICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "BR",
    "alpha3": "BRA",
    "name": "Brazil",
    "officialName": "Federative Republic of Brazil",
    "nativeNames": [],
    "languages": [
      "pt"
    ],
    "currency": "BRL",
    "currencySymbol": "R$",
    "phoneCountryCode": "+55",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{5}\\\\s?\\\\d{4}$",
    "phoneFormat": "## #####-####",
    "tld": ".br",
    "flag": "🇧🇷",
    "groups": [
      "G20",
      "BRICS",
      "SOUTH_AMERICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "AR",
    "alpha3": "ARG",
    "name": "Argentina",
    "officialName": "Argentine Republic",
    "nativeNames": [],
    "languages": [
      "es"
    ],
    "currency": "ARS",
    "currencySymbol": "$",
    "phoneCountryCode": "+54",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ####-####",
    "tld": ".ar",
    "flag": "🇦🇷",
    "groups": [
      "G20",
      "SOUTH_AMERICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "CL",
    "alpha3": "CHL",
    "name": "Chile",
    "officialName": "Republic of Chile",
    "nativeNames": [],
    "languages": [
      "es"
    ],
    "currency": "CLP",
    "currencySymbol": "$",
    "phoneCountryCode": "+56",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ####-####",
    "tld": ".cl",
    "flag": "🇨🇱",
    "groups": [
      "OECD",
      "SOUTH_AMERICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "CO",
    "alpha3": "COL",
    "name": "Colombia",
    "officialName": "Republic of Colombia",
    "nativeNames": [],
    "languages": [
      "es"
    ],
    "currency": "COP",
    "currencySymbol": "$",
    "phoneCountryCode": "+57",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".co",
    "flag": "🇨🇴",
    "groups": [
      "OECD",
      "SOUTH_AMERICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "ZA",
    "alpha3": "ZAF",
    "name": "South Africa",
    "officialName": "Republic of South Africa",
    "nativeNames": [],
    "languages": [
      "en",
      "af"
    ],
    "currency": "ZAR",
    "currencySymbol": "R",
    "phoneCountryCode": "+27",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ###-####",
    "tld": ".za",
    "flag": "🇿🇦",
    "groups": [
      "G20",
      "BRICS",
      "COMMONWEALTH",
      "AFRICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "NG",
    "alpha3": "NGA",
    "name": "Nigeria",
    "officialName": "Federal Republic of Nigeria",
    "nativeNames": [],
    "languages": [
      "en"
    ],
    "currency": "NGN",
    "currencySymbol": "₦",
    "phoneCountryCode": "+234",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".ng",
    "flag": "🇳🇬",
    "groups": [
      "OPEC",
      "COMMONWEALTH",
      "AFRICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "EG",
    "alpha3": "EGY",
    "name": "Egypt",
    "officialName": "Arab Republic of Egypt",
    "nativeNames": [],
    "languages": [
      "ar"
    ],
    "currency": "EGP",
    "currencySymbol": "£",
    "phoneCountryCode": "+20",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".eg",
    "flag": "🇪🇬",
    "groups": [
      "BRICS",
      "AFRICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "KE",
    "alpha3": "KEN",
    "name": "Kenya",
    "officialName": "Republic of Kenya",
    "nativeNames": [],
    "languages": [
      "en",
      "sw"
    ],
    "currency": "KES",
    "currencySymbol": "KSh",
    "phoneCountryCode": "+254",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "###-###-###",
    "tld": ".ke",
    "flag": "🇰🇪",
    "groups": [
      "COMMONWEALTH",
      "AFRICA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "SA",
    "alpha3": "SAU",
    "name": "Saudi Arabia",
    "officialName": "Kingdom of Saudi Arabia",
    "nativeNames": [],
    "languages": [
      "ar"
    ],
    "currency": "SAR",
    "currencySymbol": "﷼",
    "phoneCountryCode": "+966",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".sa",
    "flag": "🇸🇦",
    "groups": [
      "G20",
      "BRICS",
      "OPEC",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "AE",
    "alpha3": "ARE",
    "name": "United Arab Emirates",
    "officialName": "United Arab Emirates",
    "nativeNames": [],
    "languages": [
      "ar"
    ],
    "currency": "AED",
    "currencySymbol": "د.إ",
    "phoneCountryCode": "+971",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-###-####",
    "tld": ".ae",
    "flag": "🇦🇪",
    "groups": [
      "BRICS",
      "OPEC",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "IL",
    "alpha3": "ISR",
    "name": "Israel",
    "officialName": "State of Israel",
    "nativeNames": [],
    "languages": [
      "he",
      "ar"
    ],
    "currency": "ILS",
    "currencySymbol": "₪",
    "phoneCountryCode": "+972",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-###-####",
    "tld": ".il",
    "flag": "🇮🇱",
    "groups": [
      "OECD",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "TR",
    "alpha3": "TUR",
    "name": "Turkey",
    "officialName": "Republic of Turkey",
    "nativeNames": [],
    "languages": [
      "tr"
    ],
    "currency": "TRY",
    "currencySymbol": "₺",
    "phoneCountryCode": "+90",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".tr",
    "flag": "🇹🇷",
    "groups": [
      "NATO",
      "OECD",
      "G20",
      "EUROPE",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "AU",
    "alpha3": "AUS",
    "name": "Australia",
    "officialName": "Commonwealth of Australia",
    "nativeNames": [],
    "languages": [
      "en"
    ],
    "currency": "AUD",
    "currencySymbol": "$",
    "phoneCountryCode": "+61",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "## ####-####",
    "tld": ".au",
    "flag": "🇦🇺",
    "groups": [
      "OECD",
      "G20",
      "COMMONWEALTH",
      "OCEANIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "NZ",
    "alpha3": "NZL",
    "name": "New Zealand",
    "officialName": "New Zealand",
    "nativeNames": [],
    "languages": [
      "en"
    ],
    "currency": "NZD",
    "currencySymbol": "$",
    "phoneCountryCode": "+64",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-###-####",
    "tld": ".nz",
    "flag": "🇳🇿",
    "groups": [
      "OECD",
      "COMMONWEALTH",
      "OCEANIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "RU",
    "alpha3": "RUS",
    "name": "Russia",
    "officialName": "Russian Federation",
    "nativeNames": [],
    "languages": [
      "ru"
    ],
    "currency": "RUB",
    "currencySymbol": "₽",
    "phoneCountryCode": "+7",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-###-####",
    "tld": ".ru",
    "flag": "🇷🇺",
    "groups": [
      "G20",
      "BRICS",
      "EUROPE",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "UA",
    "alpha3": "UKR",
    "name": "Ukraine",
    "officialName": "Ukraine",
    "nativeNames": [],
    "languages": [
      "uk"
    ],
    "currency": "UAH",
    "currencySymbol": "₴",
    "phoneCountryCode": "+380",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "##-###-####",
    "tld": ".ua",
    "flag": "🇺🇦",
    "groups": [
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "IS",
    "alpha3": "ISL",
    "name": "Iceland",
    "officialName": "Iceland",
    "nativeNames": [],
    "languages": [
      "is"
    ],
    "currency": "ISK",
    "currencySymbol": "kr",
    "phoneCountryCode": "+354",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-####",
    "tld": ".is",
    "flag": "🇮🇸",
    "groups": [
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "LU",
    "alpha3": "LUX",
    "name": "Luxembourg",
    "officialName": "Grand Duchy of Luxembourg",
    "nativeNames": [],
    "languages": [
      "fr",
      "de",
      "lb"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+352",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "### ### ###",
    "tld": ".lu",
    "flag": "🇱🇺",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "MT",
    "alpha3": "MLT",
    "name": "Malta",
    "officialName": "Republic of Malta",
    "nativeNames": [],
    "languages": [
      "mt",
      "en"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+356",
    "phoneRegexp": "^\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "####-####",
    "tld": ".mt",
    "flag": "🇲🇹",
    "groups": [
      "EU",
      "COMMONWEALTH",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "CY",
    "alpha3": "CYP",
    "name": "Cyprus",
    "officialName": "Republic of Cyprus",
    "nativeNames": [],
    "languages": [
      "el",
      "tr"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+357",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "##-###-###",
    "tld": ".cy",
    "flag": "🇨🇾",
    "groups": [
      "EU",
      "COMMONWEALTH",
      "EUROPE",
      "ASIA"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "EE",
    "alpha3": "EST",
    "name": "Estonia",
    "officialName": "Republic of Estonia",
    "nativeNames": [],
    "languages": [
      "et"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+372",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{4}$",
    "phoneFormat": "###-####",
    "tld": ".ee",
    "flag": "🇪🇪",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "LV",
    "alpha3": "LVA",
    "name": "Latvia",
    "officialName": "Republic of Latvia",
    "nativeNames": [],
    "languages": [
      "lv"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+371",
    "phoneRegexp": "^\\\\d{4}\\\\s?\\\\d{4}$",
    "phoneFormat": "####-####",
    "tld": ".lv",
    "flag": "🇱🇻",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "LT",
    "alpha3": "LTU",
    "name": "Lithuania",
    "officialName": "Republic of Lithuania",
    "nativeNames": [],
    "languages": [
      "lt"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+370",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{5}$",
    "phoneFormat": "###-#####",
    "tld": ".lt",
    "flag": "🇱🇹",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "SI",
    "alpha3": "SVN",
    "name": "Slovenia",
    "officialName": "Republic of Slovenia",
    "nativeNames": [],
    "languages": [
      "sl"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+386",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "##-###-###",
    "tld": ".si",
    "flag": "🇸🇮",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "SK",
    "alpha3": "SVK",
    "name": "Slovakia",
    "officialName": "Slovak Republic",
    "nativeNames": [],
    "languages": [
      "sk"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+421",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "###-###-###",
    "tld": ".sk",
    "flag": "🇸🇰",
    "groups": [
      "EU",
      "NATO",
      "OECD",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "HR",
    "alpha3": "HRV",
    "name": "Croatia",
    "officialName": "Republic of Croatia",
    "nativeNames": [],
    "languages": [
      "hr"
    ],
    "currency": "EUR",
    "currencySymbol": "€",
    "phoneCountryCode": "+385",
    "phoneRegexp": "^\\\\d{2}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "##-###-###",
    "tld": ".hr",
    "flag": "🇭🇷",
    "groups": [
      "EU",
      "NATO",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "BG",
    "alpha3": "BGR",
    "name": "Bulgaria",
    "officialName": "Republic of Bulgaria",
    "nativeNames": [],
    "languages": [
      "bg"
    ],
    "currency": "BGN",
    "currencySymbol": "лв",
    "phoneCountryCode": "+359",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "###-###-###",
    "tld": ".bg",
    "flag": "🇧🇬",
    "groups": [
      "EU",
      "NATO",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  },
  {
    "alpha2": "RO",
    "alpha3": "ROU",
    "name": "Romania",
    "officialName": "Romania",
    "nativeNames": [],
    "languages": [
      "ro"
    ],
    "currency": "RON",
    "currencySymbol": "lei",
    "phoneCountryCode": "+40",
    "phoneRegexp": "^\\\\d{3}\\\\s?\\\\d{3}\\\\s?\\\\d{3}$",
    "phoneFormat": "###-###-###",
    "tld": ".ro",
    "flag": "🇷🇴",
    "groups": [
      "EU",
      "NATO",
      "EUROPE"
    ],
    "postalCodeRegexp": "",
    "postalCodeFormat": ""
  }
];
