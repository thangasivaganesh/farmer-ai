"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { OFFICIAL_SCHOLARSHIPS, ScholarshipItem } from "@/lib/scholarships/scholarshipService";
import { Badge } from "@/components/ui/Badge";
import {
  GraduationCap,
  ExternalLink,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export default function ScholarshipsPage() {
  const { language, t } = useLanguage();
  const [level, setLevel] = useState("all");
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>(OFFICIAL_SCHOLARSHIPS);
  const [remindersSet, setRemindersSet] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (level === "all") {
      setScholarships(OFFICIAL_SCHOLARSHIPS);
    } else {
      setScholarships(OFFICIAL_SCHOLARSHIPS.filter((s) => s.educationLevel.toLowerCase() === level.toLowerCase()));
    }
  }, [level]);

  const handleSetReminder = async (item: ScholarshipItem) => {
    try {
      await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Apply for ${item.name}`,
          category: "SCHOLARSHIP",
          notes: `Official Link: ${item.officialUrl}`,
        }),
      });
      setRemindersSet((prev) => ({ ...prev, [item.id]: true }));
    } catch (e) {
      console.error(e);
    }
  };

  const levels = [
    { id: "all", nameEn: t("scholarships.allLevels"), nameTa: "அனைத்தும்" },
    { id: "Undergraduate", nameEn: t("scholarships.ug"), nameTa: "இளங்கலை" },
    { id: "Higher Secondary", nameEn: t("scholarships.school"), nameTa: "மேல்நிலைப்பள்ளி" },
    { id: "Diploma", nameEn: t("scholarships.diploma"), nameTa: "டிப்ளமோ" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("scholarships.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("scholarships.subtitle")}
            </p>
          </div>
        </div>

        <Badge variant="info">Higher Education Aid</Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            type="button"
            onClick={() => setLevel(lvl.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              level === lvl.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            {language === "ta" ? lvl.nameTa : lvl.nameEn}
          </button>
        ))}
      </div>

      {/* Scholarships List */}
      <div className="space-y-6">
        {scholarships.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="info">
                    {language === "ta" ? sch.educationLevelTa : sch.educationLevel}
                  </Badge>
                  <span className="text-[11px] text-stone-400 font-semibold">
                    {language === "ta" ? sch.providerTa : sch.provider}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  {language === "ta" ? sch.nameTa : sch.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSetReminder(sch)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    remindersSet[sch.id]
                      ? "bg-emerald-100 text-emerald-800"
                      : "border border-stone-200 hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  {remindersSet[sch.id] ? (
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
                  href={sch.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>{t("common.openOfficial")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 uppercase tracking-wide text-[11px]">
                  {t("scholarships.eligibility")}
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
                  {(language === "ta" ? sch.eligibilityTa : sch.eligibility).map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-2">
                <h4 className="font-bold text-sky-950 uppercase tracking-wide text-[11px]">
                  {t("scholarships.benefits")}
                </h4>
                <p className="font-semibold text-sky-900 text-xs">
                  {language === "ta" ? sch.benefitsTa : sch.benefits}
                </p>
                <div className="pt-2 border-t border-sky-200/60 text-[11px] text-sky-900">
                  <span className="font-bold block mb-1">{t("scholarships.documents")}:</span>
                  <span>{(language === "ta" ? sch.documentsTa : sch.documents).join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 border-t border-stone-100 gap-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <strong>{t("scholarships.deadline")}:</strong> {sch.deadline}
              </span>
              <span>{t("common.source")}: {sch.officialSource}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
