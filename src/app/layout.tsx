import type { Metadata } from "next";
import { Inter, Cabin, Comfortaa } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZorgNotitie — AI-gestuurde verslaglegging voor de zorg",
  description:
    "Automatische gesprekssamenvattingen, rapportages en dossiervorming voor Nederlandse zorgverleners. AVG-proof en veilig.",
  keywords: [
    "zorg",
    "AI",
    "verslaglegging",
    "samenvatting",
    "rapportage",
    "AVG",
    "GDPR",
    "huisarts",
    "GGZ",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${cabin.variable} ${comfortaa.variable} antialiased`}>{children}</body>
    </html>
  );
}
