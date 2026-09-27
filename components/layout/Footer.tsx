"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Sprout, Phone, ShieldCheck, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-20 lg:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Farmer AI</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === "ta"
                ? "விவசாயிகளின் வாழ்வாதாரத்தை மேம்படுத்தவும், நவீன தொழில்நுட்பங்களை விவசாயிகளுக்கு எளிதில் கொண்டு சேர்க்கவும் உருவாக்கப்பட்ட தளம்."
                : "Empowering farmers with AI-driven agronomic advice, hyper-local weather alerts, transparent market net-prices, and equipment access."}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === "ta" ? "சரிபார்க்கப்பட்ட அரசு இணைப்புகள்" : "Verified Official Portals"}</span>
            </div>
          </div>

          {/* Quick Platform Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "ta" ? "முக்கிய சேவைகள்" : "Core Services"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/crops" className="hover:text-emerald-400 transition-colors">
                  {t("nav.crops")} & {t("nav.disease")}
                </Link>
              </li>
              <li>
                <Link href="/weather" className="hover:text-emerald-400 transition-colors">
                  {t("nav.weather")} (Open-Meteo)
                </Link>
              </li>
              <li>
                <Link href="/market" className="hover:text-emerald-400 transition-colors">
                  {t("nav.market")} & Net-Take Home
                </Link>
              </li>
              <li>
                <Link href="/machinery" className="hover:text-emerald-400 transition-colors">
                  {t("nav.machinery")} Custom Hiring
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-emerald-400 transition-colors">
                  {t("nav.chat")} (Bilingual Agent)
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Helplines & Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "ta" ? "உதவி எண்கள் & அரசு தளங்கள்" : "Official Helplines"}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Kisan Call Centre: <strong className="text-white">1800-180-1551</strong> (Toll Free)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://pmkisan.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  PM-KISAN Samman Nidhi
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://tnagrisnet.tn.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Tamil Nadu AGRISNET Portal
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://agritech.tnau.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TNAU Agritech Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Agricultural Disclaimer */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "ta" ? "பாதுகாப்பு அறிவிப்பு" : "Agricultural Advisory Notice"}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === "ta"
                ? "Farmer AI வழங்கும் ஆலோசனைகள் வழிகாட்டுதலுக்காக மட்டுமே. ரசாயன மருந்துகள் அல்லது முக்கியமான பயிர் பாதுகாப்பு முடிவுகளுக்கு உள்ளூர் வேளாண்மை அலுவலர் அல்லது வேளாண் அறிவியல் மையத்தை (KVK) அணுகவும்."
                : "Farmer AI provides advisory guidance based on AI models and Open-Meteo forecasts. For regulated chemical pesticides and high-consequence farm management, consult local agricultural extension officers."}
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© 2026 Farmer AI. Built for Indian smallholder farmers.</p>
          <div className="flex items-center gap-4">
            <Link href="/settings" className="hover:text-stone-300 transition-colors">
              {t("nav.settings")}
            </Link>
            <Link href="/profile" className="hover:text-stone-300 transition-colors">
              {t("nav.profile")}
            </Link>
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <Heart className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" /> Proudly Made for Farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
