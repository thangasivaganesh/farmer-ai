"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { TAMIL_NADU_DISTRICTS, WeatherData } from "@/lib/weather/openMeteo";
import { Badge } from "@/components/ui/Badge";
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  RefreshCw,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WeatherPage() {
  const { language, t } = useLanguage();
  const { profile } = useAuth();

  const [selectedDistrict, setSelectedDistrict] = useState(profile?.district || "Thanjavur");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadWeather = async (district: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?district=${encodeURIComponent(district)}`);
      if (res.ok) {
        const data = await res.json();
        setWeatherData(data);
      }
    } catch (e) {
      console.error("Error loading weather data:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadWeather(selectedDistrict);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Page Header with District Selector */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("weather.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("weather.subtitle")}
            </p>
          </div>
        </div>

        {/* Location selector dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-3 pointer-events-none" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="pl-9 pr-8 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {Object.keys(TAMIL_NADU_DISTRICTS).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-emerald-700 transition-colors"
            title="Refresh weather"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {loading && !weatherData ? (
        <div className="py-20 text-center text-sm font-semibold text-stone-400">
          {t("common.loading")}
        </div>
      ) : weatherData ? (
        <>
          {/* Main Current Weather Highlights Card */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info">
                    {weatherData.isCached ? "Cached Mode" : "Live Stream"}
                  </Badge>
                  <span className="text-xs text-blue-200">
                    {weatherData.district}, Tamil Nadu
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-7xl font-black">
                    {weatherData.current.temperature}°C
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-xl font-bold block text-blue-100">
                      {language === "ta" ? weatherData.current.conditionTextTa : weatherData.current.conditionTextEn}
                    </span>
                    <span className="text-xs text-blue-300">
                      {t("weather.feelsLike")}: {weatherData.current.feelsLike}°C
                    </span>
                  </div>
                </div>
              </div>

              {/* Weather metric pills */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
                  <Droplets className="w-5 h-5 mx-auto text-cyan-300 mb-1" />
                  <span className="text-[10px] text-blue-200 block">{t("weather.rainProb")}</span>
                  <span className="text-base font-bold">{weatherData.current.rainProbability}%</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
                  <Wind className="w-5 h-5 mx-auto text-teal-300 mb-1" />
                  <span className="text-[10px] text-blue-200 block">{t("weather.windSpeed")}</span>
                  <span className="text-base font-bold">{weatherData.current.windSpeed} km/h</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
                  <Thermometer className="w-5 h-5 mx-auto text-amber-300 mb-1" />
                  <span className="text-[10px] text-blue-200 block">{t("weather.humidity")}</span>
                  <span className="text-base font-bold">{weatherData.current.humidity}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-blue-300 gap-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {t("common.lastUpdated")}: {weatherData.lastUpdated}
              </span>
              <span>{weatherData.source}</span>
            </div>
          </div>

          {/* Agricultural Advisories Box */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{t("weather.advisoriesTitle")}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weatherData.advisories.map((adv, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                    adv.severity === "alert"
                      ? "bg-rose-50 border-rose-200 text-rose-950"
                      : adv.severity === "warning"
                      ? "bg-amber-50 border-amber-200 text-amber-950"
                      : "bg-emerald-50 border-emerald-200 text-emerald-950"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>{language === "ta" ? adv.titleTa : adv.titleEn}</span>
                    <Badge variant={adv.severity === "alert" ? "danger" : adv.severity === "warning" ? "warning" : "success"}>
                      {adv.type}
                    </Badge>
                  </div>
                  <p className="leading-relaxed text-[11px] opacity-90">
                    {language === "ta" ? adv.descriptionTa : adv.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 24-Hour Temperature & Rain Trend Chart */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{t("weather.hourlyForecast")} (Temperature & Rain %)</span>
              </h3>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherData.hourly}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    name="Temperature (°C)"
                    stroke="#059669"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#tempGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="rainProbability"
                    name="Rain Probability (%)"
                    stroke="#0284c7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#rainGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-Day Extended Forecast Cards */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>{t("weather.weeklyForecast")}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {weatherData.daily.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-center space-y-2 transition-all ${
                    idx === 0
                      ? "bg-emerald-50/70 border-emerald-400 font-bold"
                      : "bg-stone-50 border-stone-200"
                  }`}
                >
                  <span className="text-xs font-bold text-stone-800 block">
                    {language === "ta" ? day.dayNameTa : day.dayNameEn}
                  </span>
                  <CloudSun className="w-6 h-6 mx-auto text-blue-600 my-1" />
                  <div className="text-sm font-extrabold text-stone-900">
                    {day.tempMax}° / {day.tempMin}°
                  </div>
                  <span className="text-[10px] text-blue-700 block font-semibold">
                    💧 {day.rainProbability}%
                  </span>
                  <span className="text-[10px] text-stone-500 line-clamp-1">
                    {language === "ta" ? day.conditionTextTa : day.conditionTextEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
