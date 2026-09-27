"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  CloudSun,
  ScanLine,
  TrendingUp,
  Tractor,
  FileText,
  GraduationCap,
  Sprout,
  Droplets,
  Bell,
  ArrowRight,
  Send,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MapPin,
} from "lucide-react";

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();
  const router = useRouter();

  const [askQuery, setAskQuery] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const district = profile?.district || "Thanjavur";
  const farmerName = profile?.farmerName || (language === "ta" ? "விவசாயி" : "Farmer");
  const mainCrop = profile?.mainCrops?.[0] || "Paddy (Ponni)";

  useEffect(() => {
    async function loadWeather() {
      try {
        const res = await fetch(`/api/weather?district=${encodeURIComponent(district)}`);
        if (res.ok) {
          const data = await res.json();
          setWeatherData(data);
        }
      } catch (e) {
        console.error("Dashboard weather fetch error", e);
      } finally {
        setLoadingWeather(false);
      }
    }
    loadWeather();
  }, [district]);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askQuery.trim()) {
      router.push(`/chat?q=${encodeURIComponent(askQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* A. Welcome Card with Farmer Details */}
      <section className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>{profile?.village ? `${profile.village}, ` : ""}{district}, {profile?.state || "Tamil Nadu"}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t("dashboard.welcome")}, {farmerName}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              {language === "ta"
                ? `உங்கள் ${profile?.landSizeAcres || 3.5} ஏக்கர் நிலத்திற்குரிய ${mainCrop} பயிர் நிலவரம், நேரடி வானிலை எச்சரிக்கைகள் மற்றும் சந்தை வாய்ப்புகள்.`
                : `Tailored management for your ${profile?.landSizeAcres || 3.5} acres of ${mainCrop}, live agricultural advisories, and nearby mandi pricing.`}
            </p>
          </div>

          {/* Quick Farm Metadata Pills */}
          <div className="flex flex-wrap gap-2.5">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center">
              <span className="text-[10px] uppercase tracking-wider text-emerald-200 block font-semibold">
                {language === "ta" ? "முக்கிய பயிர்" : "Main Crop"}
              </span>
              <span className="text-sm font-bold text-white">{mainCrop}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center">
              <span className="text-[10px] uppercase tracking-wider text-emerald-200 block font-semibold">
                {language === "ta" ? "நிலப்பரப்பு" : "Land Area"}
              </span>
              <span className="text-sm font-bold text-white">{profile?.landSizeAcres || 3.5} Acres</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center">
              <span className="text-[10px] uppercase tracking-wider text-emerald-200 block font-semibold">
                {language === "ta" ? "பாசனம்" : "Irrigation"}
              </span>
              <span className="text-sm font-bold text-white truncate max-w-[120px]">
                {profile?.irrigationType?.split("(")[0] || "Borewell"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent "Ask Farmer AI" Input Banner */}
      <section className="bg-white rounded-2xl border border-emerald-300 p-4 sm:p-5 shadow-sm">
        <form onSubmit={handleAskSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 pl-2 text-emerald-700 shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span className="font-bold text-sm text-stone-900">
              {language === "ta" ? "Farmer AI-யிடம் கேளுங்கள்:" : "Ask Farmer AI:"}
            </span>
          </div>
          <input
            type="text"
            value={askQuery}
            onChange={(e) => setAskQuery(e.target.value)}
            placeholder={language === "ta" ? "எ.கா: 'நெற்பயிருக்கு யூரியா எப்போது இட வேண்டும்?' அல்லது 'நாளைக்கு மழை வருமா?'" : "e.g., 'When to apply urea for paddy?' or 'Will it rain tomorrow?'"}
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-sm"
          >
            <span>{t("common.submit")}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </section>

      {/* Grid: Weather & Smart Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Intelligence Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <CloudSun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    {district} {t("nav.weather")}
                  </h3>
                  <span className="text-[11px] text-stone-500">{t("common.source")}: Open-Meteo</span>
                </div>
              </div>
              <Badge variant="info">{t("common.live")}</Badge>
            </div>

            {loadingWeather ? (
              <div className="py-8 text-center text-xs text-stone-400 animate-pulse">
                {t("common.loading")}
              </div>
            ) : weatherData ? (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-stone-900">
                      {weatherData.current.temperature}°C
                    </span>
                    <span className="text-xs text-stone-500">
                      {language === "ta" ? weatherData.current.conditionTextTa : weatherData.current.conditionTextEn}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    {t("weather.feelsLike")}: {weatherData.current.feelsLike}°C
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">{t("weather.rainProb")}</span>
                    <span className="font-bold text-stone-900">{weatherData.current.rainProbability}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">{t("weather.humidity")}</span>
                    <span className="font-bold text-stone-900">{weatherData.current.humidity}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">{t("weather.windSpeed")}</span>
                    <span className="font-bold text-stone-900">{weatherData.current.windSpeed} km/h</span>
                  </div>
                </div>

                {weatherData.advisories?.[0] && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      {language === "ta"
                        ? weatherData.advisories[0].descriptionTa
                        : weatherData.advisories[0].descriptionEn}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-stone-400">Weather data unavailable</p>
            )}
          </div>

          <Link
            href="/weather"
            className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>{language === "ta" ? "24 மணி நேர & 7 நாள் அறிக்கை" : "Hourly & 7-Day Forecast"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Smart Alerts Feed (2 columns on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                {t("dashboard.smartAlerts")}
              </h3>
            </div>
            <Link href="/notifications" className="text-xs text-emerald-700 font-bold hover:underline">
              {t("common.viewDetails")} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-rose-900">
                <span>{language === "ta" ? "பயிர் காப்பீடு காலக்கெடு" : "PMFBY Insurance Cut-off"}</span>
                <Badge variant="danger">{language === "ta" ? "முக்கியம்" : "Urgent"}</Badge>
              </div>
              <p className="text-rose-800 text-[11px] leading-relaxed">
                {language === "ta"
                  ? "சம்பா நெல் பயிர் காப்பீட்டுக்கு நவம்பர் 30 கடைசி நாள். VAO அடங்கலுடன் பதிவு செய்யவும்."
                  : "November 30 is the last date to register Samba paddy with VAO Adangal certificate."}
              </p>
              <Link href="/schemes" className="inline-block pt-1 font-bold text-rose-900 hover:underline">
                {language === "ta" ? "விவரங்கள் காண்க →" : "View details →"}
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-blue-900">
                <span>{language === "ta" ? "பாசன ஆலோசனை" : "Irrigation Advisory"}</span>
                <Badge variant="info">Watering</Badge>
              </div>
              <p className="text-blue-800 text-[11px] leading-relaxed">
                {language === "ta"
                  ? "பூக்கும் பருவ நெல்லுக்கு வயலில் 2-3 செ.மீ நீர் நிறுத்துவது நல்லது. மழை வாய்ப்பு உள்ளதால் மிகை நீர் பாய்ச்சலை தவிர்க்கவும்."
                  : "Maintain 2-3 cm standing water during flowering stage. Factor in upcoming rain before pump operation."}
              </p>
              <Link href="/crops" className="inline-block pt-1 font-bold text-blue-900 hover:underline">
                {language === "ta" ? "பயிர் வழிகாட்டி →" : "Crop guide →"}
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span>{language === "ta" ? "சந்தை விலை உயர்வு" : "Market Price Trend"}</span>
                <Badge variant="success">Price Alert</Badge>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                {language === "ta"
                  ? "தஞ்சாவூர் உழவர் சந்தையில் பொன்னி நெல் விலை ₹2,450/குவிண்டாலாக அதிகரித்துள்ளது."
                  : "Grade-A paddy firm at ₹2,450/quintal at Thanjavur Uzhavar Sandhai. Transport net estimated high."}
              </p>
              <Link href="/market" className="inline-block pt-1 font-bold text-emerald-900 hover:underline">
                {language === "ta" ? "சந்தை கணக்கீடு →" : "Calculate net →"}
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-purple-900">
                <span>{language === "ta" ? "இயந்திர வாடகை மையம்" : "Machinery Availability"}</span>
                <Badge variant="neutral">Rental</Badge>
              </div>
              <p className="text-purple-800 text-[11px] leading-relaxed">
                {language === "ta"
                  ? "அறுவடை இயந்திரம் மற்றும் ரோட்டாவேட்டர் டிராக்டர் உங்கள் பகுதியில் உடனடியாக வாடகைக்கு தயார்."
                  : "Kubota track harvester and 4WD tractor available from local hiring center at 6.8 km."}
              </p>
              <Link href="/machinery" className="inline-block pt-1 font-bold text-purple-900 hover:underline">
                {language === "ta" ? "வாடகைக்கு எடுக்க →" : "Book machine →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid (All 8 Core Modules) */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          {t("dashboard.quickActions")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/chat"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.chat")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "இருமொழி குரல் & உரை AI" : "Bilingual AI Voice & Chat"}
            </p>
          </Link>

          <Link
            href="/disease-detection"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <ScanLine className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.disease")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "இலை நோய் ஸ்கேன்" : "Leaf Pathology Diagnosis"}
            </p>
          </Link>

          <Link
            href="/crops"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.crops")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "மண் சார்ந்த பயிர் தேர்வு" : "Soil & Season Matching"}
            </p>
          </Link>

          <Link
            href="/market"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.market")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "நிகர லாப கணக்கீடு" : "Net Take-Home Comparison"}
            </p>
          </Link>

          <Link
            href="/machinery"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <Tractor className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.machinery")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "டிராக்டர், அறுவடை வாடகை" : "Custom Hiring & Equipment"}
            </p>
          </Link>

          <Link
            href="/weather"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.weather")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "தெளிப்பு & பாசன எச்சரிக்கை" : "Foliar Spray Advisory"}
            </p>
          </Link>

          <Link
            href="/schemes"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.schemes")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "அரசு மானியங்கள்" : "PM-KISAN & Welfare"}
            </p>
          </Link>

          <Link
            href="/scholarships"
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700">
              {t("nav.scholarships")}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {language === "ta" ? "விவசாயக் கல்வி உதவித்தொகை" : "Farmers Children Aid"}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
