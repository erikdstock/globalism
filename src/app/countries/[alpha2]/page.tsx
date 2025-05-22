import { countries } from "@/data/countries";
import { findCountryByAlpha2 } from "@/util/lookups";

export async function generateStaticParams() {
  return countries.map((c) => ({ alpha2: c.alpha2 }));
}

export default function CountryPage({
  params,
}: {
  params: { alpha2: string };
}) {
  const country = findCountryByAlpha2(params.alpha2);

  if (!country) return <div>Country not found</div>;
  return (
    <pre className="p-4 rounded-[2px] bg-[#101010] text-green-400 font-mono">
      {JSON.stringify(country, null, 2)}
    </pre>
  );
}
