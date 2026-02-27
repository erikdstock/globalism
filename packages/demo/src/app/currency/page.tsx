"use client";

import { useState, useMemo } from "react";
import { countries, Country, formatCurrency, formatCurrencyParts, getCurrencySymbol } from "globalism";

export default function CurrencyPage() {
  const countriesWithCurrency = useMemo(
    () => countries.filter((c) => c.currency).sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesWithCurrency.find((c) => c.alpha2 === "US") ?? countriesWithCurrency[0]
  );
  const [amountStr, setAmountStr] = useState("1234.56");

  const amount = parseFloat(amountStr) || 0;

  const formatted = useMemo(() => formatCurrency(amount, selectedCountry), [amount, selectedCountry]);
  const parts = useMemo(() => formatCurrencyParts(amount, selectedCountry), [amount, selectedCountry]);
  const symbol = getCurrencySymbol(selectedCountry);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Currency Formatting</h1>

        {/* Country selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            value={selectedCountry.alpha2}
            onChange={(e) => {
              const c = countriesWithCurrency.find((c) => c.alpha2 === e.target.value);
              if (c) setSelectedCountry(c);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countriesWithCurrency.map((c) => (
              <option key={c.alpha2} value={c.alpha2}>
                {c.flag} {c.name} ({c.currency})
              </option>
            ))}
          </select>
        </div>

        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Result */}
        <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-4 mb-4">
          <div className="text-3xl font-bold text-blue-900 text-center">{formatted}</div>
        </div>

        {/* Details */}
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Currency code</span>
            <span className="font-mono font-medium">{selectedCountry.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Symbol</span>
            <span className="font-mono font-medium">{symbol || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Locale</span>
            <span className="font-mono font-medium">{selectedCountry.alpha2.toLowerCase()}</span>
          </div>
        </div>

        {/* Parts breakdown */}
        {parts.length > 1 && (
          <div className="mt-5">
            <div className="text-xs font-medium text-gray-500 mb-2">Intl.NumberFormatParts</div>
            <div className="flex flex-wrap gap-1">
              {parts.map((part, i) => (
                <div key={i} className="flex flex-col items-center border border-gray-200 rounded px-2 py-1 text-xs">
                  <span className="font-mono text-gray-900">{part.value || "·"}</span>
                  <span className="text-gray-400 mt-0.5">{part.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
