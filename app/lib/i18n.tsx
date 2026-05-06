"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "th";

export type LocalizedString = { en: string; th: string };

export const LOCALES: Locale[] = ["en", "th"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
};

export function L(en: string, th: string): LocalizedString {
  return { en, th };
}

export function pickLocalized(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (value: LocalizedString) => string;
  format: (template: LocalizedString, vars: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "badugi-locale";
const DEFAULT_LOCALE: Locale = "en";

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "th";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    const browser = window.navigator.language?.toLowerCase() ?? "";
    if (browser.startsWith("th")) {
      setLocaleState("th");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  };

  const value: LocaleContextValue = {
    locale,
    setLocale,
    t: (v) => pickLocalized(v, locale),
    format: (template, vars) => {
      const raw = pickLocalized(template, locale);
      return raw.replace(/\{(\w+)\}/g, (_, key) => {
        const v = vars[key];
        return v === undefined ? `{${key}}` : String(v);
      });
    },
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

export const ui = {
  hero: {
    subtitle: L("Learning Tree", "เส้นทางการเรียนรู้"),
    description: L(
      "Zero to confident Badugi. Ten short steps. Start below.",
      "จากศูนย์สู่การเล่น Badugi อย่างมั่นใจ สิบขั้นตอนสั้น ๆ เริ่มด้านล่าง",
    ),
    scroll: L("Scroll", "เลื่อนลง"),
  },
  footer: {
    motto: L("Aim low. Stay rainbow.", "เล็งต่ำ คุมสี่ดอก"),
    copyright: L(
      "Copyright © 2026 nuttakitkundum.com All rights reserved.",
      "Copyright © 2026 nuttakitkundum.com All rights reserved.",
    ),
  },
  nav: {
    levelsLabel: L("Levels", "บทเรียน"),
  },
  common: {
    goalPrefix: L("Goal — ", "เป้าหมาย — "),
    example: L("Example", "ตัวอย่าง"),
    previousExample: L("Previous example", "ตัวอย่างก่อนหน้า"),
    nextExample: L("Next example", "ตัวอย่างถัดไป"),
    goToExample: L("Go to example {n}", "ไปยังตัวอย่างที่ {n}"),
  },
  language: {
    label: L("Language", "ภาษา"),
    switchTo: L("Switch language", "เปลี่ยนภาษา"),
  },
  startingHands: {
    byPosition: L("By Position", "ตามตำแหน่ง"),
    tapAnySeat: L("Tap any seat to switch", "แตะที่นั่งเพื่อสลับ"),
    yourHand: L("Your Hand", "มือของคุณ"),
    showStartingHand: L(
      "Show {pos} starting hand",
      "แสดงมือเริ่มต้นของ {pos}",
    ),
    goToPosition: L("Go to {pos}", "ไปยัง {pos}"),
    decisions: {
      Raise: L("Raise", "เรส"),
      Call: L("Call", "คอล"),
      Fold: L("Fold", "หมอบ"),
      Defend: L("Defend", "ป้องกัน"),
    },
  },
  gameFlow: {
    handWalkthrough: L("Hand Walkthrough", "ขั้นตอนการเล่นทีละมือ"),
    fixedLimit: L("$20 / $40 Fixed Limit", "Fixed Limit $20 / $40"),
    small: L("Small", "เล็ก"),
    big: L("Big", "ใหญ่"),
    pot: L("Pot", "พอต"),
    player1: L("Player 1", "ผู้เล่น 1"),
    player2: L("Player 2", "ผู้เล่น 2"),
    standPat: L("Stand pat", "อยู่นิ่ง"),
    drewN: L("Drew {n}", "จั่ว {n}"),
    play: L("Play", "เล่น"),
    pause: L("Pause", "หยุดชั่วคราว"),
    replay: L("Replay", "เล่นซ้ำ"),
    previousStep: L("Previous step", "ขั้นก่อนหน้า"),
    nextStep: L("Next step", "ขั้นถัดไป"),
    goToStep: L("Go to step {n}", "ไปยังขั้นที่ {n}"),
    dealerButton: L("Dealer button", "ปุ่มดีลเลอร์"),
  },
} as const;
