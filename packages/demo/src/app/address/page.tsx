"use client";

import { useState, useMemo } from "react";
import {
  countries,
  Country,
  AddressComponents,
  formatAddressLines,
  getRequiredAddressComponents,
} from "globalism";

const FIELD_LABELS: Record<keyof AddressComponents, string> = {
  recipient: "Recipient / Attention",
  house_number: "House number",
  house: "Building / House name",
  road: "Street / Road",
  neighbourhood: "Neighbourhood",
  suburb: "Suburb",
  city_district: "City district",
  city: "City / Town",
  postal_town: "Postal town",
  county: "County",
  state_code: "State / Province code",
  state: "State / Province",
  postcode: "Postcode / ZIP",
  country: "Country name",
  country_code: "Country code",
};

export default function AddressPage() {
  const countriesWithFormat = useMemo(
    () => countries.filter((c) => c.addressFormat && c.addressFormat.length > 0),
    []
  );

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesWithFormat[0] ?? countries[0]
  );
  const [components, setComponents] = useState<AddressComponents>({});
  const [showTemplate, setShowTemplate] = useState(false);

  // Fields derived from the country dropdown — hidden from manual input
  const AUTO_FIELDS: ReadonlySet<keyof AddressComponents> = new Set(['country', 'country_code']);

  const requiredFields = useMemo(
    () => getRequiredAddressComponents(selectedCountry).filter((f) => !AUTO_FIELDS.has(f)),
    [selectedCountry]
  );

  // Merge user-entered components with country-derived values
  const mergedComponents = useMemo<AddressComponents>(
    () => ({
      ...components,
      country: selectedCountry.name,
      country_code: selectedCountry.alpha2.toLowerCase(),
    }),
    [components, selectedCountry]
  );

  const addressLines = useMemo(
    () => formatAddressLines(mergedComponents, selectedCountry),
    [mergedComponents, selectedCountry]
  );

  const handleCountryChange = (alpha2: string) => {
    const country = countriesWithFormat.find((c) => c.alpha2 === alpha2);
    if (country) {
      setSelectedCountry(country);
      setComponents({});
    }
  };

  const handleFieldChange = (field: keyof AddressComponents, value: string) => {
    setComponents((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Address Formatting</h1>

        {/* Country selector */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            value={selectedCountry.alpha2}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countriesWithFormat.map((c) => (
              <option key={c.alpha2} value={c.alpha2}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic address fields */}
        <div className="space-y-3 mb-6">
          {requiredFields.map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {FIELD_LABELS[field]}
              </label>
              <input
                type="text"
                value={components[field] ?? ""}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={FIELD_LABELS[field]}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Output */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Formatted address</div>
          <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 min-h-[80px] text-sm font-mono whitespace-pre-wrap text-gray-800">
            {addressLines && addressLines.length > 0
              ? addressLines.join("\n")
              : <span className="text-gray-400 italic">Fill in fields above…</span>}
          </div>
        </div>

        {/* Show raw template toggle */}
        {selectedCountry.addressFormat && (
          <div>
            <button
              onClick={() => setShowTemplate(!showTemplate)}
              className="text-xs text-blue-600 hover:underline"
            >
              {showTemplate ? "Hide" : "Show"} raw template
            </button>
            {showTemplate && (
              <pre className="mt-2 bg-gray-900 text-green-400 rounded-md px-3 py-3 text-xs font-mono overflow-x-auto">
                {selectedCountry.addressFormat.join("\n")}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
