"use client";

import { useState } from "react";
import type { CardCode } from "@/app/lib/levels";
import { PlayingCard } from "./PlayingCard";
import { L, ui, useLocale, type LocalizedString } from "@/app/lib/i18n";

type Position = "UTG" | "HJ" | "CO" | "BTN" | "SB" | "BB";
type Decision = "Raise" | "Call" | "Fold" | "Defend";

type PositionExample = {
  position: Position;
  positionLabel: LocalizedString;
  hand: CardCode[];
  finalHand: LocalizedString;
  decision: Decision;
  rationale: LocalizedString;
};

const POSITION_EXAMPLES: PositionExample[] = [
  {
    position: "UTG",
    positionLabel: L("Under the Gun", "ตำแหน่งนำ (UTG)"),
    hand: [
      { rank: "A", suit: "S" },
      { rank: "2", suit: "H" },
      { rank: "3", suit: "D" },
      { rank: "K", suit: "S" },
    ],
    finalHand: L(
      "3-card A-2-3 rainbow (drop K♠ — pairs A's suit)",
      "มือ 3 ใบ A-2-3 เรนโบว์ (ทิ้ง K♠ — ดอกซ้ำกับ A)",
    ),
    decision: "Raise",
    rationale: L(
      "First to act with a premium 3-card. Strong enough to open from any position.",
      "act เป็นคนแรกพร้อมมือ 3 ใบระดับพรีเมียม แข็งพอจะเปิดได้จากทุกตำแหน่ง",
    ),
  },
  {
    position: "HJ",
    positionLabel: L("Hijack", "ไฮแจ็ค (HJ)"),
    hand: [
      { rank: "A", suit: "C" },
      { rank: "2", suit: "D" },
      { rank: "7", suit: "S" },
      { rank: "7", suit: "H" },
    ],
    finalHand: L(
      "3-card A-2-7 (drop one 7 — paired)",
      "มือ 3 ใบ A-2-7 (ทิ้ง 7 ใบหนึ่ง — เพราะจับคู่)",
    ),
    decision: "Raise",
    rationale: L(
      "Solid 3-card from middle position. The pair forces a drop, but the remaining three are clean.",
      "มือ 3 ใบที่แน่นจากตำแหน่งกลาง คู่บังคับให้ทิ้ง แต่สามใบที่เหลือสะอาด",
    ),
  },
  {
    position: "CO",
    positionLabel: L("Cutoff", "คัทออฟ (CO)"),
    hand: [
      { rank: "2", suit: "C" },
      { rank: "5", suit: "D" },
      { rank: "7", suit: "S" },
      { rank: "Q", suit: "C" },
    ],
    finalHand: L(
      "3-card 7-5-2 (drop Q♣ — pairs 2's suit)",
      "มือ 3 ใบ 7-5-2 (ทิ้ง Q♣ — ดอกซ้ำกับ 2)",
    ),
    decision: "Raise",
    rationale: L(
      "No ace, but three low rainbow cards. Cutoff is wide enough to open this.",
      "ไม่มีA แต่มีไพ่ต่ำสามใบเรนโบว์ ตำแหน่งคัทออฟกว้างพอจะเปิดได้",
    ),
  },
  {
    position: "BTN",
    positionLabel: L("Button", "ปุ่ม (BTN)"),
    hand: [
      { rank: "A", suit: "H" },
      { rank: "3", suit: "D" },
      { rank: "T", suit: "S" },
      { rank: "T", suit: "C" },
    ],
    finalHand: L(
      "3-card T-3-A (drop one T — paired)",
      "มือ 3 ใบ T-3-A (ทิ้ง T ใบหนึ่ง — เพราะจับคู่)",
    ),
    decision: "Raise",
    rationale: L(
      "Marginal hand with a high T. Open from the button — fold this from earlier seats.",
      "มือก้ำกึ่งที่มี T สูง เปิดจาก Button ได้ — ถ้าตำแหน่งต้นกว่านี้ให้หมอบ",
    ),
  },
  {
    position: "SB",
    positionLabel: L("Small Blind", "สมอลล์บลายด์ (SB)"),
    hand: [
      { rank: "3", suit: "C" },
      { rank: "6", suit: "D" },
      { rank: "8", suit: "H" },
      { rank: "J", suit: "S" },
    ],
    finalHand: L(
      "Jack Badugi (J-8-6-3, all four suits)",
      "Jack Badugi (J-8-6-3 ครบสี่ดอก)",
    ),
    decision: "Raise",
    rationale: L(
      "Tighter than the button — you'll be OOP after every draw. Raise or fold; flatting lets the BB see the draw cheap.",
      "เล่นแน่นกว่า Button — จะเสียเปรียบตำแหน่ง (OOP) หลังการจั่วทุกครั้ง เรสหรือหมอบ การคอลทำให้ BB จั่วได้ในราคาถูก",
    ),
  },
  {
    position: "BB",
    positionLabel: L("Big Blind", "บิ๊กบลายด์ (BB)"),
    hand: [
      { rank: "2", suit: "H" },
      { rank: "4", suit: "D" },
      { rank: "9", suit: "C" },
      { rank: "K", suit: "S" },
    ],
    finalHand: L(
      "King Badugi (K-9-4-2)",
      "King Badugi (K-9-4-2)",
    ),
    decision: "Defend",
    rationale: L(
      "Already $20 in — defend wide vs. a single raise. Reassess after draw 1: K-high loses most showdowns. Only 3-bet with premium 3-cards or 8-Badugi or better.",
      "ลงไป $20 แล้ว — ป้องกันให้กว้างเมื่อเจอเรสเดียว ประเมินใหม่หลังรอบจั่วที่ 1: K สูงแพ้โชว์ดาวน์เป็นส่วนใหญ่ 3-bet เฉพาะกับมือ 3 ใบพรีเมียม หรือ 8-Badugi ขึ้นไปเท่านั้น",
    ),
  },
];

const DECISION_COLOR: Record<Decision, string> = {
  Raise: "text-emerald-300",
  Call: "text-sky-300",
  Defend: "text-sky-300",
  Fold: "text-rose-400",
};

export function StartingHandsCarousel() {
  const { t, format } = useLocale();
  const [idx, setIdx] = useState(0);
  const total = POSITION_EXAMPLES.length;
  const current = POSITION_EXAMPLES[idx];

  const selectPosition = (pos: Position) => {
    const i = POSITION_EXAMPLES.findIndex((p) => p.position === pos);
    if (i !== -1) setIdx(i);
  };

  return (
    <figure className="mt-8 rounded-2xl border border-sky-400/20 bg-sky-400/[0.04] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
            {t(ui.startingHands.byPosition)}
          </figcaption>
          <span className="font-mono text-[11px] tabular-nums text-slate-400">
            {idx + 1} / {total}
          </span>
        </div>

        <div key={idx} className="example-fade">
          <div className="mt-3 flex items-baseline gap-2">
            <span className="rounded-md border border-sky-400/40 bg-sky-400/10 px-2 py-0.5 font-mono text-[11px] font-bold tracking-widest text-sky-200">
              {current.position}
            </span>
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {t(current.positionLabel)}
            </h3>
          </div>

          <div className="mt-5 flex flex-col items-center gap-2.5">
            <SixMaxTable
              activePosition={current.position}
              onSelect={selectPosition}
            />
            <span className="hint-pulse text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              {t(ui.startingHands.tapAnySeat)}
            </span>
          </div>

          <div className="mt-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {t(ui.startingHands.yourHand)}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {current.hand.map((c, i) => (
                <PlayingCard key={i} rank={c.rank} suit={c.suit} />
              ))}
            </div>
            <p className="mt-2 font-mono text-xs text-slate-300">
              {t(current.finalHand)}
            </p>
          </div>

          <div className="mt-5 flex items-baseline gap-3 border-l-2 border-sky-400/50 pl-4">
            <span
              className={[
                "font-black uppercase tracking-[0.2em]",
                "text-2xl sm:text-3xl",
                DECISION_COLOR[current.decision],
              ].join(" ")}
            >
              {t(ui.startingHands.decisions[current.decision])}
            </span>
          </div>
          <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-200/95 sm:text-[15px]">
            {t(current.rationale)}
          </p>
        </div>

        <div className="mt-5 flex justify-center gap-1.5">
          {POSITION_EXAMPLES.map((p, i) => (
            <button
              key={p.position}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={format(ui.startingHands.goToPosition, { pos: p.position })}
              className={[
                "block h-1.5 rounded-full transition-all duration-200",
                i === idx
                  ? "w-5 bg-sky-300"
                  : "w-1.5 bg-white/20 hover:bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
      </figure>
  );
}

const SEAT_POS: Record<Position, { x: number; y: number }> = {
  UTG: { x: 50, y: 12 },
  HJ: { x: 88, y: 32 },
  CO: { x: 88, y: 70 },
  BTN: { x: 50, y: 88 },
  SB: { x: 12, y: 70 },
  BB: { x: 12, y: 32 },
};

const POSITIONS: Position[] = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];

function SixMaxTable({
  activePosition,
  onSelect,
}: {
  activePosition: Position;
  onSelect: (position: Position) => void;
}) {
  const { t } = useLocale();
  return (
    <div
      className="relative w-full max-w-[280px]"
      style={{ aspectRatio: "5/3" }}
    >
      <div className="absolute inset-x-[18%] inset-y-[24%] rounded-full border border-emerald-500/30 bg-gradient-to-b from-emerald-700/15 to-emerald-900/30 shadow-[inset_0_2px_18px_rgba(16,185,129,0.15)]" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="text-[8px] font-semibold uppercase tracking-[0.22em] text-emerald-400/70">
          {t(ui.gameFlow.pot)}
        </div>
      </div>

      {POSITIONS.map((pos) => {
        const { x, y } = SEAT_POS[pos];
        const active = pos === activePosition;
        return (
          <div
            key={pos}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Seat
              label={pos}
              active={active}
              onClick={() => onSelect(pos)}
            />
          </div>
        );
      })}
    </div>
  );
}

function Seat({
  label,
  active,
  onClick,
}: {
  label: Position;
  active: boolean;
  onClick: () => void;
}) {
  const { format } = useLocale();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={format(ui.startingHands.showStartingHand, { pos: label })}
      aria-pressed={active}
      className={[
        "flex size-11 cursor-pointer items-center justify-center rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
        active
          ? "border-sky-300 bg-sky-400/25 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.7)]"
          : "border-white/10 bg-slate-900/60 text-slate-500 hover:border-sky-400/40 hover:bg-slate-900 hover:text-sky-200",
      ].join(" ")}
    >
      <span>{label}</span>
    </button>
  );
}
