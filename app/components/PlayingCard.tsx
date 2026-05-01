import type { SuitCode } from "@/app/lib/levels";

const SUIT_COLOR: Record<SuitCode, string> = {
  S: "text-slate-50",
  H: "text-rose-400",
  D: "text-sky-400",
  C: "text-emerald-400",
};

interface PlayingCardProps {
  rank: string;
  suit: SuitCode;
}

export function PlayingCard({ rank, suit }: PlayingCardProps) {
  const colorClass = SUIT_COLOR[suit];

  return (
    <div
      className={[
        "relative inline-flex h-20 w-14 flex-col items-center justify-center gap-1",
        "rounded-lg border border-slate-700/80 bg-slate-900/90 shadow-lg shadow-black/40",
        "ring-1 ring-inset ring-white/[0.04]",
      ].join(" ")}
    >
      <span className={`font-mono text-xl font-bold leading-none ${colorClass}`}>
        {rank}
      </span>
      <SuitIcon suit={suit} size={20} />
    </div>
  );
}

interface SuitIconProps {
  suit: SuitCode;
  size?: number;
  className?: string;
}

export function SuitIcon({ suit, size = 16, className }: SuitIconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className ?? SUIT_COLOR[suit]}
    >
      {suit === "S" && (
        <path d="M12 2C9.5 5 7 7.5 5.5 9.5C4 11.5 3 13.5 3 15C3 17.5 5 19.5 7.5 19.5C9 19.5 10.4 18.7 11 17.5L10 22H14L13 17.5C13.6 18.7 15 19.5 16.5 19.5C19 19.5 21 17.5 21 15C21 13.5 20 11.5 18.5 9.5C17 7.5 14.5 5 12 2Z" />
      )}
      {suit === "H" && (
        <path d="M12 21C12 21 4 14 4 9.5C4 6.5 6.2 4.5 9 4.5C10.5 4.5 11.5 5.5 12 7C12.5 5.5 13.5 4.5 15 4.5C17.8 4.5 20 6.5 20 9.5C20 14 12 21 12 21Z" />
      )}
      {suit === "D" && <path d="M12 2L21 12L12 22L3 12Z" />}
      {suit === "C" && (
        <path d="M12 3C9.8 3 8 4.8 8 7C8 8 8.4 8.9 9 9.6C8.5 9.4 7.8 9.3 7 9.3C4.8 9.3 3 11.1 3 13.3C3 15.5 4.8 17.3 7 17.3C8.5 17.3 9.8 16.5 10.5 15.4L10 22H14L13.5 15.4C14.2 16.5 15.5 17.3 17 17.3C19.2 17.3 21 15.5 21 13.3C21 11.1 19.2 9.3 17 9.3C16.2 9.3 15.5 9.4 15 9.6C15.6 8.9 16 8 16 7C16 4.8 14.2 3 12 3Z" />
      )}
    </svg>
  );
}
