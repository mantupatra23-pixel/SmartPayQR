"use client";

import React, { useState, useEffect } from "react";
import { SupportedLanguage } from "@/types";
import { announcePayment, stopSpeech, isSpeechSupported, SpeechSettings, DEFAULT_SPEECH_SETTINGS } from "@/lib/voiceEngine";
import { AmountChips } from "./AmountChips";
import { Volume2, VolumeX, AlertTriangle, Play, Sparkles, Settings2, ShieldCheck, Globe } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface SoundboxPanelProps {
  defaultLanguage: SupportedLanguage;
}

const LANGUAGES: { id: SupportedLanguage; label: string }[] = [
  { id: "hi-IN", label: "Hindi (हिंदी)" },
  { id: "en-IN", label: "English" },
  { id: "or-IN", label: "Odia (ଓଡ଼ିଆ)" },
  { id: "bn-IN", label: "Bengali (বাংলা)" },
  { id: "mr-IN", label: "Marathi (मराठी)" },
  { id: "ta-IN", label: "Tamil (தமிழ்)" },
  { id: "te-IN", label: "Telugu (తెలుగు)" },
  { id: "kn-IN", label: "Kannada (ಕನ್ನಡ)" },
  { id: "ml-IN", label: "Malayalam (മലയാളം)" },
];

export function SoundboxPanel({ defaultLanguage }: SoundboxPanelProps) {
  const { showToast } = useToast();
  const [amount, setAmount] = useState("100");
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<SpeechSettings>(DEFAULT_SPEECH_SETTINGS);

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  const handlePlay = (customAmt?: string) => {
    const triggerAmt = customAmt !== undefined ? customAmt : amount;
    if (!triggerAmt || isNaN(Number(triggerAmt)) || Number(triggerAmt) <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }

    setIsPlaying(true);
    const success = announcePayment(triggerAmt, language, settings);
    if (!success) {
      showToast("Speech synthesis is not supported on this device/browser.", "error");
    } else {
      showToast(`Announcing ₹${triggerAmt} alert`, "info");
    }
    setTimeout(() => setIsPlaying(false), 2200);
  };

  const handleStop = () => {
    stopSpeech();
    setIsPlaying(false);
    showToast("Voice alert stopped", "info");
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-5">
      {/* Top Soundbox Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#e4a576]/20 flex items-center justify-center text-[#152935]">
            <Volume2 className="w-5 h-5 text-[#152935]" />
          </div>
          <div>
            <h2 className="text-sm font-black text-[#152935] uppercase tracking-wide">Counter Voice Terminal</h2>
            <p className="text-[10px] text-zinc-400 font-medium">Merchant-Triggered Audio Confirmation</p>
          </div>
        </div>

        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${supported ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
          {supported ? "Ready" : "Unsupported"}
        </span>
      </div>

      {!supported && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>Voice announcements are not supported in this browser. Please use Chrome, Edge, or Safari.</span>
        </div>
      )}

      {/* Quick Amount Chips */}
      <AmountChips
        selectedAmount={amount}
        onSelectAmount={(val) => {
          setAmount(val);
          handlePlay(val);
        }}
      />

      {/* Manual Amount & Language Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
        <div className="sm:col-span-5">
          <label className="text-xs font-bold text-[#152935]">Custom Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#152935] focus:outline-none focus:border-[#152935]"
            placeholder="e.g. 350"
          />
        </div>

        <div className="sm:col-span-7">
          <label className="text-xs font-bold text-[#152935]">Alert Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => handlePlay()}
          disabled={isPlaying}
          className="flex-1 py-3.5 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          {isPlaying ? <Sparkles className="w-4 h-4 animate-spin text-[#e4a576]" /> : <Play className="w-4 h-4 fill-current text-[#e4a576]" />}
          <span>{isPlaying ? "ANNOUNCING..." : `ANNOUNCE PAYMENT (₹${amount || "0"})`}</span>
        </button>

        <button
          type="button"
          onClick={handleStop}
          className="px-4 py-3.5 bg-zinc-100 hover:bg-zinc-200 active:scale-[0.98] text-zinc-700 rounded-2xl transition-all flex items-center justify-center"
          title="Stop Speech"
        >
          <VolumeX className="w-4 h-4" />
        </button>
      </div>

      {/* Advanced Voice Sliders Toggle */}
      <div className="border-t border-zinc-100 pt-3">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-[11px] font-bold text-zinc-500 hover:text-[#152935] flex items-center gap-1.5 transition-colors"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>{showAdvanced ? "Hide Voice Settings" : "Adjust Voice Speed & Pitch"}</span>
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-zinc-600 mb-1">
                <span>Speed / Rate</span>
                <span>{settings.rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={settings.rate}
                onChange={(e) => setSettings({ ...settings, rate: parseFloat(e.target.value) })}
                className="w-full accent-[#152935]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-zinc-600 mb-1">
                <span>Voice Pitch</span>
                <span>{settings.pitch}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={settings.pitch}
                onChange={(e) => setSettings({ ...settings, pitch: parseFloat(e.target.value) })}
                className="w-full accent-[#152935]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Regulatory Disclaimer */}
      <div className="bg-[#fde5d6]/40 border border-[#e4a576]/40 p-3 rounded-2xl text-[10px] text-zinc-600 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#152935]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#e4a576]" />
          <span>Important Notice</span>
        </div>
        <p className="leading-relaxed">
          Voice announcements are merchant-triggered utilities for audio counter confirmation and do not verify UPI banking transactions or settle payments.
        </p>
      </div>
    </div>
  );
}
