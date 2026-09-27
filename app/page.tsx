"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Badge } from "@/components/ui/Badge";
import {
  Sprout,
  ScanLine,
  Sparkles,
  CloudSun,
  TrendingUp,
  Tractor,
  FileText,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Wind,
  Droplets,
  Thermometer,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();
  const router = useRouter();
  const [askQuery, setAskQuery] = useState("");

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askQuery.trim()) {
      router.push(`/chat?q=${encodeURIComponent(askQuery.trim())}`);
    }
  };

  const quickActions = [
    {
      title: t("nav.chat"),
      desc: language === "ta" ? "AI விவசாய உதவியாளர்" : "Bilingual AI Voice & Chat",
      icon: Sparkles,
      href: "/chat",
      color: "from-emerald-600 to-teal-700",
      badge: language === "ta" ? "நேரடி AI" : "Live AI",
    },
    {
      title: t("nav.disease"),
      desc: language === "ta" ? "இலை நோய் கண்டறிதல்" : "Instant Leaf Pathology Scan",
      icon: ScanLine,
      href: "/disease-detection",
      color: "from-amber-600 to-orange-700",
      badge: language === "ta" ? "கேமரா" : "Vision AI",
    },
    {
      title: t("nav.weather"),
      desc: language === "ta" ? "மழை & தெளிப்பு எச்சரிக்கை" : "Hyper-Local Spray Forecast",
      icon: CloudSun,
      href: "/weather",
      color: "from-blue-600 to-cyan-700",
      badge: "Open-Meteo",
    },
    {
      title: t("nav.market"),
      desc: language === "ta" ? "நிகர லாப சந்தை விலை" : "Net Take-Home Calculations",
      icon: TrendingUp,
      href: "/market",
      color: "from-green-600 to-emerald-800",
      badge: language === "ta" ? "சந்தை" : "Mandi Net",
    },
    {
      title: t("nav.machinery"),
      desc: language === "ta" ? "டிராக்டர் & அறுவடை வாடகை" : "Tractors, Harvesters & Tillers",
      icon: Tractor,
      href: "/machinery",
      color: "from-purple-600 to-indigo-700",
      badge: language === "ta" ? "வாடகை" : "Rental",
    },
    {
      title: t("nav.crops"),
      desc: language === "ta" ? "மண் சார்ந்த பயிர் தேர்வு" : "Soil & Seasonal Recommendation",
      icon: Sprout,
      href: "/crops",
      color: "from-emerald-500 to-green-700",
      badge: language === "ta" ? "பரிந்துரை" : "Agronomy",
    },
    {
      title: t("nav.schemes"),
      desc: language === "ta" ? "அரசு மானியங்கள் & திட்டங்கள்" : "PM-KISAN & State Subsidies",
      icon: FileText,
      href: "/schemes",
      color: "from-rose-600 to-pink-700",
      badge: language === "ta" ? "அரசு" : "Govt",
    },
    {
      title: t("nav.scholarships"),
      desc: language === "ta" ? "விவசாயக் கல்வி உதவித்தொகை" : "Scholarships for Agri Students",
      icon: GraduationCap,
      href: "/scholarships",
      color: "from-sky-600 to-blue-800",
      badge: language === "ta" ? "கல்வி" : "Education",
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 shadow-xl">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span>{language === "ta" ? "புதிய தலைமுறை வேளாண்மை AI" : "Next-Gen AI for Indian Farmers"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {language === "ta" ? (
              <>
                <span className="block text-emerald-200">{t("hero.tamilTitle")}</span>
                <span className="text-xl sm:text-3xl font-medium text-emerald-100/90 mt-2 block font-sans">
                  {t("hero.title")}
                </span>
              </>
            ) : (
              <>
                <span className="block text-white">{t("hero.title")}</span>
                <span className="text-xl sm:text-3xl font-medium text-emerald-300 mt-2 block">
                  {t("hero.tamilTitle")}
                </span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-emerald-100/80 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              {t("hero.ctaSpeak")}
            </Link>

            <Link
              href="/disease-detection"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all hover:scale-105"
            >
              <ScanLine className="w-4 h-4 text-emerald-300" />
              {t("hero.ctaScan")}
            </Link>

            <Link
              href="/crops"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all hover:scale-105"
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              {t("hero.ctaCrops")}
            </Link>
          </div>

          {/* Instant "Ask Farmer AI" input bar */}
          <div className="pt-6 max-w-2xl mx-auto">
            <form
              onSubmit={handleAskSubmit}
              className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border border-stone-200"
            >
              <input
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                placeholder={t("hero.askPlaceholder")}
                className="w-full px-4 py-3 text-stone-900 text-sm focus:outline-none rounded-xl placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shrink-0 transition-colors shadow-sm"
              >
                <span>{language === "ta" ? "கேள்" : "Ask"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Suggested quick pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-emerald-200/90">
              <span className="font-semibold text-emerald-300">
                {language === "ta" ? "கேள்விகள்:" : "Try:"}
              </span>
              <button
                type="button"
                onClick={() => router.push(`/chat?q=${encodeURIComponent("Will it rain today?")}`)}
                className="hover:underline bg-emerald-800/40 px-2 py-0.5 rounded border border-emerald-600/30"
              >
                {language === "ta" ? "இன்று மழை வருமா?" : "Will it rain today?"}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/chat?q=${encodeURIComponent("Where can I sell my paddy?")}`)}
                className="hover:underline bg-emerald-800/40 px-2 py-0.5 rounded border border-emerald-600/30"
              >
                {language === "ta" ? "நெல் எங்கே விற்கலாம்?" : "Where can I sell paddy?"}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/chat?q=${encodeURIComponent("Need tractor harvester nearby")}`)}
                className="hover:underline bg-emerald-800/40 px-2 py-0.5 rounded border border-emerald-600/30"
              >
                {language === "ta" ? "அறுவடை இயந்திரம் வாடகை" : "Combine harvester rental"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Highlights Row: Weather Advisory & Smart Alerts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Weather Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {profile?.district || "Thanjavur"} {language === "ta" ? "வானிலை" : "Weather"}
                  </h3>
                  <p className="text-[11px] text-stone-500">{t("common.source")}: Open-Meteo</p>
                </div>
              </div>
              <Badge variant="info">
                {language === "ta" ? "நேரடி" : "Live"}
              </Badge>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extrabold text-stone-900">31°C</span>
              <span className="text-xs text-stone-500 font-medium">
                {language === "ta" ? "பகுதி மேகமூட்டம்" : "Partly Cloudy"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 text-xs text-stone-600 mb-3">
              <div>
                <span className="text-[10px] text-stone-400 block">{t("weather.rainProb")}</span>
                <span className="font-semibold text-stone-800">25%</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">{t("weather.humidity")}</span>
                <span className="font-semibold text-stone-800">68%</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">{t("weather.windSpeed")}</span>
                <span className="font-semibold text-stone-800">12 km/h</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                {language === "ta"
                  ? "களப்பணிகள் மற்றும் பாசனத்திற்கு சாதகமான வானிலை."
                  : "Favorable conditions for routine cultivation and intercultural weeding."}
              </span>
            </div>

            <Link
              href="/weather"
              className="mt-3 block text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {language === "ta" ? "முழு 7 நாள் வானிலை பார்க்க →" : "View 7-day detailed weather →"}
            </Link>
          </div>

          {/* Smart Alerts Feed */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">{t("dashboard.smartAlerts")}</h3>
                  <p className="text-[11px] text-stone-500">2 {language === "ta" ? "முக்கிய அறிவிப்புகள்" : "active advisories"}</p>
                </div>
              </div>
              <Link href="/notifications" className="text-xs text-emerald-700 font-semibold hover:underline">
                {t("common.all")}
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                <div className="flex items-center justify-between font-bold text-rose-900 mb-1">
                  <span>{language === "ta" ? "பயிர் காப்பீடு கடைசி நாள்" : "PMFBY Insurance Deadline"}</span>
                  <Badge variant="danger">{language === "ta" ? "அவசரம்" : "Urgent"}</Badge>
                </div>
                <p className="text-rose-800 text-[11px]">
                  {language === "ta"
                    ? "சம்பா நெல் பயிர் காப்பீட்டுக்கு நவம்பர் 30 கடைசி நாள்."
                    : "Last date to enroll Samba paddy crop for crop insurance is Nov 30."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                <div className="flex items-center justify-between font-bold text-blue-900 mb-1">
                  <span>{language === "ta" ? "மழை முன்னெச்சரிக்கை" : "Spraying Advisory"}</span>
                  <Badge variant="info">Advisory</Badge>
                </div>
                <p className="text-blue-800 text-[11px]">
                  {language === "ta"
                    ? "மழை எதிர்பார்க்கப்படுவதால் மருந்து தெளிப்பதை தற்காலிகமாக ஒத்திவைக்கவும்."
                    : "Light rain forecast. Avoid spraying foliar pesticides to prevent chemical runoff."}
                </p>
              </div>
            </div>
          </div>

          {/* AI Recommendations Highlight */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">{t("dashboard.recommendationTitle")}</h3>
                </div>
                <Badge variant="success">
                  {language === "ta" ? "தனிப்பயனாக்கம்" : "Personalized"}
                </Badge>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed mb-3">
                {language === "ta"
                  ? "உங்கள் பகுதியில் தற்போது வண்டல் நிலத்திற்கு நெல் (CR 1009) மற்றும் உளுந்து (VBN 8) பயிரிட உகந்த காலம். சொட்டுநீர் பாசனத்திற்கு 100% அரசு மானியம் கிடைக்கிறது."
                  : "Based on alluvial delta soil conditions, Samba Paddy and Blackgram (VBN 8) show 94% agronomic suitability. Micro-irrigation 100% state subsidy is available."}
              </p>
            </div>

            <Link
              href="/crops"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>{language === "ta" ? "பயிர் பரிந்துரை இயந்திரம்" : "Explore Recommendations"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t("dashboard.quickActions")}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {language === "ta" ? "விவசாயத்திற்கான அனைத்து AI மற்றும் களச் சேவைகள்" : "Comprehensive digital tools designed specifically for farmers"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group relative bg-white rounded-2xl border border-stone-200 p-5 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {action.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>{language === "ta" ? "தொடங்கு" : "Open"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Nearby Markets Net-Profit Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{language === "ta" ? "நிகர வருமானம் = மொத்த மதிப்பு - போக்குவரத்து" : "Estimated Net = Gross Sale - Transport Cost"}</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900">{t("market.title")}</h2>
              <p className="text-xs text-stone-500">
                {language === "ta"
                  ? "அதிக விலையை மட்டும் பார்க்காமல், போக்குவரத்து செலவையும் கணக்கிட்டு உண்மையான லாபத்தை ஒப்பிடுங்கள்."
                  : "Transparent calculations that prevent misleading nominal price comparisons."}
              </p>
            </div>
            <Link
              href="/market"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-auto"
            >
              <span>{language === "ta" ? "அனைத்து சந்தைகள்" : "View All Mandis"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">
                    {language === "ta" ? "தஞ்சாவூர் உழவர் சந்தை" : "Thanjavur Uzhavar Sandhai"}
                  </h4>
                  <p className="text-xs text-stone-500">8.5 km • Paddy (Ponni)</p>
                </div>
                <Badge variant="success">Top Net Value</Badge>
              </div>
              <div className="text-xl font-extrabold text-emerald-800">
                ₹2,450 <span className="text-xs font-normal text-stone-500">/ Quintal</span>
              </div>
              <div className="text-xs text-stone-600 border-t border-emerald-200 pt-2 flex justify-between">
                <span>Net on 10 Quintals:</span>
                <span className="font-bold text-stone-900">₹24,262</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">
                    {language === "ta" ? "கும்பகோணம் ஒழுங்குமுறை கூடம்" : "Kumbakonam Regulated Market"}
                  </h4>
                  <p className="text-xs text-stone-500">34.0 km • Paddy (Ponni)</p>
                </div>
                <Badge variant="neutral">Higher Gross Rate</Badge>
              </div>
              <div className="text-xl font-extrabold text-stone-900">
                ₹2,520 <span className="text-xs font-normal text-stone-500">/ Quintal</span>
              </div>
              <div className="text-xs text-stone-600 border-t border-stone-100 pt-2 flex justify-between">
                <span>Net on 10 Quintals:</span>
                <span className="font-bold text-stone-900">₹24,248</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">
                    {language === "ta" ? "திருச்சி காந்தி மார்க்கெட்" : "Gandhi Market Trichy"}
                  </h4>
                  <p className="text-xs text-stone-500">48.0 km • Tomato</p>
                </div>
                <Badge variant="neutral">Wholesale</Badge>
              </div>
              <div className="text-xl font-extrabold text-stone-900">
                ₹28 <span className="text-xs font-normal text-stone-500">/ Kg</span>
              </div>
              <div className="text-xs text-stone-600 border-t border-stone-100 pt-2 flex justify-between">
                <span>Net on 10 Quintals:</span>
                <span className="font-bold text-stone-900">₹26,656</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {language === "ta" ? "விவசாயிகளுக்கான பாதுகாப்பான AI" : "Safe, Grounded Agriculture AI"}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed max-w-xl">
                {language === "ta"
                  ? "Farmer AI ரகசிய வங்கி தகவல்களையோ அல்லது கடவுச்சொல்லையோ எப்போதும் கேட்காது. வானிலை மற்றும் அரசு திட்டங்கள் அதிகாரப்பூர்வ அரசு இணைப்புகளுடன் இணைக்கப்பட்டுள்ளன."
                  : "We never ask for sensitive bank credentials, UPI pins, or passwords. All government welfare schemes and university advisories link strictly to official public authorities."}
              </p>
            </div>
          </div>
          <Link
            href="/chat"
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm shrink-0 transition-transform hover:scale-105"
          >
            {t("hero.ctaSpeak")}
          </Link>
        </div>
      </section>
    </div>
  );
}
