export type SuitCode = "S" | "H" | "D" | "C";

export type CardCode = {
  rank: string;
  suit: SuitCode;
};

export type ExampleHand = {
  label?: string;
  cards: CardCode[];
};

export type Example = {
  scenario: string;
  hands?: ExampleHand[];
  takeaway: string;
};

export type LevelNode = {
  id: string;
  title: string;
  goal: string;
  points: string[];
  examples?: Example[];
};

export const levels: LevelNode[] = [
  {
    id: "0",
    title: "Orientation",
    goal: "Know what Badugi is and why it's different from other poker.",
    points: [
      "A 4-card lowball draw game (not 5 cards like most poker).",
      'The hand you are trying to make — called a "Badugi" — is 4 cards of different suits and different ranks.',
      'The best possible Badugi is A-2-3-4 of all four suits ("rainbow").',
      "You don't always need a complete Badugi to win — a strong 3-card often takes the pot.",
    ],
    examples: [{
      scenario: "What does the perfect Badugi look like?",
      hands: [
        {
          cards: [
            { rank: "A", suit: "C" },
            { rank: "2", suit: "D" },
            { rank: "3", suit: "H" },
            { rank: "4", suit: "S" },
          ],
        },
      ],
      takeaway: "Four cards, four suits, all low. This is the nuts — nothing beats it.",
    }],
  },
  {
    id: "1",
    title: "Foundations",
    goal: "Understand what makes a hand a Badugi and how hands compare.",
    points: [
      "A Badugi = 4 cards, all different suits, all different ranks.",
      "Aces are low. Straights don't matter.",
      "Compare highest card first, then next highest.",
      "If nobody has a Badugi: 3-card beats 2-card beats 1-card.",
    ],
    examples: [
      {
        scenario: "Two players reach showdown, both with an Eight Badugi.",
        hands: [
          {
            label: "Player A",
            cards: [
              { rank: "8", suit: "S" },
              { rank: "7", suit: "H" },
              { rank: "2", suit: "D" },
              { rank: "A", suit: "C" },
            ],
          },
          {
            label: "Player B — winner",
            cards: [
              { rank: "8", suit: "D" },
              { rank: "6", suit: "H" },
              { rank: "3", suit: "S" },
              { rank: "A", suit: "C" },
            ],
          },
        ],
        takeaway:
          "Same high card (8). Compare second-highest: B's 6 beats A's 7. B wins.",
      },
      {
        scenario:
          "One player has a complete Badugi. The other has a paired hand that drops to a 3-card.",
        hands: [
          {
            label: "Player A — winner",
            cards: [
              { rank: "J", suit: "S" },
              { rank: "8", suit: "H" },
              { rank: "4", suit: "D" },
              { rank: "2", suit: "C" },
            ],
          },
          {
            label: "Player B — pair of aces, drops to 3-card 5-3-A",
            cards: [
              { rank: "5", suit: "D" },
              { rank: "3", suit: "H" },
              { rank: "A", suit: "S" },
              { rank: "A", suit: "C" },
            ],
          },
        ],
        takeaway:
          "Even a weak Jack-Badugi beats any 3-card hand. Complete > incomplete — always.",
      },
      {
        scenario:
          "Neither player has a Badugi. Compare card counts before ranks.",
        hands: [
          {
            label: "Player A — 3-card (drops paired ace)",
            cards: [
              { rank: "7", suit: "S" },
              { rank: "4", suit: "D" },
              { rank: "A", suit: "C" },
              { rank: "A", suit: "H" },
            ],
          },
          {
            label: "Player B — 2-card (drops two diamonds)",
            cards: [
              { rank: "5", suit: "C" },
              { rank: "3", suit: "D" },
              { rank: "K", suit: "D" },
              { rank: "Q", suit: "D" },
            ],
          },
        ],
        takeaway:
          "Card count wins first. A's 3-card beats B's 2-card no matter the ranks. Same idea: 2-card beats 1-card.",
      },
    ],
  },
  {
    id: "2",
    title: "Game Flow",
    goal: "Know the order of operations in a hand.",
    points: [
      "Blinds posted, each player dealt 4 cards.",
      "Bet → Draw 1 → Bet → Draw 2 → Bet → Draw 3 → Final bet → Showdown.",
      "Typically fixed-limit, six-handed, three drawing rounds.",
      "Small bet on draw 1; big bet on draws 2 and 3.",
    ],
  },
  {
    id: "3",
    title: "Starting Hands",
    goal: "Pick hands that can actually win.",
    points: [
      "Early position: 3 cards of different suits, each card ranked 7 or lower.",
      "Late position: 2 wheel cards (A-2, A-3, A-4).",
      "Premium: A-2 or A-2-3 rainbow → raise / re-raise.",
      "Aim for a 7-Badugi or better. Eights are marginal.",
      "Small blind: take an aggressive line — raise or fold. Flatting lets the BB realize equity cheaply.",
      "Big blind: defend wide vs. a single raise — you're already in for one bet, take the price.",
    ],
  },
  {
    id: "4",
    title: "Position",
    goal: "Use being last-to-act as information.",
    points: [
      "Last to act sees opponents' discard counts before deciding.",
      "Position widens your opening range.",
      "Snowing usually only works in position — you need to react to opponents' draws.",
    ],
    examples: [{
      scenario: "On the button. Two opponents drew 2 cards each on draw 1.",
      takeaway:
        "They're weak. Even with a marginal hand you can apply pressure with confidence — they have to outdraw you twice more.",
    }],
  },
  {
    id: "5",
    title: "Reading Draws",
    goal: "Read opponents from how many cards they take.",
    points: [
      "0 (pat): strong hand or a snow.",
      "1: drawing to a Badugi or a strong 3-card.",
      "2 or more: weak holding, vulnerable.",
    ],
    examples: [{
      scenario: "Opponent stays pat on the second draw.",
      takeaway:
        "Assume a made Badugi, probably 8 or better. Your J-Badugi is no longer a value bet — check and reconsider.",
    }],
  },
  {
    id: "6",
    title: "Drawing Strategy",
    goal: "Make good draw / pat / fold decisions on each street.",
    points: [
      "While drawing, a strong 2-card (A-2) often has more equity than a weak 3-card (T-3-A) — even though 3-cards beat 2-cards at showdown, the 2-card here is drawing to a much lower Badugi.",
      "Bet a strong 3-card for value when both players are still drawing one on the last street.",
      "Don't get attached to a bad made Badugi under heavy aggression.",
      "Card-removal: every card you've seen is one your opponents can't get.",
    ],
    examples: [{
      scenario: "After the first draw you hold:",
      hands: [
        {
          cards: [
            { rank: "2", suit: "S" },
            { rank: "3", suit: "H" },
            { rank: "7", suit: "C" },
            { rank: "7", suit: "D" },
          ],
        },
      ],
      takeaway:
        "Discard the 7♦. You now have a 3-card 7-Badugi (2-3-7 rainbow), drawing one to a top-tier hand.",
    }],
  },
  {
    id: "7",
    title: "Snowing",
    goal: "Represent a Badugi you don't have, credibly.",
    points: [
      "Best with a monotone hand — you block lots of one suit.",
      "Best in position so you can react to opponents' draws.",
      "Setup: discard 1–2 on draw 1, then 1 on draw 2, then stay pat on draw 3 and bet.",
      "Discarding 3+ on draw 1 breaks the story — opponents won't believe your pat later. Aim for the count a real drawing hand would take.",
      "If you never get caught snowing, you're not snowing enough.",
    ],
    examples: [{
      scenario: "You're dealt four spades.",
      hands: [
        {
          cards: [
            { rank: "2", suit: "S" },
            { rank: "5", suit: "S" },
            { rank: "8", suit: "S" },
            { rank: "J", suit: "S" },
          ],
        },
      ],
      takeaway:
        "You block 4 of 13 spades. Stand pat from draw 2 and bet — opponents drawing one are far less likely to hit a Badugi.",
    }],
  },
  {
    id: "8",
    title: "Pot Odds & Sizing",
    goal: "Stop calling reflexively on big-bet streets.",
    points: [
      '"Just one more bet" calls compound — they separate winners from losers.',
      "Estimate completion odds vs. the pot price before each call.",
      "In Pot Limit Badugi, use sizing to squeeze drawing opponents off equity.",
    ],
    examples: [{
      scenario: "Pot is $80. Opponent bets $40 on the second draw.",
      takeaway:
        "Calling $40 to win $120 needs ~25% equity. A 3-card draw to A-2-3 is borderline. A weak 2-card draw is a fold.",
    }],
  },
  {
    id: "9",
    title: "Live Practice",
    goal: "Convert knowledge into instinct.",
    points: [
      "Play low-stakes online or a home-game mix.",
      "Keep a session journal: starting hands, draws, snows, results.",
      "Review one losing hand and one winning hand per session.",
      "Track only one leak at a time.",
    ],
    examples: [{
      scenario: "Session journal entry.",
      takeaway:
        '"6 hands, +$14. Snowed once (called by 9-Badugi). Lesson: tighten 8-Badugi value bets vs heavy 3-bets."',
    }],
  },
];
