"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { TAMIL_NADU_DISTRICTS } from "@/lib/weather/openMeteo";
import { KNOWN_CROPS_DATABASE, recommendCrops, RecommendedCrop } from "@/lib/crops/cropEngine";
import { Badge } from "@/components/ui/Badge";
import {
  Sprout,
  Droplets,
  Calendar,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";

export default function CropsPage() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();
  const router = useRouter();

  const [district, setDistrict] = useState(profile?.district || "Thanjavur");
  const [season, setSeason] = useState("Samba");
  const [soilType, setSoilType] = useState("Alluvial Clay Loam");
  const [soilPh, setSoilPh] = useState<number | undefined>(6.8);
  const [waterAvail, setWaterAvail] = useState<"High" | "Medium" | "Low">("High");
  const [landAcres, setLandAcres] = useState(profile?.landSizeAcres || 3.5);
  const [prevCrop, setPrevCrop] = useState("Paddy");

  const [recommendations, setRecommendations] = useState<RecommendedCrop[]>(KNOWN_CROPS_DATABASE);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const results = recommendCrops({
        district,
        season,
        soilType,
        soilPh,
        waterAvailability: waterAvail,
        landSizeAcres: landAcres,
        previousCrop: prevCrop,
      });
      setRecommendations(results);
      setLoading(false);
    }, 400);
  };

  const askAiWhy = (cropName: string) => {
    const q = language === "ta"
      ? `என் ${district} மாவட்ட நிலத்திற்கு ${cropName} பயிர் ஏன் பரிந்துரைக்கப்பட்டது? முழு விளக்கம் தரவும்.`
      : `Why is ${cropName} suitable for my ${district} farm with ${soilType} and ${waterAvail} water availability?`;
    router.push(`/chat?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("crops.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("crops.subtitle")}
            </p>
          </div>
        </div>

        <Badge variant="success">Agronomic Engine</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Inputs Sidebar */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 h-fit">
          <h2 className="font-bold text-base text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>{t("crops.formTitle")}</span>
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t("auth.district")}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {Object.keys(TAMIL_NADU_DISTRICTS).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t("crops.season")}
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Kuruvai">Kuruvai / Kharif (June - Sept)</option>
                <option value="Samba">Samba / Thaladi (Aug - Jan)</option>
                <option value="Navarai">Navarai / Rabi (Dec - April)</option>
                <option value="Summer">Summer / Zaid (Feb - May)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t("crops.soilType")}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Alluvial Clay Loam">Alluvial Clay Loam (வண்டல் களிமண்)</option>
                <option value="Red Sandy Loam">Red Sandy Loam (செம்மண் / செம்பொறை)</option>
                <option value="Black Cotton Soil">Black Cotton Soil (கரிசல் மண்)</option>
                <option value="Coastal Sandy">Coastal Sandy Soil (மணற்பாங்கான நிலம்)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t("crops.waterAvail")}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["High", "Medium", "Low"] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWaterAvail(w)}
                    className={`py-2 rounded-xl border font-bold text-center transition-all ${
                      waterAvail === w
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  {t("crops.soilPh")}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={soilPh || 6.8}
                  onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  {t("crops.landAcres")}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={landAcres}
                  onChange={(e) => setLandAcres(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? t("common.loading") : t("crops.getRecommendation")}</span>
            </button>
          </form>
        </div>

        {/* Recommendations Result Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {t("crops.resultsTitle")} ({recommendations.length})
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Soil: {soilType} • Water: {waterAvail}
            </span>
          </div>

          <div className="space-y-4">
            {recommendations.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-stone-900">
                      {language === "ta" ? crop.cropNameTa : crop.cropNameEn}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Varieties: {crop.varietySuggestions.join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="success">
                      {crop.suitabilityScore}% Match
                    </Badge>
                    <button
                      type="button"
                      onClick={() => askAiWhy(crop.cropNameEn)}
                      className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t("crops.askWhy")}</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-bold block mb-0.5">
                    {t("crops.suitability")}:
                  </strong>
                  {language === "ta" ? crop.suitabilityReasonTa : crop.suitabilityReasonEn}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-semibold uppercase tracking-wider">
                      {t("crops.waterNeed")}
                    </span>
                    <span className="font-bold text-stone-900">
                      {language === "ta" ? crop.waterRequirementTa : crop.waterRequirement}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-400 block font-semibold uppercase tracking-wider">
                      {t("crops.duration")}
                    </span>
                    <span className="font-bold text-stone-900">
                      {language === "ta" ? crop.growingDurationTa : crop.growingDurationDays}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-stone-400 block font-semibold uppercase tracking-wider">
                      Irrigation Plan
                    </span>
                    <span className="font-medium text-stone-800 text-[11px] line-clamp-2">
                      {language === "ta" ? crop.irrigationScheduleTa : crop.irrigationScheduleEn}
                    </span>
                  </div>
                </div>

                {/* Risk Notice */}
                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block text-[11px] uppercase tracking-wide">
                      {t("crops.riskFactors")}
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      {language === "ta" ? crop.riskFactorsTa : crop.riskFactorsEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
