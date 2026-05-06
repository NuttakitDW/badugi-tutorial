"use client";

import { levels, type LevelNode } from "@/app/lib/levels";
import { ExampleCarousel } from "@/app/components/ExampleCarousel";
import { GameFlowAnimation } from "@/app/components/GameFlowAnimation";
import { SectionNav } from "@/app/components/SectionNav";
import { StartingHandsCarousel } from "@/app/components/StartingHandsCarousel";
import { ui, useLocale } from "@/app/lib/i18n";

export default function Home() {
  const { t } = useLocale();
  const navItems = levels.map((l) => ({ id: `level-${l.id}`, title: t(l.title) }));

  return (
    <main className="relative">
      <SectionNav items={navItems} />
      <Hero />
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        {levels.map((level, i) => (
          <Section key={level.id} level={level} index={i} total={levels.length} />
        ))}
        <Footer />
      </div>
    </main>
  );
}

function Hero() {
  const { t } = useLocale();
  return (
    <section className="flex min-h-dvh snap-start flex-col items-center justify-center px-5 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_30px_rgba(56,189,248,0.4)] sm:text-7xl">
        Badugi
      </h1>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80 sm:text-sm">
        {t(ui.hero.subtitle)}
      </p>
      <p className="mt-8 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
        {t(ui.hero.description)}
      </p>
      <div
        aria-hidden
        className="mt-14 flex flex-col items-center gap-2 text-sky-300/70"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">
          {t(ui.hero.scroll)}
        </span>
        <ScrollChevron />
      </div>
    </section>
  );
}

function Section({
  level,
  index,
  total,
}: {
  level: LevelNode;
  index: number;
  total: number;
}) {
  const { t } = useLocale();
  return (
    <section
      id={`level-${level.id}`}
      className="flex min-h-dvh snap-start flex-col justify-center border-t border-white/5 py-16 first:border-0 sm:py-20"
    >
      <header className="flex items-baseline gap-4">
        <span className="font-mono text-xs font-semibold tracking-widest text-sky-300">
          {String(index).padStart(2, "0")}
          <span className="text-slate-600">
            {" / "}
            {String(total - 1).padStart(2, "0")}
          </span>
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent" />
      </header>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {t(level.title)}
      </h2>

      <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-[17px]">
        <span className="font-semibold text-sky-300">{t(ui.common.goalPrefix)}</span>
        {t(level.goal)}
      </p>

      <ul className="mt-6 space-y-3">
        {level.points.map((p, i) => (
          <li
            key={i}
            className="flex gap-3 text-[15px] leading-relaxed text-slate-200/95"
          >
            <span className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-sky-400" />
            <span>{linkifySnowing(t(p), level.id)}</span>
          </li>
        ))}
      </ul>

      {level.id === "2" ? (
        <GameFlowAnimation />
      ) : level.id === "3" ? (
        <StartingHandsCarousel />
      ) : (
        level.examples &&
        level.examples.length > 0 && <ExampleCarousel examples={level.examples} />
      )}
    </section>
  );
}

function Footer() {
  const { t } = useLocale();
  return (
    <footer className="flex min-h-[40dvh] snap-start flex-col items-center justify-center gap-3 pb-12 pt-8 text-center text-slate-500">
      <p className="text-xs">{t(ui.footer.motto)}</p>
      <p className="text-[11px] text-slate-600">{t(ui.footer.copyright)}</p>
    </footer>
  );
}

function linkifySnowing(text: string, levelId: string): React.ReactNode {
  if (levelId === "7") return text;
  const parts = text.split(/(\bsnow(?:ing|ed|s)?\b)/gi);
  return parts.map((part, i) =>
    /^snow/i.test(part) ? (
      <a
        key={i}
        href="#level-7"
        className="text-sky-300 underline decoration-sky-400/40 underline-offset-2 transition-colors hover:text-sky-200 hover:decoration-sky-300"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function ScrollChevron() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-bounce"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
