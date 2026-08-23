"use client";

import { useState, useEffect } from "react";
import { MerchantProfile } from "@/types";

const STORAGE_KEY = "smartpayqr:v1";

const DEFAULT_PROFILE: MerchantProfile = {
  businessName: "Royal Cafe & Bakers",
  upiId: "merchant@okaxis",
  category: "Cafe",
  tagline: "Accepted Here • Any UPI",
  language: "hi-IN",
  theme: "sunburn-slate",
};

export function useMerchant() {
  const [profile, setProfile] = useState<MerchantProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load merchant profile from LocalStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProfile = (newProfile: Partial<MerchantProfile>) => {
    const updated = { ...profile, ...newProfile };
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Could not persist to LocalStorage", e);
    }
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("smartpayqr:receipt_history");
    } catch (e) {
      console.error("Could not reset LocalStorage", e);
    }
  };

  return { profile, saveProfile, resetProfile, isLoaded };
}
