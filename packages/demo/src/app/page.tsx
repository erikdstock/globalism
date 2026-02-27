import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">globalism</h1>
      <p className="text-lg text-gray-600 mb-2">
        A TypeScript library for country data, phone number formatting, address formatting, and currency formatting.
      </p>
      <pre className="bg-gray-900 text-green-400 rounded-md px-4 py-3 text-sm font-mono mb-10 inline-block">
        npm install globalism
      </pre>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interactive demos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/phone"
            className="block p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">📞</div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-sm text-gray-500 mt-1">Format and validate phone numbers by country</p>
          </Link>
          <Link
            href="/address"
            className="block p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="text-sm text-gray-500 mt-1">Format addresses following each country&apos;s conventions</p>
          </Link>
          <Link
            href="/currency"
            className="block p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">💱</div>
            <h3 className="font-semibold text-gray-900">Currency</h3>
            <p className="text-sm text-gray-500 mt-1">Locale-aware currency formatting with Intl.NumberFormat</p>
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What&apos;s included</h2>
        <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside">
          <li>~250 countries with ISO 3166-1 alpha-2 / alpha-3 codes, flags, and native names</li>
          <li>Phone country codes, format masks, and validation regexes</li>
          <li>Country group memberships (EU, NATO, G7, continents, …)</li>
          <li>184 languages with ISO 639-1 codes, native names, and RTL flags</li>
          <li>Address format templates (OpenCageData) for country-aware rendering</li>
          <li>Currency codes, symbols, and <code className="bg-gray-100 px-1 rounded">Intl.NumberFormat</code> helpers</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick start</h2>
        <pre className="bg-gray-900 text-green-400 rounded-md px-4 py-4 text-sm font-mono overflow-x-auto">{`import {
  findCountryByAlpha2,
  formatPhoneNumber,
  formatAddress,
  formatCurrency,
} from 'globalism';

const us = findCountryByAlpha2('US')!;

formatPhoneNumber('5551234567', us);
// → "(555) 123-4567"

formatAddress({ house_number: '1600', road: 'Pennsylvania Ave NW',
  city: 'Washington', state_code: 'DC', postcode: '20500' }, us);
// → "1600 Pennsylvania Ave NW\\nWashington, DC 20500"

formatCurrency(1234.56, us);
// → "$1,234.56"`}</pre>
      </section>

      <footer className="mt-16 text-xs text-gray-400 space-y-1">
        <p>
          Country data: <a href="https://restcountries.com/" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">REST Countries</a> (CC BY-SA 4.0)
        </p>
        <p>
          Address templates: <a href="https://github.com/OpenCageData/address-formatting" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">OpenCageData address-formatting</a> (BSD 2-Clause)
        </p>
        <p>
          Phone patterns: <a href="https://github.com/catamphetamine/libphonenumber-js" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">libphonenumber-js</a> (MIT), data from <a href="https://github.com/google/libphonenumber" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">Google libphonenumber</a> (Apache 2.0)
        </p>
        <p>
          <a href="https://github.com/erikdstock/globalism" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </p>
      </footer>
    </main>
  );
}
