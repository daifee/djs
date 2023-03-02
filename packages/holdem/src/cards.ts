
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

function createCard(suit: TSuit, value: TValue): Card {
  return {
    suit,
    value
  };
}

export function createCards(): Card[] {
  const cards: Card[] = [];

  Values.forEach((value) => {
    Suits.forEach((suit) => {
      cards.push(createCard(suit, value));
    });
  });

  return cards;
}
