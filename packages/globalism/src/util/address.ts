import type { AddressComponents, Country } from '../data/types';

/**
 * Valid keys of AddressComponents for use in template extraction.
 */
const ADDRESS_COMPONENT_KEYS: Array<keyof AddressComponents> = [
  'recipient',
  'house_number',
  'house',
  'road',
  'neighbourhood',
  'suburb',
  'city_district',
  'city',
  'postal_town',
  'county',
  'state_code',
  'state',
  'postcode',
  'country',
  'country_code',
];

const COMPONENT_KEY_SET = new Set<string>(ADDRESS_COMPONENT_KEYS);

/**
 * Resolve a single variable name against the components object.
 * Returns the trimmed string value, or empty string if absent.
 */
function resolve(key: string, components: AddressComponents): string {
  return (components[key as keyof AddressComponents] ?? '').trim();
}

/**
 * Render a single Mustache-subset template line against address components.
 *
 * Supported constructs (matching OpenCageData's address-formatting templates):
 *   - `{{{variable}}}` or `{{variable}}` — simple substitution
 *   - `{{#first}} {{{a}}} || {{{b}}} || {{{c}}} {{/first}}` — pick first non-empty value
 *   - `{{#variable}}block{{/variable}}` — render block if variable is truthy
 *   - `{{^variable}}block{{/variable}}` — render block if variable is falsy
 *
 * Returns the rendered line trimmed of leading/trailing whitespace.
 * Returns empty string if the result is blank after trimming.
 */
function renderLine(template: string, components: AddressComponents): string {
  // 1. Handle {{#first}} ... {{/first}} — pick first non-empty alternative
  let result = template.replace(
    /\{\{#first\}\}([\s\S]*?)\{\{\/first\}\}/g,
    (_match, inner: string) => {
      const alternatives = inner.split('||').map(s => s.trim());
      for (const alt of alternatives) {
        // Render all variables in this alternative
        const rendered = alt.replace(/\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g, (_m, t, d) => {
          return resolve(t ?? d, components);
        }).trim();
        if (rendered) return rendered;
      }
      return '';
    }
  );

  // 2. Handle {{#var}}block{{/var}} and {{^var}}block{{/var}} conditionals
  result = result.replace(
    /\{\{([#^])(\w+)\}\}([\s\S]*?)\{\{\/\2\}\}/g,
    (_match, modifier: string, key: string, block: string) => {
      const value = resolve(key, components);
      const truthy = Boolean(value);
      if (modifier === '#') return truthy ? block : '';
      if (modifier === '^') return truthy ? '' : block;
      return '';
    }
  );

  // 3. Handle {{{variable}}} and {{variable}} — simple substitution
  result = result.replace(/\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g, (_match, t, d) => {
    return resolve(t ?? d, components);
  });

  // Collapse multiple spaces, trim, then discard lines with no alphanumeric content
  // (e.g. ", " left over when both sides of a separator are empty)
  const cleaned = result.replace(/\s{2,}/g, ' ').trim();
  return /[a-zA-Z0-9\u0080-\uFFFF]/.test(cleaned) ? cleaned : '';
}

/**
 * Format address components into a multi-line string using the country's address template.
 * Returns null if the country has no addressFormat defined.
 * Empty lines are omitted from the output.
 */
export function formatAddress(components: AddressComponents, country: Country): string | null {
  const lines = formatAddressLines(components, country);
  if (lines === null) return null;
  return lines.join('\n');
}

/**
 * Format address components into an array of non-empty lines using the country's address template.
 * Returns null if the country has no addressFormat defined.
 */
export function formatAddressLines(
  components: AddressComponents,
  country: Country
): string[] | null {
  if (!country.addressFormat || country.addressFormat.length === 0) return null;

  return country.addressFormat
    .map(lineTemplate => renderLine(lineTemplate, components))
    .filter(line => line.length > 0);
}

/**
 * Return the list of AddressComponents keys referenced in the country's address template.
 * Useful for rendering only the input fields relevant to a given country.
 * Returns an empty array if the country has no addressFormat.
 */
export function getRequiredAddressComponents(
  country: Country
): Array<keyof AddressComponents> {
  if (!country.addressFormat || country.addressFormat.length === 0) return [];

  const found = new Set<keyof AddressComponents>();
  // Match {{{var}}} and {{var}} tokens (excluding section markers like {{#first}}, {{/first}})
  const tokenRe = /\{\{\{(\w+)\}\}\}|\{\{(?![#^/])(\w+)\}\}/g;

  for (const lineTemplate of country.addressFormat) {
    let match: RegExpExecArray | null;
    while ((match = tokenRe.exec(lineTemplate)) !== null) {
      const key = match[1] ?? match[2];
      if (COMPONENT_KEY_SET.has(key)) {
        found.add(key as keyof AddressComponents);
      }
    }
  }

  // Return in canonical key order
  return ADDRESS_COMPONENT_KEYS.filter(k => found.has(k));
}
