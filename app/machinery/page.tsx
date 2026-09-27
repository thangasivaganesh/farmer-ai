"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { MACHINERY_CATEGORIES, MachineryItem } from "@/lib/machinery/machineryService";
import { TAMIL_NADU_DISTRICTS } from "@/lib/weather/openMeteo";
import { Badge } from "@/components/ui/Badge";
import {
  Tractor,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  X,
  Send,
  Filter,
} from "lucide-react";

export default function MachineryPage() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();

  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");
  const [machineryList, setMachineryList] = useState<MachineryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [selectedMachine, setSelectedMachine] = useState<MachineryItem | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHours, setBookingHours] = useState(4);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchMachinery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/machinery?category=${category}&district=${district}`);
      if (res.ok) {
        const data = await res.json();
        setMachineryList(data);
      }
    } catch (e) {
      console.error("Error fetching machinery:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachinery();
  }, [category, district]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMachine(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
            <Tractor className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("machinery.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("machinery.subtitle")}
            </p>
          </div>
        </div>

        <Badge variant="neutral">Custom Hiring Centers</Badge>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              {t("machinery.category")}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {MACHINERY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {language === "ta" ? cat.nameTa : cat.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              {t("auth.district")}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="all">All Districts (அனைத்து மாவட்டங்கள்)</option>
              {Object.keys(TAMIL_NADU_DISTRICTS).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Machinery Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            {language === "ta" ? "கிடைக்கும் விவசாய உபகரணங்கள்" : "Available Equipment"} ({machineryList.length})
          </h2>
          <span className="text-xs text-stone-500">
            Direct farmer-to-farmer & CHC hiring
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm font-semibold text-stone-400">
            {t("common.loading")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machineryList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-extrabold text-base text-stone-900">
                        {language === "ta" ? item.nameTa : item.name}
                      </h3>
                      <span className="text-xs text-emerald-800 font-semibold block">
                        {language === "ta" ? item.categoryTa : item.category}
                      </span>
                    </div>

                    <Badge variant={item.isAvailable ? "success" : "warning"}>
                      {item.isAvailable ? t("machinery.available") : t("machinery.booked")}
                    </Badge>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed mb-3">
                    {item.specs}
                  </p>

                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs mb-3">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                        {t("machinery.hourlyRate")}
                      </span>
                      <span className="text-base font-extrabold text-stone-900">
                        ₹{item.hourlyRate}/hr
                      </span>
                    </div>

                    {item.dailyRate && (
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                          {t("machinery.dailyRate")}
                        </span>
                        <span className="text-sm font-bold text-stone-700">
                          ₹{item.dailyRate}/day
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.district} • {item.distanceKm} km away</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.providerName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex gap-2">
                  <a
                    href={`tel:${item.providerPhone}`}
                    className="flex-1 py-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Call Owner</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMachine(item);
                      setBookingDate(new Date().toISOString().split("T")[0]);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>{t("machinery.requestRental")}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedMachine && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedMachine(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                Rental Request
              </span>
              <h3 className="text-lg font-black text-stone-900">
                {language === "ta" ? selectedMachine.nameTa : selectedMachine.name}
              </h3>
              <p className="text-xs text-stone-500">
                Provider: {selectedMachine.providerName}
              </p>
            </div>

            {bookingSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold">{t("machinery.bookingSuccess")}</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Requested Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Estimated Duration (Hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={bookingHours}
                    onChange={(e) => setBookingHours(parseInt(e.target.value) || 4)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-semibold"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex justify-between items-center text-xs">
                  <span>Estimated Total (₹{selectedMachine.hourlyRate} x {bookingHours} hrs):</span>
                  <span className="font-extrabold text-sm text-stone-900">
                    ₹{(selectedMachine.hourlyRate || 800) * bookingHours}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request to Owner</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
