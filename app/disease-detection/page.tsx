"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import {
  ScanLine,
  UploadCloud,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Info,
  X,
} from "lucide-react";

export default function DiseaseDetectionPage() {
  const { language, t } = useLanguage();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMsg("Please upload a valid JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB limit. Please upload a smaller photo.");
      return;
    }

    setErrorMsg(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    setAnalyzing(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/ai/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: "image/jpeg",
        }),
      });

      if (!res.ok) {
        throw new Error("Analysis failed");
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      setErrorMsg(
        language === "ta"
          ? "பயிர் நோய் ஆய்வு தோல்வியடைந்தது. தெளிவான புகைப்படத்தை பதிவேற்றி மீண்டும் முயற்சிக்கவும்."
          : "Plant pathology scan failed. Please ensure the photo has good lighting and retry."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <ScanLine className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {t("disease.title")}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
                {t("disease.subtitle")}
              </p>
            </div>
          </div>

          <Badge variant="warning">{language === "ta" ? "AI ஆய்வு" : "AI-Assisted"}</Badge>
        </div>
      </div>

      {/* Main Upload Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Column */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-bold text-base text-stone-900">
              {language === "ta" ? "பயிர் புகைப்படத்தை பதிவேற்றவும்" : "Upload Affected Crop Photo"}
            </h2>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-3xl p-8 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-emerald-50/30 flex flex-col items-center justify-center min-h-[260px] space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                  <UploadCloud className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    {t("disease.dragDrop")}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {t("disease.supportedFormats")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 min-h-[260px] flex items-center justify-center">
                {/* Image Preview */}
                <img
                  src={imagePreview}
                  alt="Affected leaf preview"
                  className="max-h-[320px] w-auto object-contain rounded-xl"
                />

                <button
                  type="button"
                  onClick={resetUpload}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hidden file & camera inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-400 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-50 transition-colors"
              >
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>{t("disease.takePhoto")}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-400 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-50 transition-colors"
              >
                <UploadCloud className="w-4 h-4 text-emerald-700" />
                <span>{t("disease.browse")}</span>
              </button>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!imagePreview || analyzing}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t("disease.analyzing")}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t("disease.analyzeButton")}</span>
              </>
            )}
          </button>
        </div>

        {/* Results Column */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
              <h2 className="font-bold text-base text-stone-900">
                {t("disease.resultsTitle")}
              </h2>
              {analysisResult && (
                <Badge
                  variant={
                    analysisResult.confidence === "HIGH"
                      ? "success"
                      : analysisResult.confidence === "MEDIUM"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {analysisResult.confidence} Confidence
                </Badge>
              )}
            </div>

            {!analysisResult && !analyzing && (
              <div className="py-16 text-center text-stone-400 space-y-2">
                <ScanLine className="w-12 h-12 mx-auto stroke-1 text-stone-300" />
                <p className="text-xs">
                  {language === "ta"
                    ? "இலையின் புகைப்படத்தை பதிவேற்றி 'ஆய்வு செய்' பட்டனை அழுத்தவும்."
                    : "Upload a clear image of the affected plant and click analyze."}
                </p>
              </div>
            )}

            {analyzing && (
              <div className="py-16 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-stone-600">
                  {language === "ta" ? "AI மாதிரி இலை புள்ளிகளை ஆய்வு செய்கிறது..." : "Analyzing visual lesions, chlorosis, and pathology markers..."}
                </p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-4 text-xs">
                {/* Disease Name Card */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <span className="text-[10px] text-amber-800 uppercase tracking-wider font-bold block mb-1">
                    {t("disease.possibleIssue")}
                  </span>
                  <h3 className="text-base font-extrabold text-amber-950">
                    {language === "ta" ? analysisResult.possibleDiseaseTa : analysisResult.possibleDisease}
                  </h3>
                  <span className="text-xs text-amber-900/80 font-medium">
                    Crop: {analysisResult.cropName}
                  </span>
                </div>

                {/* Visible Symptoms */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wide">
                    {t("disease.symptoms")}
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    {(language === "ta" ? analysisResult.symptomsTa : analysisResult.symptoms).map(
                      (s: string, idx: number) => (
                        <li key={idx}>{s}</li>
                      )
                    )}
                  </ul>
                </div>

                {/* Causes */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wide">
                    {t("disease.causes")}
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    {(language === "ta" ? analysisResult.causesTa : analysisResult.causes).map(
                      (c: string, idx: number) => (
                        <li key={idx}>{c}</li>
                      )
                    )}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{t("disease.nextSteps")}</span>
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-emerald-900 text-[11px]">
                    {(language === "ta" ? analysisResult.nextStepsTa : analysisResult.nextSteps).map(
                      (act: string, idx: number) => (
                        <li key={idx}>{act}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Expert Safety Notice */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-start gap-2 text-[11px] text-stone-500">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t("disease.expertNotice")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
