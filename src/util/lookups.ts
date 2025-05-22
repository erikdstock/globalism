import type { Country } from "@/data/types";
import { countries } from "@/data/countries";

export const findCountryByAlpha2 = (alpha2: string): Country | undefined => {
  return countries.find((c) => c.alpha2.toUpperCase() === alpha2.toUpperCase());
};