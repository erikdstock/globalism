import type { Country } from "./types";



export const countries: Country[] = [
  {
    groups: [],
    alpha2: "US",
    alpha3: "USA",
    name: "United States",
    officialName: "United States of America",
    nativeNames: ["United States", "United States of America"],
    currency: "USD",
    currencySymbol: "$",
    phoneCountryCode: "+1",
    languages: ["en"],
    // Matches US phone numbers with or without spaces, dashes, or parentheses
    phoneRegexp: "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$",
    phoneFormat: "(###) ###-####",
    postalCodeRegexp: "",
    postalCodeFormat: "",
    tld: ".us",
    flag: "🇺🇸",
  }
];
