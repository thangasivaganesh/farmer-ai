"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth, FarmerProfileData } from "@/lib/auth/AuthContext";
import { TAMIL_NADU_DISTRICTS } from "@/lib/weather/openMeteo";
import {
  Sprout,
  User,
  MapPin,
  Trees,
  Droplets,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function OnboardingContent() {
  const { language, t } = useLanguage();
  const { completeOnboarding } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneParam = searchParams.get("phone") || "9876543210";

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const [formData, setFormData] = useState<FarmerProfileData>({
    phone: phoneParam,
    farmerName: "",
    village: "",
    district: "Thanjavur",
    state: "Tamil Nadu",
    mainCrops: ["Paddy (Ponni)"],
    landSizeAcres: 3.5,
    irrigationType: "Borewell + Canal",
    preferredLang: language,
    locationConsent: true,
  });

  const availableCrops = [
    "Paddy (Ponni)",
    "Paddy (CR 1009)",
    "Groundnut",
    "Sugarcane",
    "Blackgram",
    "Cotton",
    "Tomato",
    "Brinjal / Eggplant",
    "Banana",
    "Coconut",
    "Maize",
  ];

  const irrigationOptions = [
    "Canal Irrigation (வாய்க்கால் பாசனம்)",
    "Borewell + Open Well (ஆழ்துளைக் கிணறு)",
    "Drip Irrigation (சொட்டுநீர் பாசனம்)",
    "Sprinkler Irrigation (தெளிப்புநீர் பாசனம்)",
    "Rainfed / Dryland (மானாவாரி / மழை சார்ந்த நிலம்)",
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    await completeOnboarding(formData);
    router.push("/dashboard");
  };

  const toggleCrop = (crop: string) => {
    if (formData.mainCrops.includes(crop)) {
      setFormData({
        ...formData,
        mainCrops: formData.mainCrops.filter((c) => c !== crop),
      });
    } else {
      setFormData({
        ...formData,
        mainCrops: [...formData.mainCrops, crop],
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">{t("auth.onboardingTitle")}</h2>
              <p className="text-[11px] text-stone-500">
                {t("auth.step")} {currentStep} {t("auth.of")} {totalSteps}
              </p>
            </div>
          </div>

          <div className="w-24 bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="min-h-[220px] flex flex-col justify-center">
          {/* Step 1: Mobile verification status */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">
                {language === "ta" ? "சரிபார்க்கப்பட்ட மொபைல் எண்" : "Verified Mobile Number"}
              </h3>
              <p className="text-xs text-stone-500">
                {language === "ta"
                  ? "உங்கள் மொபைல் எண் வெற்றிகரமாக சரிபார்க்கப்பட்டது."
                  : "Your mobile number has been authenticated."}
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-900 text-lg">+91 {formData.phone}</span>
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          )}

          {/* Step 2: Farmer Name */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.fullName")}
              </label>
              <p className="text-xs text-stone-500">
                {language === "ta" ? "உங்கள் பெயர் அல்லது விவசாயக் குடும்பப் பெயர்" : "Enter your full name for personalized greetings"}
              </p>
              <div className="relative">
                <User className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  placeholder={language === "ta" ? "எ.கா: முத்துகுமார்" : "e.g., Muthukumar S."}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 3: Village */}
          {currentStep === 3 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.village")}
              </label>
              <p className="text-xs text-stone-500">
                {language === "ta" ? "உங்கள் கிராமம் அல்லது பஞ்சாயத்து" : "Your village or revenue town"}
              </p>
              <div className="relative">
                <MapPin className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder={language === "ta" ? "எ.கா: ஒரத்தநாடு" : "e.g., Orathanadu"}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 4: District */}
          {currentStep === 4 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.district")}
              </label>
              <p className="text-xs text-stone-500">
                {language === "ta" ? "துல்லியமான வானிலை மற்றும் சந்தை விலைக்கு மாவட்டத்தைத் தேர்ந்தெடுக்கவும்" : "Select your district for hyper-local weather and APMC mandis"}
              </p>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {Object.keys(TAMIL_NADU_DISTRICTS).map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 5: State */}
          {currentStep === 5 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.state")}
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-semibold bg-stone-50"
              />
            </div>
          )}

          {/* Step 6: Main Crops */}
          {currentStep === 6 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.mainCrops")}
              </label>
              <p className="text-xs text-stone-500">
                {language === "ta" ? "நீங்கள் பயிரிடும் பயிர்களைத் தேர்ந்தெடுக்கவும் (ஒன்றுக்கும் மேற்பட்டவை தேர்வு செய்யலாம்)" : "Select all crops grown on your farm"}
              </p>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                {availableCrops.map((crop) => {
                  const isSelected = formData.mainCrops.includes(crop);
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-white text-stone-700 border-stone-200 hover:border-emerald-300"
                      }`}
                    >
                      {crop}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 7: Land Size */}
          {currentStep === 7 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.landSize")}
              </label>
              <p className="text-xs text-stone-500">
                {language === "ta" ? "உர அளவு மற்றும் இயந்திரத் தேவையை கணக்கிட உதவும்" : "Helps calculate fertilizer doses and machinery hiring time"}
              </p>
              <div className="relative">
                <Layers className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  step="0.5"
                  min="0.1"
                  value={formData.landSizeAcres || 3.5}
                  onChange={(e) => setFormData({ ...formData, landSizeAcres: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Step 8: Irrigation Type */}
          {currentStep === 8 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-stone-900">
                {t("auth.irrigationType")}
              </label>
              <div className="space-y-2">
                {irrigationOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.irrigationType === opt
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="irrigation"
                      checked={formData.irrigationType === opt}
                      onChange={() => setFormData({ ...formData, irrigationType: opt })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 9: Location Permission */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">
                {language === "ta" ? "இருப்பிட அனுமதி (விருப்பமானது)" : "Location Services (Optional)"}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t("auth.locationConsent")}
              </p>

              <label className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.locationConsent}
                  onChange={(e) => setFormData({ ...formData, locationConsent: e.target.checked })}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-stone-800">
                  {language === "ta"
                    ? "ஆட்டோமேட்டிக் வானிலை மற்றும் அருகிலுள்ள உழவர் சந்தையைக் கணக்கிட இருப்பிட அனுமதியை வழங்குகிறேன்."
                    : "Enable device location for automated weather updates and nearest mandi distance calculations."}
                </span>
              </label>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>We only store district-level coordinates necessary for farming services.</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("common.back")}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>{currentStep === totalSteps ? t("auth.completeSetup") : t("common.next")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-sm font-semibold text-emerald-800">Loading profile setup...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
