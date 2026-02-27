import type { Country } from '../data/types';

/**
 * Return the currency symbol stored for the given country (e.g. "$", "€", "¥").
 * Returns an empty string if the country has no currency data.
 */
export function getCurrencySymbol(country: Country): string {
  return country.currencySymbol ?? '';
}

/**
 * Format a number as currency using the country's locale and ISO 4217 currency code.
 * Uses Intl.NumberFormat for locale-aware formatting (e.g. thousand separators, decimal places).
 * Falls back to a simple symbol + toFixed(2) string if the currency code is unknown to Intl.
 */
export function formatCurrency(amount: number, country: Country): string {
  return formatCurrencyWithOptions(amount, country);
}

/**
 * Format a number as currency with additional Intl.NumberFormatOptions.
 * The `style` and `currency` options are always derived from the country and cannot be overridden.
 */
export function formatCurrencyWithOptions(
  amount: number,
  country: Country,
  options: Omit<Intl.NumberFormatOptions, 'style' | 'currency'> = {}
): string {
  if (!country.currency) {
    return String(amount);
  }
  try {
    return new Intl.NumberFormat(country.alpha2.toLowerCase(), {
      ...options,
      style: 'currency',
      currency: country.currency,
    }).format(amount);
  } catch {
    const symbol = country.currencySymbol ?? '';
    return `${symbol}${amount.toFixed(2)}`;
  }
}

/**
 * Return the full Intl.NumberFormatPart[] breakdown for a currency amount.
 * Useful for custom rendering (e.g. rendering symbol and amount in separate DOM elements).
 * Returns a single literal part containing the fallback string if Intl throws.
 */
export function formatCurrencyParts(
  amount: number,
  country: Country
): Intl.NumberFormatPart[] {
  if (!country.currency) {
    return [{ type: 'literal', value: String(amount) }];
  }
  try {
    return new Intl.NumberFormat(country.alpha2.toLowerCase(), {
      style: 'currency',
      currency: country.currency,
    }).formatToParts(amount);
  } catch {
    const symbol = country.currencySymbol ?? '';
    return [{ type: 'literal', value: `${symbol}${amount.toFixed(2)}` }];
  }
}
