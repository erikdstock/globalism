import { findCountryByAlpha2, generatePhonePlaceholder } from "globalism";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ alpha2: string }> }
) {
  const { alpha2 } = await params;
  if (!alpha2 || typeof alpha2 !== "string") {
    return NextResponse.json(
      { message: "Missing or invalid alpha2 parameter" },
      { status: 400 }
    );
  }

  const country = findCountryByAlpha2(alpha2);
  if (!country) {
    return NextResponse.json({ message: "Country not found" }, { status: 404 });
  }

  // Return only phone-related info
  const { phoneCountryCode, phoneRegexp, phoneFormat } = country;

  const phonePlaceholder = generatePhonePlaceholder(country)

  return NextResponse.json({ phoneCountryCode, phoneRegexp, phoneFormat, phonePlaceholder });
}