"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  Sprout,
  CloudSun,
  TrendingUp,
  Tractor,
  FileText,
  GraduationCap,
  Sparkles,
  Bell,
  User,
  Globe,
  Menu,
  X,
  ScanLine,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { profile, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Sprout },
    { href: "/dashboard", label: t("nav.dashboard"), icon: Sparkles },
    { href: "/crops", label: t("nav.crops"), icon: Sprout },
    { href: "/disease-detection", label: t("nav.disease"), icon: ScanLine },
    { href: "/machinery", label: t("nav.machinery"), icon: Tractor },
    { href: "/market", label: t("nav.market"), icon: TrendingUp },
    { href: "/weather", label: t("nav.weather"), icon: CloudSun },
    { href: "/schemes", label: t("nav.schemes"), icon: FileText },
    { href: "/scholarships", label: t("nav.scholarships"), icon: GraduationCap },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 flex items-center gap-1.5">
                Farmer AI
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {language === "ta" ? "விவசாயம்" : "Agri AI"}
                </span>
              </span>
              <p className="text-[11px] text-stone-500 hidden sm:block font-medium">
                {language === "ta" ? "உங்கள் விவசாயத்திற்கு AI துணை" : "Intelligent Farming Platform"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 font-semibold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-700" : "text-stone-500"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Toggle, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-emerald-500 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === "en" ? "தமிழ்" : "English"}</span>
            </button>

            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            </Link>

            {/* Farmer Profile / Login Pill */}
            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-stone-800 hidden sm:inline max-w-[100px] truncate">
                {profile?.farmerName || (language === "ta" ? "விவசாயி" : "Farmer")}
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 lg:hidden"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu for sub-links */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-700" : "text-stone-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
