"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { TAMIL_NADU_DISTRICTS } from "@/lib/weather/openMeteo";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  MapPin,
  Sprout,
  Droplets,
  Layers,
  Globe,
  Save,
  CheckCircle2,
  ShieldCheck,
  Edit2,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const { language, setLanguage, t } = useLanguage();
  const { profile, updateProfile, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [name, setName] = useState(profile?.farmerName || "Muthukumar S.");
  const [village, setVillage] = useState(profile?.village || "Orathanadu");
  const [district, setDistrict] = useState(profile?.district || "Thanjavur");
  const [landSize, setLandSize] = useState(profile?.landSizeAcres || 3.5);
  const [irrigation, setIrrigation] = useState(profile?.irrigationType || "Borewell + Canal");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      farmerName: name,
      village,
      district,
      landSizeAcres: landSize,
      irrigationType: irrigation,
    });
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-600/20">
            {profile?.farmerName ? profile.farmerName[0] : "F"}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {profile?.farmerName || "Farmer Profile"}
            </h1>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{village}, {district}, Tamil Nadu</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{t("profile.editProfile")}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
            >
              {t("common.cancel")}
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes successfully updated. AI personalization updated.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="font-bold text-base text-stone-900 border-b border-stone-100 pb-3">
          {t("profile.farmDetails")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              {t("auth.fullName")}
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              {t("auth.mobileNumber")}
            </label>
            <input
              type="text"
              disabled
              value={`+91 ${profile?.phone || "9876543210"}`}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-stone-500 font-mono font-bold bg-stone-50"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              {t("auth.village")}
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              {t("auth.district")}
            </label>
            <select
              disabled={!isEditing}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold disabled:bg-stone-50 bg-white"
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
              {t("profile.landAcres")}
            </label>
            <input
              type="number"
              step="0.5"
              disabled={!isEditing}
              value={landSize}
              onChange={(e) => setLandSize(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
              {t("profile.irrigation")}
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={irrigation}
              onChange={(e) => setIrrigation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold disabled:bg-stone-50"
            />
          </div>
        </div>

        {/* Crops badges */}
        <div>
          <label className="block font-bold text-stone-700 uppercase tracking-wider text-xs mb-2">
            {t("profile.registeredCrops")}
          </label>
          <div className="flex flex-wrap gap-2">
            {(profile?.mainCrops || ["Paddy (Ponni)", "Groundnut", "Blackgram"]).map((crop) => (
              <span
                key={crop}
                className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t("profile.saveChanges")}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
