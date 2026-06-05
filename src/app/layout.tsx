import type { Metadata } from "next";
import { Fraunces, Inter, Caveat, Cinzel } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
  weight: ["400", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "White Teak Coffee Roasters — Brewed with Love, Poured with Soul",
  description:
    "Where coffee and cuisine harmonize with the beauty of nature. Specialty coffee, craft bakes, and an all-day cafe experience in Mysuru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${cinzel.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
