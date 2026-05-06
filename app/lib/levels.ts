import { L, type LocalizedString } from "@/app/lib/i18n";

export type SuitCode = "S" | "H" | "D" | "C";

export type CardCode = {
  rank: string;
  suit: SuitCode;
};

export type ExampleHand = {
  label?: LocalizedString;
  cards: CardCode[];
};

export type Example = {
  scenario: LocalizedString;
  hands?: ExampleHand[];
  takeaway: LocalizedString;
};

export type LevelNode = {
  id: string;
  title: LocalizedString;
  goal: LocalizedString;
  points: LocalizedString[];
  examples?: Example[];
};

export const levels: LevelNode[] = [
  {
    id: "0",
    title: L("Orientation", "ปฐมนิเทศ"),
    goal: L(
      "Know what Badugi is and why it's different from other poker.",
      "รู้ว่า Badugi คืออะไร และต่างจากโป๊กเกอร์อื่นอย่างไร",
    ),
    points: [
      L(
        "A 4-card lowball draw game (not 5 cards like most poker).",
        "เกมจั่วไพ่โลว์บอล 4 ใบ (ไม่ใช่ 5 ใบเหมือนโป๊กเกอร์ทั่วไป)",
      ),
      L(
        'The hand you are trying to make — called a "Badugi" — is 4 cards of different suits and different ranks.',
        'มือที่คุณพยายามทำ — เรียกว่า "Badugi" — คือไพ่ 4 ใบที่ต่างดอกและต่างค่ากันทั้งหมด',
      ),
      L(
        'The best possible Badugi is A-2-3-4 of all four suits ("rainbow").',
        'Badugi ที่ดีที่สุดคือ A-2-3-4 ครบทั้งสี่ดอก (เรียกว่า "เรนโบว์")',
      ),
      L(
        "You don't always need a complete Badugi to win — a strong 3-card often takes the pot.",
        "ไม่จำเป็นต้องได้ Badugi ทุกครั้งถึงจะชนะ — มือ 3 ใบที่แข็งแกร่งก็มักจะชนะเงินกองกลางได้",
      ),
    ],
    examples: [
      {
        scenario: L(
          "What does the perfect Badugi look like?",
          "Badugi ที่สมบูรณ์แบบหน้าตาเป็นอย่างไร?",
        ),
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
        takeaway: L(
          "Four cards, four suits, all low. This is the nuts — nothing beats it.",
          "ไพ่สี่ใบ สี่ดอก ค่าต่ำทั้งหมด นี่คือมือที่ดีที่สุด — ไม่มีอะไรชนะได้",
        ),
      },
    ],
  },
  {
    id: "1",
    title: L("Foundations", "พื้นฐาน"),
    goal: L(
      "Understand what makes a hand a Badugi and how hands compare.",
      "เข้าใจว่าอะไรทำให้มือเป็น Badugi  และวิธีเปรียบเทียบมือ",
    ),
    points: [
      L(
        "A Badugi = 4 cards, all different suits, all different ranks.",
        "Badugi  = ไพ่ 4 ใบ ต่างดอกทั้งหมด ต่างค่าทั้งหมด",
      ),
      L(
        "Aces are low. Straights don't matter.",
        "A เป็นไพ่ต่ำสุด สเตรทไม่นับ",
      ),
      L(
        "Compare highest card first, then next highest.",
        "เปรียบเทียบไพ่สูงสุดก่อน แล้วค่อยเทียบใบถัดไป",
      ),
      L(
        "If nobody has a Badugi: 3-card beats 2-card beats 1-card.",
        "ถ้าไม่มีใครได้ Badugi : มือ 3 ใบชนะ 2 ใบ และ 2 ใบชนะ 1 ใบ",
      ),
    ],
    examples: [
      {
        scenario: L(
          "Two players reach showdown, both with an Eight Badugi.",
          "ผู้เล่นสองคนเข้าโชว์ดาวน์ ทั้งคู่ได้ 8 Badugi",
        ),
        hands: [
          {
            label: L("Player A", "ผู้เล่น A"),
            cards: [
              { rank: "8", suit: "S" },
              { rank: "7", suit: "H" },
              { rank: "2", suit: "D" },
              { rank: "A", suit: "C" },
            ],
          },
          {
            label: L("Player B — winner", "ผู้เล่น B — ผู้ชนะ"),
            cards: [
              { rank: "8", suit: "D" },
              { rank: "6", suit: "H" },
              { rank: "3", suit: "S" },
              { rank: "A", suit: "C" },
            ],
          },
        ],
        takeaway: L(
          "Same high card (8). Compare second-highest: B's 6 beats A's 7. B wins.",
          "ไพ่สูงสุดเท่ากัน (8) เทียบใบที่สูงรองลงมา: 6 ของ B ชนะ 7 ของ A — B เป็นผู้ชนะ",
        ),
      },
      {
        scenario: L(
          "One player has a complete Badugi. The other has a paired hand that drops to a 3-card.",
          "ผู้เล่นคนหนึ่งได้Badugi ครบ อีกคนมีไพ่คู่จึงลดเหลือมือ 3 ใบ",
        ),
        hands: [
          {
            label: L("Player A — winner", "ผู้เล่น A — ผู้ชนะ"),
            cards: [
              { rank: "J", suit: "S" },
              { rank: "8", suit: "H" },
              { rank: "4", suit: "D" },
              { rank: "2", suit: "C" },
            ],
          },
          {
            label: L(
              "Player B — pair of aces, drops to 3-card 5-3-A",
              "ผู้เล่น B — Aคู่ ลดเหลือมือ 3 ใบ 5-3-A",
            ),
            cards: [
              { rank: "5", suit: "D" },
              { rank: "3", suit: "H" },
              { rank: "A", suit: "S" },
              { rank: "A", suit: "C" },
            ],
          },
        ],
        takeaway: L(
          "Even a weak Jack-Badugi beats any 3-card hand. Complete > incomplete — always.",
          "แม้แต่ Jack-Badugi ที่อ่อนก็ชนะมือ 3 ใบทุกแบบ ครบ > ไม่ครบ — เสมอ",
        ),
      },
      {
        scenario: L(
          "Neither player has a Badugi. Compare card counts before ranks.",
          "ไม่มีใครได้Badugi  เปรียบเทียบจำนวนใบก่อนเปรียบเทียบค่า",
        ),
        hands: [
          {
            label: L(
              "Player A — 3-card (drops paired ace)",
              "ผู้เล่น A — มือ 3 ใบ (ทิ้งAที่จับคู่)",
            ),
            cards: [
              { rank: "7", suit: "S" },
              { rank: "4", suit: "D" },
              { rank: "A", suit: "C" },
              { rank: "A", suit: "H" },
            ],
          },
          {
            label: L(
              "Player B — 2-card (drops two diamonds)",
              "ผู้เล่น B — มือ 2 ใบ (ทิ้งข้าวหลามตัดสองใบ)",
            ),
            cards: [
              { rank: "5", suit: "C" },
              { rank: "3", suit: "D" },
              { rank: "K", suit: "D" },
              { rank: "Q", suit: "D" },
            ],
          },
        ],
        takeaway: L(
          "Card count wins first. A's 3-card beats B's 2-card no matter the ranks. Same idea: 2-card beats 1-card.",
          "จำนวนใบสำคัญก่อน มือ 3 ใบของ A ชนะมือ 2 ใบของ B ไม่ว่าค่าจะเป็นอะไร หลักเดียวกัน: 2 ใบชนะ 1 ใบ",
        ),
      },
    ],
  },
  {
    id: "2",
    title: L("Game Flow", "ลำดับการเล่น"),
    goal: L(
      "Know the order of operations in a hand.",
      "รู้ลำดับขั้นตอนของแต่ละมือ",
    ),
    points: [
      L(
        "Blinds posted, each player dealt 4 cards.",
        "วางบลายด์ ผู้เล่นแต่ละคนได้รับไพ่ 4 ใบ",
      ),
      L(
        "Bet → Draw 1 → Bet → Draw 2 → Bet → Draw 3 → Final bet → Showdown.",
        "เดิมพัน → จั่วครั้งที่ 1 → เดิมพัน → จั่วครั้งที่ 2 → เดิมพัน → จั่วครั้งที่ 3 → เดิมพันสุดท้าย → โชว์ดาวน์",
      ),
      L(
        "Typically fixed-limit, six-handed, three drawing rounds.",
        "โดยทั่วไปเป็น Fixed Limit เล่น 6 คน มีรอบจั่ว 3 รอบ",
      ),
      L(
        "Small bet on draw 1; big bet on draws 2 and 3.",
        "เดิมพันเล็กในรอบจั่วที่ 1 และเดิมพันใหญ่ในรอบจั่วที่ 2 และ 3",
      ),
    ],
  },
  {
    id: "3",
    title: L("Starting Hands", "มือเริ่มต้น"),
    goal: L(
      "Pick hands that can actually win.",
      "เลือกมือที่มีโอกาสชนะจริง",
    ),
    points: [
      L(
        "Early position: 3 cards of different suits, each card ranked 7 or lower.",
        "ตำแหน่งต้น: ไพ่ 3 ใบต่างดอก แต่ละใบค่า 7 หรือต่ำกว่า",
      ),
      L(
        "Late position: 2 wheel cards (A-2, A-3, A-4).",
        "ตำแหน่งท้าย: ไพ่ wheel 2 ใบ (A-2, A-3, A-4)",
      ),
      L(
        "Premium: A-2 or A-2-3 rainbow → raise / re-raise.",
        "พรีเมียม: A-2 หรือ A-2-3 เรนโบว์ → เรส / รีเรส",
      ),
      L(
        "Aim for a 7-Badugi or better. Eights are marginal.",
        "ตั้งเป้าที่ 7-Badugi หรือดีกว่า แปดถือว่าก้ำกึ่ง",
      ),
      L(
        "Small blind: take an aggressive line — raise or fold. Flatting lets the BB realize equity cheaply.",
        "Small blind: เล่นบุก — เรสหรือหมอบ การคอลทำให้ BB เก็บอิควิตี้ได้ในราคาถูก",
      ),
      L(
        "Big blind: defend wide vs. a single raise — you're already in for one bet, take the price.",
        "Big blind: ป้องกันให้กว้างเมื่อเจอเรสเดียว — คุณลงไปหนึ่ง bb แล้ว คอลคุ้ม",
      ),
    ],
  },
  {
    id: "4",
    title: L("Position", "ตำแหน่ง"),
    goal: L(
      "Use being last-to-act as information.",
      "ใช้การได้ act หลังสุดเป็นข้อมูลช่วยตัดสินใจ",
    ),
    points: [
      L(
        "Last to act sees opponents' discard counts before deciding.",
        "ผู้ที่ act หลังสุดเห็นจำนวนใบที่คู่ต่อสู้ทิ้งก่อนตัดสินใจ",
      ),
      L(
        "Position widens your opening range.",
        "ตำแหน่งช่วยให้เปิดมือได้กว้างขึ้น",
      ),
      L(
        "Snowing usually only works in position — you need to react to opponents' draws.",
        "การ snow มักได้ผลเฉพาะเมื่ออยู่ใน position — ต้องอ่านการจั่วของคู่ต่อสู้",
      ),
    ],
    examples: [
      {
        scenario: L(
          "On the button. Two opponents drew 2 cards each on draw 1.",
          "อยู่บน Button คู่ต่อสู้สองคนต่างจั่ว 2 ใบในรอบจั่วที่ 1",
        ),
        takeaway: L(
          "They're weak. Even with a marginal hand you can apply pressure with confidence — they have to outdraw you twice more.",
          "พวกเขาอ่อน แม้คุณมีมือก้ำกึ่งก็กดดันได้อย่างมั่นใจ — พวกเขาต้องจั่วเอาชนะคุณอีกสองครั้ง",
        ),
      },
    ],
  },
  {
    id: "5",
    title: L("Reading Draws", "อ่านการจั่ว"),
    goal: L(
      "Read opponents from how many cards they take.",
      "อ่านคู่ต่อสู้จากจำนวนใบที่จั่ว",
    ),
    points: [
      L("0 (pat): strong hand or a snow.", "0 ใบ (อยู่นิ่ง): มือแข็งหรือกำลัง snow"),
      L(
        "1: drawing to a Badugi or a strong 3-card.",
        "1 ใบ: จั่วลุ้น Badugi หรือมือ 3 ใบที่แข็ง",
      ),
      L(
        "2 or more: weak holding, vulnerable.",
        "2 ใบขึ้นไป: มือถืออ่อน เปราะบาง",
      ),
    ],
    examples: [
      {
        scenario: L(
          "Opponent stays pat on the second draw.",
          "คู่ต่อสู้อยู่นิ่งในรอบจั่วที่ 2",
        ),
        takeaway: L(
          "Assume a made Badugi, probably 8 or better. Your J-Badugi is no longer a value bet — check and reconsider.",
          "สันนิษฐานว่าได้ Badugi แล้ว น่าจะ 8 หรือดีกว่า J-Badugi ของคุณไม่ใช่เบ็ตเอาคุณค่าอีกต่อไป — เช็คแล้วคิดใหม่",
        ),
      },
    ],
  },
  {
    id: "6",
    title: L("Drawing Strategy", "กลยุทธ์การจั่ว"),
    goal: L(
      "Make good draw / pat / fold decisions on each street.",
      "ตัดสินใจจั่ว / อยู่นิ่ง / หมอบให้ดีในแต่ละรอบ",
    ),
    points: [
      L(
        "While drawing, a strong 2-card (A-2) often has more equity than a weak 3-card (T-3-A) — even though 3-cards beat 2-cards at showdown, the 2-card here is drawing to a much lower Badugi.",
        "ระหว่างที่ยังจั่วอยู่ มือ 2 ใบที่แข็ง (A-2) มักมีอิควิตี้มากกว่ามือ 3 ใบที่อ่อน (T-3-A) — แม้ตอนโชว์ดาวน์ 3 ใบจะชนะ 2 ใบ แต่ที่นี่ 2 ใบกำลังจั่วลุ้น Badugi ที่ต่ำกว่ามาก",
      ),
      L(
        "Bet a strong 3-card for value when both players are still drawing one on the last street.",
        "เดิมพันมือ 3 ใบที่แข็งเพื่อเอาคุณค่า เมื่อผู้เล่นทั้งสองยังจั่วอีกหนึ่งใบในรอบสุดท้าย",
      ),
      L(
        "Don't get attached to a bad made Badugi under heavy aggression.",
        "อย่ายึดติดกับ Badugi ที่ทำได้แต่อ่อนเมื่อเจอการบุกหนัก",
      ),
      L(
        "Card-removal: every card you've seen is one your opponents can't get.",
        "Card removal: ทุกใบที่คุณเห็นแล้วคือใบที่คู่ต่อสู้จะไม่ได้",
      ),
    ],
    examples: [
      {
        scenario: L("After the first draw you hold:", "หลังรอบจั่วแรก คุณถือ:"),
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
        takeaway: L(
          "Discard the 7♦. You now have a 3-card 7-Badugi (2-3-7 rainbow), drawing one to a top-tier hand.",
          "ทิ้ง 7♦ ตอนนี้คุณมีมือ 3 ใบ 7-Badugi (2-3-7 เรนโบว์) จั่วอีกหนึ่งใบเพื่อให้ได้มือระดับท็อป",
        ),
      },
    ],
  },
  {
    id: "7",
    title: L("Snowing", "การ Snow (บลัฟอยู่นิ่ง)"),
    goal: L(
      "Represent a Badugi you don't have, credibly.",
      "แสดงท่าว่ามี Badugi ที่จริง ๆ ไม่มี ให้น่าเชื่อ",
    ),
    points: [
      L(
        "Best with a monotone hand — you block lots of one suit.",
        "ดีที่สุดเมื่อได้ไพ่ดอกเดียวกันทั้งหมด — คุณบล็อกใบของดอกนั้นได้เยอะ",
      ),
      L(
        "Best in position so you can react to opponents' draws.",
        "ดีที่สุดเมื่ออยู่ใน position เพื่ออ่านการจั่วของคู่ต่อสู้",
      ),
      L(
        "Setup: discard 1–2 on draw 1, then 1 on draw 2, then stay pat on draw 3 and bet.",
        "การตั้งเรื่อง: ทิ้ง 1–2 ใบในรอบจั่วที่ 1 จากนั้นทิ้ง 1 ใบในรอบจั่วที่ 2 แล้วอยู่นิ่งในรอบจั่วที่ 3 พร้อมเดิมพัน",
      ),
      L(
        "Discarding 3+ on draw 1 breaks the story — opponents won't believe your pat later. Aim for the count a real drawing hand would take.",
        "ทิ้ง 3 ใบขึ้นไปในรอบแรกทำให้เรื่องราวไม่เนียน — คู่ต่อสู้จะไม่เชื่อตอนคุณอยู่นิ่งในภายหลัง ให้ทิ้งจำนวนเท่ากับที่มือจริง ๆ จะทิ้ง",
      ),
      L(
        "If you never get caught snowing, you're not snowing enough.",
        "ถ้าไม่เคยถูกจับได้ตอน snow แสดงว่าคุณ snow น้อยเกินไป",
      ),
    ],
    examples: [
      {
        scenario: L("You're dealt four spades.", "คุณได้ไพ่โพดำสี่ใบ"),
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
        takeaway: L(
          "You block 4 of 13 spades. Stand pat from draw 2 and bet — opponents drawing one are far less likely to hit a Badugi.",
          "คุณบล็อกโพดำ 4 ใน 13 ใบ อยู่นิ่งตั้งแต่รอบจั่วที่ 2 แล้วเดิมพัน — คู่ต่อสู้ที่จั่วอีกหนึ่งใบจะมีโอกาสได้ Badugi น้อยลงมาก",
        ),
      },
    ],
  },
  {
    id: "8",
    title: L("Pot Odds & Sizing", "Pot Odds และการกำหนดขนาดเดิมพัน"),
    goal: L(
      "Stop calling reflexively on big-bet streets.",
      "เลิกคอลด้วยปฏิกิริยาในรอบเดิมพันใหญ่",
    ),
    points: [
      L(
        '"Just one more bet" calls compound — they separate winners from losers.',
        '"คอลอีกแค่หนึ่งเบ็ต" สะสมขึ้นเรื่อย ๆ — เป็นเส้นแบ่งระหว่างผู้ชนะและผู้แพ้',
      ),
      L(
        "Estimate completion odds vs. the pot price before each call.",
        "ประเมินโอกาสที่มือจะสมบูรณ์เทียบกับราคาในพอตก่อนคอลทุกครั้ง",
      ),
      L(
        "In Pot Limit Badugi, use sizing to squeeze drawing opponents off equity.",
        "ใน Pot Limit Badugi ใช้ขนาดเดิมพันบีบให้คู่ต่อสู้ที่จั่วอยู่เสียอิควิตี้",
      ),
    ],
    examples: [
      {
        scenario: L(
          "Pot is $80. Opponent bets $40 on the second draw.",
          "พอต $80 คู่ต่อสู้เดิมพัน $40 ในรอบจั่วที่ 2",
        ),
        takeaway: L(
          "Calling $40 to win $120 needs ~25% equity. A 3-card draw to A-2-3 is borderline. A weak 2-card draw is a fold.",
          "คอล $40 เพื่อลุ้น $120 ต้องการอิควิตี้ราว 25% มือ 3 ใบที่จั่วลุ้น A-2-3 อยู่ก้ำกึ่ง ส่วนมือ 2 ใบที่อ่อน — หมอบ",
        ),
      },
    ],
  },
  {
    id: "9",
    title: L("Live Practice", "ฝึกเล่นจริง"),
    goal: L(
      "Convert knowledge into instinct.",
      "เปลี่ยนความรู้ให้กลายเป็นสัญชาตญาณ",
    ),
    points: [
      L(
        "Play low-stakes online or a home-game mix.",
        "เล่นออนไลน์เดิมพันต่ำ หรือเกมที่บ้านแบบผสม",
      ),
      L(
        "Keep a session journal: starting hands, draws, snows, results.",
        "จดบันทึกการเล่นแต่ละครั้ง: มือเริ่มต้น การจั่ว การ snow ผลลัพธ์",
      ),
      L(
        "Review one losing hand and one winning hand per session.",
        "รีวิวมือที่แพ้หนึ่งมือและมือที่ชนะหนึ่งมือต่อการเล่นหนึ่งครั้ง",
      ),
      L(
        "Track only one leak at a time.",
        "แก้จุดอ่อนทีละจุดเดียว",
      ),
    ],
    examples: [
      {
        scenario: L("Session journal entry.", "ตัวอย่างบันทึกการเล่นหนึ่งครั้ง"),
        takeaway: L(
          '"6 hands, +$14. Snowed once (called by 9-Badugi). Lesson: tighten 8-Badugi value bets vs heavy 3-bets."',
          '"6 มือ, +$14 Snow หนึ่งครั้ง (โดน 9-Badugi คอล) บทเรียน: ลดการเบ็ตเอาคุณค่าด้วย 8-Badugi เมื่อเจอ 3-bet หนัก"',
        ),
      },
    ],
  },
];
