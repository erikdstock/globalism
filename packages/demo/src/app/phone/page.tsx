"use client";

import { useState, useMemo } from "react";
import { countries, Country, generatePhonePlaceholder, analyzePhoneNumber } from "globalism";

export default function PhonePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortedCountries = useMemo(() => {
    return [...countries]
      .filter(country => country.phoneCountryCode && country.phoneFormat)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const phoneState = useMemo(() => {
    return analyzePhoneNumber(phoneNumber, selectedCountry);
  }, [phoneNumber, selectedCountry]);

  const placeholder = useMemo(() => {
    return generatePhonePlaceholder(selectedCountry) || "Enter phone number";
  }, [selectedCountry]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setPhoneNumber("");
    setSavedValue("");
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const analysis = analyzePhoneNumber(value, selectedCountry);
    setPhoneNumber(analysis.formatted);
  };

  const handleSave = () => {
    if (phoneState.status === 'complete') {
      setSavedValue(phoneState.international);
    } else {
      setSavedValue("");
    }
  };

  const getErrorMessage = () => {
    switch (phoneState.status) {
      case 'empty':
        return "Phone number is required";
      case 'invalid':
        return "Invalid phone number format";
      default:
        return "";
    }
  };

  const displayName = (country: Country) => {
    if (country.nativeNames && country.nativeNames.length > 0) {
      return country.nativeNames[0];
    }
    return country.name;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Phone Number Input</h1>
        
        {/* Country Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-2">{selectedCountry.flag}</span>
                <span className="flex-1">{displayName(selectedCountry)}</span>
                <span className="text-gray-500 ml-2">{selectedCountry.phoneCountryCode}</span>
                <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {sortedCountries.map((country) => (
                  <button
                    key={country.alpha2}
                    onClick={() => handleCountrySelect(country)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                  >
                    <span className="text-2xl mr-2">{country.flag}</span>
                    <span className="flex-1">{displayName(country)}</span>
                    <span className="text-gray-500 ml-2">{country.phoneCountryCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneInputChange}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Error Message */}
        {getErrorMessage() && (
          <div className="mb-4 text-red-600 text-sm">
            {getErrorMessage()}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={phoneState.status !== 'complete'}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            phoneState.status === 'complete'
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save
        </button>

        {/* Saved Value Display */}
        {savedValue && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              <span className="font-medium">Saved:</span> {savedValue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}