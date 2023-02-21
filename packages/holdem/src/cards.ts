
export const SUITS = {
  CLUB: 'club',
  DIAMOND: 'diamond',
  HEART: 'heart',
  SPADE: 'spade'
} as const;

export type TSuits = typeof SUITS[keyof typeof SUITS];

export const VALUES = {
  ACE: 'A',
  KING: 'K',
  QUEEN: 'Q',
  JACK: 'J',
  TEN: '10',
  NINE: '9',
  EIGHT: '8',
  SEVEN: '7',
  SIX: '6',
  FIVE: '5',
  FOUR: '4',
  THREE: '3',
  TWO: '2'
} as const;

export type TValues = typeof VALUES[keyof typeof VALUES];

export interface Card {
  suit: TSuits
  value: TValues
}

function createCard(suit: TSuits, value: TValues): Card {
  return {
    suit,
    value
  };
}

export function createCards(): Card[] {
  const cards: Card[] = [];

  Object.keys(VALUES).forEach((valueKey) => {
    const valueKey1 = valueKey as keyof typeof VALUES;
    const value = VALUES[valueKey1] as TValues;

    Object.keys(SUITS).forEach((suitKey) => {
      const suitKey1 = suitKey as keyof typeof SUITS;
      const suit = SUITS[suitKey1];

      cards.push(createCard(suit, value));
    });
  });

  return cards;
}
