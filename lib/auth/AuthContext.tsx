"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface FarmerProfileData {
  farmerName: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  mainCrops: string[];
  landSizeAcres?: number;
  irrigationType?: string;
  preferredLang: "ta" | "en";
  locationConsent: boolean;
  latitude?: number;
  longitude?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  profile: FarmerProfileData | null;
  loginWithPhone: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; isNewUser: boolean; message: string }>;
  completeOnboarding: (data: FarmerProfileData) => Promise<{ success: boolean }>;
  updateProfile: (data: Partial<FarmerProfileData>) => Promise<{ success: boolean }>;
  logout: () => void;
}

const DEFAULT_PROFILE: FarmerProfileData = {
  farmerName: "Muthukumar S.",
  phone: "9876543210",
  village: "Orathanadu",
  district: "Thanjavur",
  state: "Tamil Nadu",
  mainCrops: ["Paddy (Ponni)", "Groundnut", "Blackgram"],
  landSizeAcres: 3.5,
  irrigationType: "Borewell + Canal",
  preferredLang: "ta",
  locationConsent: true,
  latitude: 10.6277,
  longitude: 79.2536,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<FarmerProfileData | null>(null);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("farmer_ai_auth");
      const storedProfile = localStorage.getItem("farmer_ai_profile");
      if (storedAuth === "true" && storedProfile) {
        setIsAuthenticated(true);
        setProfile(JSON.parse(storedProfile));
      } else {
        // Provide default profile for easy demo exploration if unauthenticated
        setProfile(DEFAULT_PROFILE);
      }
    } catch {
      setProfile(DEFAULT_PROFILE);
    }
  }, []);

  const loginWithPhone = async (phone: string) => {
    // In dev mock mode, return success immediately
    return {
      success: true,
      message: "OTP sent successfully. In development mode, use code 123456.",
    };
  };

  const verifyOtp = async (phone: string, otp: string) => {
    if (otp === "123456" || otp === "999999") {
      const isExisting = localStorage.getItem(`farmer_ai_registered_${phone}`);
      if (isExisting) {
        const parsed = JSON.parse(isExisting);
        setProfile(parsed);
        setIsAuthenticated(true);
        localStorage.setItem("farmer_ai_auth", "true");
        localStorage.setItem("farmer_ai_profile", JSON.stringify(parsed));
        return { success: true, isNewUser: false, message: "Welcome back!" };
      } else {
        return { success: true, isNewUser: true, message: "OTP verified. Please complete your farm profile." };
      }
    }
    return { success: false, isNewUser: false, message: "Invalid OTP code. Please enter 123456." };
  };

  const completeOnboarding = async (data: FarmerProfileData) => {
    setProfile(data);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("farmer_ai_auth", "true");
      localStorage.setItem("farmer_ai_profile", JSON.stringify(data));
      localStorage.setItem(`farmer_ai_registered_${data.phone}`, JSON.stringify(data));
    } catch {
      // storage error
    }
    return { success: true };
  };

  const updateProfile = async (partialData: Partial<FarmerProfileData>) => {
    if (!profile) return { success: false };
    const updated = { ...profile, ...partialData };
    setProfile(updated);
    try {
      localStorage.setItem("farmer_ai_profile", JSON.stringify(updated));
      localStorage.setItem(`farmer_ai_registered_${updated.phone}`, JSON.stringify(updated));
    } catch {
      // storage error
    }
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("farmer_ai_auth");
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        profile,
        loginWithPhone,
        verifyOtp,
        completeOnboarding,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
