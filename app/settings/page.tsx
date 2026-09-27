"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import {
  Settings,
  Globe,
  Database,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Heart,
} from "lucide-react";

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-stone-800 text-white flex items-center justify-center shadow-md">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("settings.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("settings.subtitle")}
            </p>
          </div>
        </div>

        <Badge variant="neutral">v1.0.0 Stable</Badge>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                {t("settings.language")}
              </h3>
              <p className="text-xs text-stone-500">
                {language === "ta" ? "பயன்பாட்டின் இடைமுக மொழியை மாற்றவும்" : "Select primary UI language"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLanguage("ta")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === "ta"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              தமிழ் (Tamil)
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Offline Cache Setting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                {t("settings.offlineCache")}
              </h3>
              <p className="text-xs text-stone-500">
                {t("settings.offlineCacheSub")}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={offlineCacheEnabled}
              onChange={(e) => setOfflineCacheEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Privacy & Security */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t("settings.dataPrivacy")}</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t("settings.dataPrivacySub")}
          </p>
        </div>

        {/* System Health Check Link */}
        <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>API Health Status</span>
          </div>
          <Link
            href="/api/health"
            target="_blank"
            className="text-emerald-700 font-bold hover:underline"
          >
            Check /api/health →
          </Link>
        </div>
      </div>
    </div>
  );
}
