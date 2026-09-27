"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { INITIAL_NOTIFICATIONS, FarmNotification, NotificationCategory } from "@/lib/notifications/notificationService";
import { Badge } from "@/components/ui/Badge";
import {
  Bell,
  CheckCheck,
  ArrowRight,
  SlidersHorizontal,
  CloudRain,
  Flame,
  Droplets,
  Bug,
  Sprout,
  TrendingUp,
  Tractor,
  FileText,
  GraduationCap,
  Calendar,
} from "lucide-react";

export default function NotificationsPage() {
  const { language, t } = useLanguage();
  const [notifications, setNotifications] = useState<FarmNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState({
    rain: true,
    heat: true,
    market: true,
    schemes: true,
    machinery: true,
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const categories = [
    { id: "ALL", label: t("common.all") },
    { id: "RAIN", label: "🌧️ Rain" },
    { id: "SCHEME", label: "🏛️ Scheme" },
    { id: "MARKET", label: "💰 Market" },
    { id: "MACHINERY", label: "🚜 Machinery" },
  ];

  const filtered = activeCategory === "ALL"
    ? notifications
    : notifications.filter((n) => n.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {t("notifications.title")}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t("notifications.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t("notifications.preferences")}</span>
          </button>

          <button
            type="button"
            onClick={markAllRead}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t("notifications.markAllRead")}</span>
          </button>
        </div>
      </div>

      {/* Preferences Drawer */}
      {showPreferences && (
        <div className="bg-white rounded-3xl border border-emerald-300 p-6 shadow-sm space-y-4 animate-in fade-in">
          <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <span>{language === "ta" ? "எச்சரிக்கை விருப்பங்கள்" : "Notification Category Controls"}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.rain}
                onChange={(e) => setPreferences({ ...preferences, rain: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-stone-800">{t("notifications.rainAlerts")}</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.market}
                onChange={(e) => setPreferences({ ...preferences, market: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-stone-800">{t("notifications.marketAlerts")}</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.schemes}
                onChange={(e) => setPreferences({ ...preferences, schemes: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-stone-800">{t("notifications.schemeAlerts")}</span>
            </label>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-xs text-stone-400">
            {t("notifications.noNotifications")}
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !item.isRead ? "border-emerald-300 bg-emerald-50/20" : "border-stone-200"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      item.priority === "URGENT"
                        ? "danger"
                        : item.priority === "HIGH"
                        ? "warning"
                        : "info"
                    }
                  >
                    {item.priority}
                  </Badge>
                  <span className="text-[11px] text-stone-400 font-semibold">{item.timestamp}</span>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-stone-900">
                  {language === "ta" ? item.titleTa : item.titleEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                  {language === "ta" ? item.descriptionTa : item.descriptionEn}
                </p>
              </div>

              {item.actionUrl && (
                <Link
                  href={item.actionUrl}
                  className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-center flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>{language === "ta" ? item.actionTextTa : item.actionTextEn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
