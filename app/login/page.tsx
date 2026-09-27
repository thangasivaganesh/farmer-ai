"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Sprout, Phone, KeyRound, ArrowRight, ShieldCheck, Globe, CheckCircle2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { language, setLanguage, t } = useLanguage();
  const { loginWithPhone, verifyOtp } = useAuth();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successNotice, setSuccessNotice] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (phone.length < 10) {
      setErrorMsg(language === "ta" ? "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்." : "Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    const res = await loginWithPhone(phone);
    setLoading(false);
    if (res.success) {
      setSuccessNotice(res.message);
      setStep("otp");
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (otp.length < 6) {
      setErrorMsg(language === "ta" ? "6 இலக்க குறியீட்டை உள்ளிடவும்." : "Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);
    const res = await verifyOtp(phone, otp);
    setLoading(false);

    if (res.success) {
      if (res.isNewUser) {
        router.push(`/onboarding?phone=${encodeURIComponent(phone)}`);
      } else {
        router.push("/dashboard");
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative leaf banner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/10 pointer-events-none" />

        {/* Language switch button at top right */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <span>Farmer AI</span>
          </Link>

          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-stone-200 text-xs font-semibold text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "en" ? "தமிழ்" : "English"}</span>
          </button>
        </div>

        {/* Heading */}
        <div className="space-y-1 mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            {t("auth.loginTitle")}
          </h1>
          <p className="text-xs text-stone-500">
            {step === "phone" ? t("auth.loginSubtitle") : `${phone} எண்ணிற்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்`}
          </p>
        </div>

        {/* Alerts / Error messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Dev Mock Mode Notice */}
        <div className="mb-6 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
          <span className="font-bold text-amber-900">DEV MODE:</span>
          <span>{t("auth.mockOtpNotice")}</span>
        </div>

        {/* Phone Step */}
        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t("auth.mobileNumber")}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-stone-400 font-semibold text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder={t("auth.mobilePlaceholder")}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 tracking-wider"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? t("common.loading") : t("auth.sendOtp")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* OTP Step */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t("auth.enterOtp")}
                </label>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-xs text-emerald-700 hover:underline"
                >
                  {language === "ta" ? "எண் மாற்று" : "Change Number"}
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder={t("auth.otpPlaceholder")}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-center font-mono font-bold text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? t("common.loading") : t("auth.verifyOtp")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOtp("123456");
              }}
              className="w-full text-center text-xs text-stone-500 hover:text-emerald-700 py-1"
            >
              {language === "ta" ? "தானியங்கு நிரப்பு: 123456" : "Auto-fill demo code: 123456"}
            </button>
          </form>
        )}

        {/* Trust & Privacy Notice */}
        <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>No bank passwords or UPI PINs ever requested</span>
        </div>
      </div>
    </div>
  );
}
