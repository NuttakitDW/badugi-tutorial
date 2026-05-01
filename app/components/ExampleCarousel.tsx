"use client";

import { useState } from "react";
import type { Example } from "@/app/lib/levels";
import { PlayingCard } from "./PlayingCard";

interface ExampleCarouselProps {
  examples: Example[];
}

export function ExampleCarousel({ examples }: ExampleCarouselProps) {
  const [idx, setIdx] = useState(0);
  const total = examples.length;
  const current = examples[idx];
  const hasNav = total > 1;

  const goPrev = () => setIdx((i) => Math.max(0, i - 1));
  const goNext = () => setIdx((i) => Math.min(total - 1, i + 1));

  return (
    <div className="mt-8 flex items-center gap-2 sm:gap-3">
      {hasNav && (
        <SideArrow
          dir="left"
          onClick={goPrev}
          disabled={idx === 0}
          ariaLabel="Previous example"
        />
      )}

      <figure className="min-w-0 flex-1 rounded-2xl border border-sky-400/20 bg-sky-400/[0.04] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
            Example
          </figcaption>
          {hasNav && (
            <span className="font-mono text-[11px] tabular-nums text-slate-400">
              {idx + 1} / {total}
            </span>
          )}
        </div>

        <div key={idx} className="example-fade" aria-live="polite">
          <p className="mt-3 text-sm text-slate-300 sm:text-[15px]">
            {current.scenario}
          </p>

          {current.hands && current.hands.length > 0 && (
            <div className="mt-5 space-y-4">
              {current.hands.map((hand, i) => (
                <div key={i}>
                  {hand.label && (
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {hand.label}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {hand.cards.map((c, ci) => (
                      <PlayingCard key={ci} rank={c.rank} suit={c.suit} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-5 border-l-2 border-sky-400/50 pl-4 text-sm leading-relaxed text-slate-100 sm:text-[15px]">
            {current.takeaway}
          </p>
        </div>

        {hasNav && (
          <div className="mt-5 flex justify-center gap-1.5">
            {examples.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to example ${i + 1}`}
                className={[
                  "block h-1.5 rounded-full transition-all duration-200",
                  i === idx
                    ? "w-5 bg-sky-300"
                    : "w-1.5 bg-white/20 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </figure>

      {hasNav && (
        <SideArrow
          dir="right"
          onClick={goNext}
          disabled={idx === total - 1}
          ariaLabel="Next example"
        />
      )}
    </div>
  );
}

function SideArrow({
  dir,
  onClick,
  disabled,
  ariaLabel,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        "flex shrink-0 items-center justify-center bg-transparent p-1 text-sky-300",
        "transition-colors duration-200",
        "hover:text-white",
        "disabled:invisible",
      ].join(" ")}
    >
      <TriangleIcon dir={dir} />
    </button>
  );
}

function TriangleIcon({ dir }: { dir: "left" | "right" }) {
  const d = dir === "left" ? "M 17 4 L 7 12 L 17 20" : "M 7 4 L 17 12 L 7 20";
  return (
    <svg
      width="40"
      height="52"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
