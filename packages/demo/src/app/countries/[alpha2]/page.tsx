import { countries, findCountryByAlpha2 } from "globalism";

export async function generateStaticParams() {
  return countries.map((c) => ({ alpha2: c.alpha2 }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ alpha2: string }>;
}) {
  const { alpha2 } = await params;
  const country = findCountryByAlpha2(alpha2);

  if (!country) return <div>Country not found</div>;
  return (
    <pre className="p-4 rounded-[2px] bg-[#101010] text-green-400 font-mono">
      {JSON.stringify(country, null, 2)}
    </pre>
  );
}
