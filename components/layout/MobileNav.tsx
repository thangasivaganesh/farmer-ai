"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Sprout, TrendingUp, Sparkles, User, Home } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const items = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/crops", label: t("nav.crops"), icon: Sprout },
    { href: "/chat", label: "AI", icon: Sparkles, highlight: true },
    { href: "/market", label: t("nav.market"), icon: TrendingUp },
    { href: "/profile", label: t("nav.profile"), icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-stone-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5 group"
                aria-label="Ask Farmer AI"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-tr from-emerald-700 to-emerald-500 ring-4 ring-emerald-100"
                      : "bg-emerald-600 shadow-emerald-600/30"
                  }`}
                >
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-emerald-700 font-bold"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-emerald-700 stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
