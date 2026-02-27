import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "globalism — country data & formatting utilities",
  description:
    "Interactive demos for the globalism NPM package: phone number formatting, address formatting, and currency formatting for countries worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}>
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-6">
            <Link href="/" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              globalism
            </Link>
            <Link href="/phone" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Phone
            </Link>
            <Link href="/address" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Address
            </Link>
            <Link href="/currency" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Currency
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
