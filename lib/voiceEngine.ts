import { SupportedLanguage } from "@/types";

export interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
}

export const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
};

export const LANGUAGE_TEMPLATES: Record<SupportedLanguage, (amount: string) => string> = {
  "hi-IN": (amt) => `SmartPay par ${amt || "kuchh"} rupaye prapt hue.`,
  "en-IN": (amt) => `SmartPay payment received, ${amt || "some"} rupees.`,
  "or-IN": (amt) => `SmartPay re ${amt || "kichi"} tanka prapta hela.`,
  "bn-IN": (amt) => `SmartPay te ${amt || "kichu"} taka prapto hoyeche.`,
  "mr-IN": (amt) => `SmartPay var ${amt || "kahi"} rupaye prapta jhale.`,
  "ta-IN": (amt) => `SmartPayil ${amt || "sila"} roobai perappattadhu.`,
  "te-IN": (amt) => `SmartPay lo ${amt || "konni"} roopayalu andukunnamu.`,
  "kn-IN": (amt) => `SmartPay nalli ${amt || "kelavu"} roopayi sweekarislagide.`,
  "ml-IN": (amt) => `SmartPay il ${amt || "kurahe"} roopa labhichu.`,
};

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function announcePayment(
  amount: string,
  lang: SupportedLanguage = "hi-IN",
  settings: SpeechSettings = DEFAULT_SPEECH_SETTINGS
): boolean {
  if (!isSpeechSupported()) return false;

  window.speechSynthesis.cancel(); // Stop ongoing speech

  const textGen = LANGUAGE_TEMPLATES[lang] || LANGUAGE_TEMPLATES["hi-IN"];
  const text = textGen(amount);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = settings.volume;

  // Find exact regional voice if available in browser
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.replace("_", "-") === lang || v.lang.startsWith(lang.split("-")[0]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}
