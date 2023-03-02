
export const Suits = ['club', 'diamond', 'heart', 'spade'] as const;

export type TSuit = typeof Suits[number];

export const Values = [
  'A', 'K', 'Q', 'J',
  '10', '9', '8', '7', '6', '5', '4', '3', '2'
] as const;

export type TValue = typeof Values[number];

export interface Card {
  suit: TSuit
  value: TValue
}

export type Cards = Card[];

function createCard(suit: TSuit, value: TValue): Card {
  return {
    suit,
    value
  };
}

export function createCards(shuffled: boolean = false): Cards {
  const cards: Card[] = [];

  Values.forEach((value) => {
    Suits.forEach((suit) => {
      cards.push(createCard(suit, value));
    });
  });

  if (shuffled) {
    shuffle(cards);
  }

  return cards;
}

export function getId(card: Card): string {
  return `${card.value}-${card.suit}`;
}

function shuffle(cards: Cards): void {
  const temp: Cards = [];
  while (cards.length > 0) {
    // 随机抽牌
    const index = randomIndex(cards);
    const card = cards[index];
    cards.splice(index, 1);

    temp.push(card);
  }

  temp.forEach((card) => {
    cards.push(card);
  });
}

function randomIndex(cards: Cards): number {
  const max = cards.length;
  const index = Math.floor(Math.random() * max);
  return index;
}
