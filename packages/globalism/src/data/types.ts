/**
 * Country interface
 */
export interface Country {
  /** ISO 3166-1 alpha-2, upper case */
  alpha2: string;
  /** ISO 3166-1 alpha-3, upper case */
  alpha3: string;
  /** Array of grouping IDs */
  groups: Array<CountryGroup["id"]>;
  /** Array of ISO 639-1 language codes, e.g., ["es", "en"] */
  languages: Array<Language["code"]>;
  /** Anglicized short name, e.g., "Mexico" */
  name: string;
  /** Anglicized official name, e.g., "United Mexican States" */
  officialName: string;
  /** Array of native names in their respective languages, e.g., ["México", "Estados Unidos Mexicanos"] */
  nativeNames?: string[];

  /** ISO 4217 currency code, e.g., "MXN" */
  currency: string;
  /** Currency symbol, e.g., "$" */
  currencySymbol: string;

  /** International dialing code, e.g., "+52" */
  phoneCountryCode: string;
  /** Regular expression for phone numbers, e.g., "^\d{2} \d{4}-\d{4}$" */
  phoneRegexp?: string;
  /** Mask pattern for phone numbers, e.g., "(###) ###-####" */
  phoneFormat?: string;

  /** Regular expression for postal codes, e.g., "^[0-9]{5}$" */
  postalCodeRegexp?: string;
  /** Mask pattern format for postal codes, e.g., "A#A #A#" */
  postalCodeFormat?: string;

  /** Top-level domain, e.g., ".mx" */
  tld?: string;
  /** Flag emoji */
  flag?: string;

  // drivingSide?: "left" | "right";
  // unMember?: boolean;
  // subtype: CountrySubtype;
  // capital?: string;
  // region?: string;
  // subregion?: string;
  // population?: number;
  // areaKm2?: number;
}

export interface CountryGroup {
  id: string; // Unique identifier, e.g., "EU", "NATO", "BRICS"
  name: string;
  type: GroupingType;
  description?: string;
  members: string[]; // Array of country alpha2 codes
}

export enum CountrySubtype {
  SovereignState = "SOVEREIGN_STATE",
  Dependency = "DEPENDENCY",
  Disputed = "DISPUTED",
  Territory = "TERRITORY",
  SpecialAdministrativeRegion = "SPECIAL_ADMINISTRATIVE_REGION",
  ConstituentCountry = "CONSTITUENT_COUNTRY",
  Other = "OTHER",
}

export enum GroupingType {
  Continent = "CONTINENT",
  Region = "REGION",
  EconomicUnion = "ECONOMIC_UNION",
  MilitaryAlliance = "MILITARY_ALLIANCE",
  PoliticalUnion = "POLITICAL_UNION",
  CustomsUnion = "CUSTOMS_UNION",
  CurrencyUnion = "CURRENCY_UNION",
  FreeTradeArea = "FREE_TRADE_AREA",
  CulturalGroup = "CULTURAL_GROUP",
  Other = "OTHER",
}

/**
 * Represents a human language with its ISO code, English name, native name, and optional right-to-left flag.
 */
export interface Language {
  /** ISO 639-1 language code (e.g., "en" for English, "es" for Spanish). */
  code: string; // TODO: Should codes be an enum?
  /** Language name in English, e.g., "English", "Spanish" */
  name: string; 
  /** Language name in its native form, e.g., "English", "Español" */
  nativeName: string; 
  /** true if right-to-left (e.g., Arabic, Hebrew) */
  rtl?: boolean;
  /** Optional: script name, e.g., "Latin", "Cyrillic" */
  script?: string;
}
