"use client";

import { LOCALES, LOCALE_LABELS, ui, useLocale, type Locale } from "@/app/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="pointer-events-auto fixed right-4 top-4 z-40 flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 p-0.5 text-[11px] font-semibold backdrop-blur-md sm:right-6 sm:top-6"
      role="group"
      aria-label={t(ui.language.label)}
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            aria-label={`${t(ui.language.switchTo)}: ${LOCALE_LABELS[code]}`}
            className={[
              "rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors",
              isActive
                ? "bg-sky-400/20 text-sky-100 ring-1 ring-sky-300/40"
                : "text-slate-400 hover:text-sky-200",
            ].join(" ")}
          >
            {labelFor(code)}
          </button>
        );
      })}
    </div>
  );
}

function labelFor(code: Locale): string {
  return code === "en" ? "EN" : "ไทย";
}
