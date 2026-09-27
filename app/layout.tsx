import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Farmer AI – Your Intelligent Farming Assistant | உங்கள் விவசாயத்திற்கு AI துணை",
  description:
    "AI-powered farming assistant for weather, crops, disease analysis, markets, machinery, schemes and scholarships.",
  keywords: [
    "Farmer AI",
    "Tamil Agriculture AI",
    "Paddy Disease Detection",
    "Uzhavar Sandhai Market Prices",
    "Tamil Nadu Farmer Schemes",
    "Agricultural Machinery Rental",
    "Open-Meteo Farming Weather",
  ],
  authors: [{ name: "Farmer AI Team" }],
  openGraph: {
    title: "Farmer AI – Your Intelligent Farming Assistant",
    description:
      "Smart agriculture decisions powered by AI, real-time weather, market insights, and local farmer intelligence.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileNav />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
