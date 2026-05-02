"use client";

import { useEffect, useState } from "react";
import type { CardCode, SuitCode } from "@/app/lib/levels";
import { SuitIcon } from "./PlayingCard";

type PlayerState = {
  bet: number;
  action?: string;
  reveal?: CardCode[];
  drawing?: number;
  position?: string;
  winner?: boolean;
  dealt?: boolean;
};

type Step = {
  street: string;
  action: string;
  detail: string;
  pot: number;
  justDealt?: boolean;
  acting?: "p1" | "p2";
  p1: PlayerState;
  p2: PlayerState;
};

const STEPS: Step[] = [
  {
    street: "Pre-draw",
    action: "Blinds are posted",
    detail:
      "Player 1 holds the dealer button (D) and posts the $20 small blind. Player 2 posts the $40 big blind. Heads-up: the button acts first pre-draw, last after each draw.",
    pot: 60,
    p1: { bet: 20, position: "SB", dealt: false },
    p2: { bet: 40, position: "BB", dealt: false },
  },
  {
    street: "Pre-draw",
    action: "Cards dealt",
    detail: "Each player gets 4 cards face down.",
    pot: 60,
    justDealt: true,
    p1: { bet: 20, position: "SB" },
    p2: { bet: 40, position: "BB" },
  },
  {
    street: "Pre-draw",
    action: "Player 1 raises to $80",
    detail:
      "Pre-draw uses the small bet ($40). P1 puts in $60 more on top of the blind to make it $80.",
    pot: 120,
    acting: "p1",
    p1: { bet: 80, position: "SB", action: "Raise" },
    p2: { bet: 40, position: "BB" },
  },
  {
    street: "Pre-draw",
    action: "Player 2 re-raises to $120 (3-bet)",
    detail: "P2 reads strength and puts in another $40 bet on top.",
    pot: 200,
    acting: "p2",
    p1: { bet: 80, position: "SB" },
    p2: { bet: 120, position: "BB", action: "3-bet" },
  },
  {
    street: "Pre-draw",
    action: "Player 1 calls",
    detail: "P1 matches the $40. Pre-draw betting closes at $240 in the pot.",
    pot: 240,
    acting: "p1",
    p1: { bet: 120, position: "SB", action: "Call" },
    p2: { bet: 120, position: "BB" },
  },
  {
    street: "Draw 1",
    action: "Players discard and draw",
    detail:
      "P1 draws 1 card (improving a 3-card). P2 draws 2 (weaker, looking to catch up).",
    pot: 240,
    p1: { bet: 0, drawing: 1 },
    p2: { bet: 0, drawing: 2 },
  },
  {
    street: "Post-draw 1",
    action: "Player 2 bets $40",
    detail: "Post-draw 1 still uses the small bet ($40).",
    pot: 280,
    acting: "p2",
    p1: { bet: 0 },
    p2: { bet: 40, action: "Bet" },
  },
  {
    street: "Post-draw 1",
    action: "Player 1 calls",
    detail: "P1 matches the $40 to see another card.",
    pot: 320,
    acting: "p1",
    p1: { bet: 40, action: "Call" },
    p2: { bet: 40 },
  },
  {
    street: "Draw 2",
    action: "Players draw again",
    detail: "Both draw one card.",
    pot: 320,
    p1: { bet: 0, drawing: 1 },
    p2: { bet: 0, drawing: 1 },
  },
  {
    street: "Post-draw 2",
    action: "Player 2 bets $80",
    detail: "After draw 2 the betting doubles to the big bet ($80).",
    pot: 400,
    acting: "p2",
    p1: { bet: 0 },
    p2: { bet: 80, action: "Bet" },
  },
  {
    street: "Post-draw 2",
    action: "Player 1 calls",
    detail: "P1 calls the big bet.",
    pot: 480,
    acting: "p1",
    p1: { bet: 80, action: "Call" },
    p2: { bet: 80 },
  },
  {
    street: "Draw 3",
    action: "Last draw — P1 stands pat",
    detail:
      "P1 is happy with their hand (a made 7-Badugi). P2 draws one trying to catch.",
    pot: 480,
    p1: { bet: 0, drawing: 0 },
    p2: { bet: 0, drawing: 1 },
  },
  {
    street: "Post-draw 3",
    action: "Player 2 bets $80",
    detail: "Final betting round.",
    pot: 560,
    acting: "p2",
    p1: { bet: 0 },
    p2: { bet: 80, action: "Bet" },
  },
  {
    street: "Post-draw 3",
    action: "Player 1 calls",
    detail: "P1 calls and we go to showdown.",
    pot: 640,
    acting: "p1",
    p1: { bet: 80, action: "Call" },
    p2: { bet: 80 },
  },
  {
    street: "Showdown",
    action: "Player 1 wins with a 7-Badugi",
    detail:
      "P1's 7-5-3-A rainbow beats P2's 8-6-2-A rainbow — same idea, lower high card wins.",
    pot: 640,
    p1: {
      bet: 0,
      winner: true,
      action: "+ $640",
      reveal: [
        { rank: "7", suit: "S" },
        { rank: "5", suit: "H" },
        { rank: "3", suit: "D" },
        { rank: "A", suit: "C" },
      ],
    },
    p2: {
      bet: 0,
      reveal: [
        { rank: "8", suit: "D" },
        { rank: "6", suit: "H" },
        { rank: "2", suit: "S" },
        { rank: "A", suit: "C" },
      ],
    },
  },
];

const STEP_DURATION = 2600;

export function GameFlowAnimation() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const total = STEPS.length;
  const current = STEPS[step];
  const isLast = step === total - 1;

  useEffect(() => {
    if (!playing || isLast) return;
    const t = setTimeout(() => {
      setStep((s) => Math.min(total - 1, s + 1));
    }, STEP_DURATION);
    return () => clearTimeout(t);
  }, [playing, step, isLast, total]);

  useEffect(() => {
    if (isLast && playing) setPlaying(false);
  }, [isLast, playing]);

  const goPrev = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => setStep((s) => Math.min(total - 1, s + 1));
  const restart = () => {
    setStep(0);
    setPlaying(true);
  };
  const togglePlay = () => {
    if (isLast) restart();
    else setPlaying((p) => !p);
  };

  return (
    <figure className="mt-8 rounded-2xl border border-sky-400/20 bg-sky-400/[0.04] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
            Hand Walkthrough
          </figcaption>
          <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200">
            {current.street}
          </span>
        </div>
        <span className="font-mono text-[11px] tabular-nums text-slate-400">
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <StakesBar street={current.street} />

      <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">
        {current.action}
      </h3>

      <div key={step} className="example-fade mt-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-6">
          <PlayerView
            player={current.p1}
            label="Player 1"
            justDealt={current.justDealt}
            acting={current.acting === "p1"}
            hasButton
          />
          <PotView amount={current.pot} />
          <PlayerView
            player={current.p2}
            label="Player 2"
            justDealt={current.justDealt}
            acting={current.acting === "p2"}
          />
        </div>

        <p className="mt-5 border-l-2 border-sky-400/50 pl-4 text-sm leading-relaxed text-slate-100 sm:text-[15px]">
          {current.detail}
        </p>
      </div>

      <div className="mt-5 flex gap-1">
        {STEPS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            aria-label={`Go to step ${i + 1}`}
            className={[
              "h-1 flex-1 rounded-full transition-colors",
              i < step
                ? "bg-sky-400/60"
                : i === step
                  ? "bg-sky-300"
                  : "bg-white/10 hover:bg-white/20",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <ControlButton onClick={goPrev} disabled={step === 0} ariaLabel="Previous step">
          <ChevronIcon dir="left" />
        </ControlButton>
        <ControlButton onClick={togglePlay} primary ariaLabel={playing ? "Pause" : isLast ? "Replay" : "Play"}>
          {playing ? <PauseIcon /> : isLast ? <ReplayIcon /> : <PlayIcon />}
        </ControlButton>
        <ControlButton onClick={goNext} disabled={isLast} ariaLabel="Next step">
          <ChevronIcon dir="right" />
        </ControlButton>
      </div>
    </figure>
  );
}

function PlayerView({
  player,
  label,
  justDealt,
  acting,
  hasButton,
}: {
  player: PlayerState;
  label: string;
  justDealt?: boolean;
  acting?: boolean;
  hasButton?: boolean;
}) {
  const notDealt = player.dealt === false;
  return (
    <div
      className={[
        "flex min-w-0 flex-col items-center gap-2 rounded-xl px-2 py-2 transition-all duration-300",
        acting
          ? "bg-sky-400/[0.07] ring-1 ring-sky-400/40 shadow-[0_0_30px_-8px_rgba(56,189,248,0.5)]"
          : "ring-1 ring-transparent",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </span>
        {hasButton && <DealerButton />}
        {player.position && (
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-300">
            {player.position}
          </span>
        )}
      </div>

      <div
        className={[
          "flex gap-1 transition-all",
          player.winner ? "drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]" : "",
        ].join(" ")}
      >
        {Array.from({ length: 4 }).map((_, i) => {
          if (notDealt) {
            return <CardSlot key={i} />;
          }

          if (player.reveal) {
            return (
              <MiniCard
                key={i}
                rank={player.reveal[i].rank}
                suit={player.reveal[i].suit}
              />
            );
          }

          const isDrawing =
            player.drawing !== undefined &&
            player.drawing > 0 &&
            i >= 4 - player.drawing;
          const isPat = player.drawing === 0;
          const animation: "draw" | "pat" | "deal" | undefined = isDrawing
            ? "draw"
            : isPat
              ? "pat"
              : justDealt
                ? "deal"
                : undefined;
          const delayMs =
            animation === "draw" || animation === "deal" ? i * 90 : 0;

          return (
            <MiniCardBack
              key={i}
              animation={animation}
              delayMs={delayMs}
            />
          );
        })}
      </div>

      <div className="flex min-h-[20px] flex-col items-center gap-1">
        {player.bet > 0 && (
          <span className="chip-place inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-500/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-sky-100 shadow-[0_2px_10px_-2px_rgba(56,189,248,0.5)]">
            <ChipIcon />
            <span>${player.bet}</span>
          </span>
        )}
        {player.action && (
          <span
            className={[
              "text-[10px] font-bold uppercase tracking-[0.18em]",
              player.winner ? "text-amber-300" : "text-sky-300",
            ].join(" ")}
          >
            {player.action}
          </span>
        )}
        {player.drawing != null && (
          <span
            className={[
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]",
              player.drawing === 0
                ? "border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                : "border border-amber-400/40 bg-amber-400/10 text-amber-300",
            ].join(" ")}
          >
            {player.drawing === 0 ? (
              <>
                <LockIcon /> Stand pat
              </>
            ) : (
              <>
                <SwapIcon /> Drew {player.drawing}
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

function DealerButton() {
  return (
    <span
      title="Dealer button"
      aria-label="Dealer button"
      className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-50 to-amber-200 text-[11px] font-black leading-none text-slate-900 shadow-[0_2px_8px_rgba(251,191,36,0.45)] ring-1 ring-amber-300/60"
      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
    >
      D
    </span>
  );
}

function StakesBar({ street }: { street: string }) {
  const smallActive = street === "Pre-draw" || street === "Post-draw 1";
  const bigActive = street === "Post-draw 2" || street === "Post-draw 3";

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
        $40 / $80 Limit
      </span>
      <BetSizePill label="Small Bet" amount={40} active={smallActive} />
      <BetSizePill label="Big Bet" amount={80} active={bigActive} />
    </div>
  );
}

function BetSizePill({
  label,
  amount,
  active,
}: {
  label: string;
  amount: number;
  active: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all",
        active
          ? "border-sky-400/60 bg-sky-400/15 text-sky-200 shadow-[0_0_18px_-4px_rgba(56,189,248,0.5)]"
          : "border-white/10 bg-white/[0.03] text-slate-500",
      ].join(" ")}
    >
      {label}
      <span className="font-mono">${amount}</span>
    </span>
  );
}

function PotView({ amount }: { amount: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5 px-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Pot
      </div>
      <div
        key={amount}
        className="pot-pulse font-mono text-2xl font-bold text-sky-200 sm:text-3xl"
      >
        ${amount}
      </div>
    </div>
  );
}

function ChipIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
    </svg>
  );
}

const SUIT_COLOR: Record<SuitCode, string> = {
  S: "text-slate-50",
  H: "text-rose-400",
  D: "text-sky-400",
  C: "text-emerald-400",
};

function MiniCard({ rank, suit }: { rank: string; suit: SuitCode }) {
  return (
    <div className="flex h-12 w-9 flex-col items-center justify-center gap-0.5 rounded-md border border-slate-700 bg-slate-900/95 ring-1 ring-inset ring-white/5">
      <span
        className={`font-mono text-[13px] font-bold leading-none ${SUIT_COLOR[suit]}`}
      >
        {rank}
      </span>
      <SuitIcon suit={suit} size={11} />
    </div>
  );
}

function MiniCardBack({
  animation,
  delayMs = 0,
}: {
  animation?: "draw" | "pat" | "deal";
  delayMs?: number;
}) {
  const animClass =
    animation === "draw"
      ? "card-draw"
      : animation === "pat"
        ? "card-pat"
        : animation === "deal"
          ? "card-deal"
          : "";
  return (
    <div
      className={[
        "h-12 w-9 rounded-md border border-sky-400/30 bg-gradient-to-br from-sky-800/40 via-sky-900/60 to-slate-950 shadow-inner",
        animClass,
      ].join(" ")}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    />
  );
}

function CardSlot() {
  return (
    <div className="h-12 w-9 rounded-md border border-dashed border-white/10 bg-white/[0.015]" />
  );
}

function ControlButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        "flex items-center justify-center rounded-full transition-colors",
        primary
          ? "size-11 border border-sky-400/40 bg-sky-400/15 text-sky-100 hover:border-sky-300 hover:bg-sky-400/25"
          : "size-9 text-sky-200 hover:bg-white/5",
        "disabled:cursor-not-allowed disabled:text-slate-700 disabled:hover:bg-transparent",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  const d = dir === "left" ? "M 15 6 L 9 12 L 15 18" : "M 9 6 L 15 12 L 9 18";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 5 L 19 12 L 7 19 Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 7h13l-3-3M17 17H4l3 3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function ReplayIcon() {
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
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}
