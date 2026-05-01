# Badugi Learning Tree

A staged path from "never heard of it" to confidently playing Badugi in mixed games. Work top to bottom — each level assumes the previous one is solid.

```
                       ┌──────────────────────────┐
                       │   0. Orientation         │
                       │   What & why             │
                       └─────────────┬────────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │   1. Foundations         │
                       │   Rules · Hand ranking   │
                       └─────────────┬────────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │   2. Game Flow           │
                       │   Blinds · Draws · Bets  │
                       └─────────────┬────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
   ┌──────────▼────────┐  ┌──────────▼────────┐  ┌──────────▼────────┐
   │ 3a. Starting      │  │ 3b. Position &    │  │ 3c. Reading       │
   │     Hands         │  │     Order         │  │     Draw Counts   │
   └──────────┬────────┘  └──────────┬────────┘  └──────────┬────────┘
              │                      │                      │
              └──────────────────────┼──────────────────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │   4. Drawing Strategy    │
                       │   Improve · Pat · Fold   │
                       └─────────────┬────────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │   5. Snowing (Bluffing)  │
                       │   Card removal · Lines   │
                       └─────────────┬────────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │   6. Pot Odds & Bet      │
                       │      Sizing              │
                       └─────────────┬────────────┘
                                     │
                       ┌─────────────▼────────────┐
                       │   7. Live Practice       │
                       │   Low stakes · Review    │
                       └──────────────────────────┘
```

---

## Level 0 — Orientation

**Goal:** know what Badugi is and why it's different from other poker.

- It's a **4-card lowball draw** game (not 5 cards like most poker).
- The best hand is **A-2-3-4 of all four suits** ("rainbow").
- You don't always need a complete Badugi to win — a good 3-card hand often takes the pot.

📚 Read: [`pokerstars-badugi-rules.md`](./pokerstars-badugi-rules.md) — *What Is Badugi Poker?*

---

## Level 1 — Foundations

**Goal:** understand what makes a hand a Badugi and how hands compare.

- A Badugi = 4 cards, **all different suits, all different ranks**.
- Aces are **low**. Straights don't matter.
- Hand strength: compare highest card first, then next highest.
- If nobody has a Badugi: 3-card > 2-card > 1-card.

✅ **Checkpoint:** rank these hands fastest-to-best.

1. K-Q-J-T (rainbow)
2. 8-7-2-A (rainbow)
3. 4-3-2-A (rainbow)
4. 7-5-3 + paired/duplicate-suit junk (3-card)

📚 Read: [`pokerstars-badugi-rules.md`](./pokerstars-badugi-rules.md) — *Hand Rankings*
📚 Read: [`pokerstars-how-to-play-badugi.md`](./pokerstars-how-to-play-badugi.md) — *Hand Strengths*

---

## Level 2 — Game Flow

**Goal:** know the order of operations in a hand.

1. Blinds posted (small + big).
2. Each player dealt 4 cards face down.
3. **Betting round 1** → **Draw 1** (discard 0–4 cards).
4. **Betting round 2** → **Draw 2**.
5. **Betting round 3** → **Draw 3**.
6. **Final betting round** → showdown.

Format: typically **fixed-limit** triple-draw, six-handed. Small bet on draw 1, big bet on draws 2 & 3.

📚 Read: [`pokerstars-how-to-play-badugi.md`](./pokerstars-how-to-play-badugi.md) — *Gameplay*
📚 Read: [`badugi-poker-101.md`](./badugi-poker-101.md) — *Rule 2: Game Format*

---

## Level 3 — Pre-Draw Fundamentals (parallel topics)

### 3a. Starting Hands

| Position | Minimum playable hand |
|---|---|
| Early | 3 cards, different suits, all 7-or-below |
| Late | 2 cards in the wheel (A-2, A-3, A-4) |
| Premium (any pos.) | A-2 or A-2-3 rainbow → raise / re-raise |

Aim for a **7-Badugi or better**. Eights are marginal. Avoid drawing to nines or tens.

### 3b. Position

- Last to act = best position. You see how many cards opponents draw before you decide.
- Position widens your opening range and is what makes snowing possible.

### 3c. Reading Draw Counts

Before each draw, count cards your opponents take:

- **0 (pat)** → strong hand or a snow.
- **1** → drawing to a Badugi or a strong 3-card.
- **2+** → weak holding, vulnerable.

📚 Read: [`badugi-poker-101.md`](./badugi-poker-101.md) — *Strategy 1, 2, 3*

---

## Level 4 — Drawing Strategy

**Goal:** make good draw/pat/fold decisions on each street.

- A strong **2-card draw** often beats a weak **3-card draw** — don't get stuck on a J-high Badugi.
- It's fine to bet a strong **3-card hand** for value when both players are still drawing one on the last street.
- Don't get attached to a bad made Badugi if you face heavy aggression.
- Card-removal awareness: every card you've seen is a card opponents can't get.

✅ **Checkpoint:** for each scenario, decide draw/pat/fold.

- You hold A-2-3 rainbow + a King. Opponent draws 1.
- You hold 8-7-4 rainbow + a 9 of a duplicate suit. Opponent stays pat.
- You hold J-T-9 rainbow + a duplicate. Opponent draws 1.

📚 Read: [`pokerstars-how-to-play-badugi.md`](./pokerstars-how-to-play-badugi.md) — *Tips and Strategy*
📚 Read: [`badugi-poker-101.md`](./badugi-poker-101.md) — *Hand Examples / Example 1*

---

## Level 5 — Snowing (Bluffing)

**Goal:** know when to represent a Badugi you don't have.

Good snow candidates:

- You have a **monotone** or near-monotone hand (lots of one suit blocked).
- Opponents are still drawing on the last draw and need a card from your blocked suit.
- You're **in position** so you can react to their draws.

Setup pattern (from the transcript example):

1. Draw 1: dump junk, keep your blocker(s).
2. Draw 2: discard one to keep selling the story.
3. Draw 3: **stay pat**, bet, and bet again on the river.

If you're never getting caught snowing, you're not snowing enough.

📚 Read: [`badugi-poker-101.md`](./badugi-poker-101.md) — *What Is Snowing?* and *Snowing Examples*

---

## Level 6 — Pot Odds & Bet Sizing

**Goal:** stop calling reflexively on big-bet streets.

- In fixed-limit, "just one more bet" calls compound — they are the gap between winning and losing players.
- Estimate your odds of completing your draw vs. the pot price before each call.
- In Pot Limit Badugi, use bet sizing as a weapon — squeeze drawing opponents off marginal equity.

📚 Read: [`pokerstars-how-to-play-badugi.md`](./pokerstars-how-to-play-badugi.md) — *Are you getting the right price?*

---

## Level 7 — Live Practice

**Goal:** convert knowledge into instinct.

- Play **low-stakes online** Badugi or a home-game mix.
- Keep a session journal: starting hands, draw decisions, snows attempted, results.
- After each session, review one losing hand and one winning hand.
- Track only one leak at a time (e.g., "stop drawing to T-Badugis this week").

---

## Quick Reference

| Need | File |
|---|---|
| Rules cheat-sheet | [`pokerstars-badugi-rules.md`](./pokerstars-badugi-rules.md) |
| Strategy summary | [`pokerstars-how-to-play-badugi.md`](./pokerstars-how-to-play-badugi.md) |
| Long-form walk-through with examples | [`badugi-poker-101.md`](./badugi-poker-101.md) |
