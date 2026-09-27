"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { OFFICIAL_SCHEMES, SchemeItem } from "@/lib/schemes/schemeService";
import { Badge } from "@/components/ui/Badge";
import {
  FileText,
  Search,
  ExternalLink,
  Bell,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function SchemesPage() {
  const { language, t } = useLanguage();
  const [schemes, setSchemes] = useState<SchemeItem[]>(OFFICIAL_SCHEMES);
  const [searchQuery, setSearchQuery] = useState("");
  const [remindersSet, setRemindersSet] = useState<Record<string, boolean>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSchemes(OFFICIAL_SCHEMES);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = OFFICIAL_SCHEMES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameTa.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.descriptionTa.toLowerCase().includes(q)
    );
    setSchemes(filtered);
  };

  const handleSetReminder = async (scheme: SchemeItem) => {
    try {
      await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Apply for ${scheme.name}`,
          category: "SCHEME",
          notes: `Official Link: ${scheme.officialUrl}`,
        }),
      });
      setRemindersSet((prev) => ({ ...prev, [scheme.id]: true }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("schemes.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("schemes.subtitle")}
            </p>
          </div>
        </div>

        <Badge variant="success">Official Portals Only</Badge>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("schemes.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t("common.search")}
          </button>
        </form>
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="success">{scheme.status}</Badge>
                  <span className="text-[11px] text-stone-400 font-semibold">
                    {language === "ta" ? scheme.departmentTa : scheme.department}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  {language === "ta" ? scheme.nameTa : scheme.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSetReminder(scheme)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    remindersSet[scheme.id]
                      ? "bg-emerald-100 text-emerald-800"
                      : "border border-stone-200 hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  {remindersSet[scheme.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{t("common.reminderSet")}</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-stone-500" />
                      <span>{t("common.setReminder")}</span>
                    </>
                  )}
                </button>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>{t("schemes.applyNow")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {language === "ta" ? scheme.descriptionTa : scheme.description}
            </p>

            {/* Grid of Eligibility & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 uppercase tracking-wide text-[11px]">
                  {t("schemes.eligibility")}
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
                  {(language === "ta" ? scheme.eligibilityTa : scheme.eligibility).map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-950 uppercase tracking-wide text-[11px]">
                  {t("schemes.benefits")}
                </h4>
                <p className="font-semibold text-emerald-900 text-xs leading-relaxed">
                  {language === "ta" ? scheme.benefitsTa : scheme.benefits}
                </p>
                <div className="pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-800">
                  <span className="font-bold block mb-1">{t("schemes.documents")}:</span>
                  <span>{(language === "ta" ? scheme.documentsTa : scheme.documents).join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 border-t border-stone-100 gap-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <strong>{t("schemes.deadline")}:</strong> {scheme.deadline}
              </span>
              <span>{t("schemes.officialSource")}: {scheme.officialSource}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
