"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { TAMIL_NADU_DISTRICTS } from "@/lib/weather/openMeteo";
import { MarketCalculationResult } from "@/lib/markets/marketService";
import { Badge } from "@/components/ui/Badge";
import {
  TrendingUp,
  Truck,
  MapPin,
  Phone,
  Info,
  DollarSign,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function MarketPage() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState("Paddy (Ponni)");
  const [district, setDistrict] = useState(profile?.district || "Thanjavur");
  const [quantity, setQuantity] = useState<number>(10);
  const [markets, setMarkets] = useState<MarketCalculationResult[]>([]);
  const [loading, setLoading] = useState(true);

  const availableCrops = [
    "Paddy (Ponni)",
    "Paddy (CR 1009)",
    "Tomato",
    "Groundnut",
    "Sugarcane",
    "Coconut",
    "Blackgram",
    "Maize",
  ];

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/markets?crop=${encodeURIComponent(selectedCrop)}&district=${encodeURIComponent(
          district
        )}&quantity=${quantity}`
      );
      if (res.ok) {
        const data = await res.json();
        setMarkets(data);
      }
    } catch (e) {
      console.error("Error fetching market data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, [selectedCrop, district, quantity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("market.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("market.subtitle")}
            </p>
          </div>
        </div>

        <Badge variant="warning">{t("common.demo")}</Badge>
      </div>

      {/* Transparent Calculation Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-300">
            Transparent Profit Formula
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {language === "ta"
              ? "நிகர வருமானம் = மொத்த மதிப்பு - போக்குவரத்துச் செலவு"
              : "Estimated Net Amount = Gross Sale - Estimated Transport Cost"}
          </h3>
          <p className="text-xs text-emerald-100/80 max-w-2xl">
            {t("market.formulaExplainer")}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs text-emerald-200 shrink-0">
          Logistics Benchmark: ~₹14/km
        </div>
      </div>

      {/* Filter / Selector Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              {t("market.selectCrop")}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {availableCrops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              {t("market.quantityQuintals")}
            </label>
            <input
              type="number"
              min="1"
              max="500"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 font-semibold focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              {t("market.location")}
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
        </div>
      </div>

      {/* Markets Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            {language === "ta" ? "கணக்கிடப்பட்ட சந்தை வாய்ப்புகள்" : "Evaluated Market Outlets"} ({markets.length})
          </h2>
          <span className="text-xs text-stone-500">
            For {quantity} Quintals of {selectedCrop}
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm font-semibold text-stone-400">
            {t("common.loading")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((m, idx) => (
              <div
                key={m.id}
                className={`bg-white rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                  idx === 0 ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-stone-200"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-extrabold text-base text-stone-900">
                        {language === "ta" ? m.marketNameTa : m.marketName}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{m.district} • {m.distanceKm} km distance</span>
                      </p>
                    </div>

                    {idx === 0 ? (
                      <Badge variant="success">Best Net</Badge>
                    ) : (
                      <Badge variant="neutral">{m.status}</Badge>
                    )}
                  </div>

                  {/* Nominal Price Display */}
                  <div className="my-3 p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                        Quoted Price
                      </span>
                      <span className="text-xl font-black text-stone-900">
                        ₹{m.pricePerUnit.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-stone-500"> / {m.unit}</span>
                    </div>

                    <span className="text-[10px] text-stone-400 text-right block">
                      {m.source}
                    </span>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="space-y-1.5 text-xs border-t border-stone-100 pt-3">
                    <div className="flex justify-between text-stone-600">
                      <span>{t("market.grossValue")}:</span>
                      <span className="font-semibold text-stone-900">
                        ₹{m.estimatedGrossValue.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between text-rose-700">
                      <span>{t("market.transportCost")} ({m.distanceKm} km):</span>
                      <span className="font-semibold">
                        - ₹{m.estimatedTransportCost.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-sm">
                      <span className="font-bold text-stone-900">{t("market.netValue")}:</span>
                      <span className="text-lg font-black text-emerald-700">
                        ₹{m.estimatedNetTakeHome.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs text-stone-500">
                  <a
                    href={`tel:${m.contactPhone}`}
                    className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{m.contactPhone}</span>
                  </a>
                  <span className="text-[10px] text-stone-400">{m.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
