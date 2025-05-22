import { Country } from "@/data/types";

export const generatePhonePlaceholder = (
  country: Country
): string | null => {
  if (!country.phoneFormat) return null;

  const placeholder = country.phoneFormat
    .replace(/#/g, "0")
    .replace(/\s+/g, " ")
    .trim();

  return placeholder;
}