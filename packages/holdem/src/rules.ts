
/**
 * 牌型：
 * 1. 皇家同花顺 Royal Straight Flush
 * 2. 同花顺 Straight Flush
 * 3. 金刚 Four of a kind
 * 4. 葫芦 Full house
 * 5. 同花 Flush
 * 6. 顺子 Straight
 * 7. 三条 Three of a kind
 * 8. 两对 Two pair
 * 9. 对子 Pair
 * 10. 高牌 High card
 *
 * 比较大小
 */

import { Card } from './cards';

export interface Cards extends Array<Card> {
  length: 5
  [key: number]: Card
}

export const Patterns = {
  Royal_Straight_Flush: 'Royal_Straight_Flush',
  Straight_Flush: 'Straight_Flush',
  Four_of_a_kind: 'Four_of_a_kind',
  Full_house: 'Full_house',
  Flush: 'Flush',
  Straight: 'Straight',
  Three_of_a_kind: 'Three_of_a_kind',
  Two_pair: 'Two_pair',
  Pair: 'Pair',
  High_Card: 'High_Card'
} as const;

export type TPattern = typeof Patterns[keyof typeof Patterns];

export type GroupedCards = Card[][];

export class CardsModel {
  declare pattern: TPattern;
  source: Cards;
  sorted: Cards;
  grouped: GroupedCards;

  constructor(cards: Cards) {
    this.source = cards;
    this.sorted = createSortedCards(this.source);
    this.grouped = createGroupedCards(this.sorted);

    this.pattern = checkPattern(this);
  }
}

export function createGroupedCards(sortedcards: Cards): GroupedCards {
  const result: GroupedCards = [];

  const map = new Map<string, Card[]>();

  sortedcards.forEach((card) => {
    let group = map.get(card.value);
    if (group == null) {
      group = [];
      result.push(group);
      map.set(card.value, group);
    }

    group.push(card);
  });

  return result;
}

// min -> max
export function createSortedCards(cards: Cards): Cards {
  const result = [...cards] as Cards;

  result.sort((l, r) => {
    return getNumber(l) - getNumber(r);
  });

  return result;
}

function checkPattern({ source, sorted, grouped }: CardsModel): TPattern {
  // 对子
  if (grouped.length === 4) {
    // 9. 两对
    return Patterns.Pair;
  }

  // 两对 | 三条
  if (grouped.length === 3) {
    if (isThreeOfAKind(grouped)) {
      // 7. 三条
      return Patterns.Three_of_a_kind;
    }
    // 8. 两对
    return Patterns.Two_pair;
  }

  // 葫芦 | 金刚
  if (grouped.length === 2) {
    // 3. 金刚
    if (isFourOfAKind(grouped)) {
      return Patterns.Four_of_a_kind;
    }
    // 4. 葫芦
    return Patterns.Full_house;
  }

  // 同花 | 同花顺 | 皇家同花顺
  if (isFlush(source)) {
    if (isStraight(sorted)) {
      if (sorted[4].value === 'A') {
        // 1. 皇家同花顺
        return Patterns.Royal_Straight_Flush;
      }
      // 2. 同花顺
      return Patterns.Straight_Flush;
    }
    // 5. 同花
    return Patterns.Flush;
  }

  // 6. 顺子
  if (isStraight(sorted)) {
    return Patterns.Straight;
  }

  return Patterns.High_Card;
}

export function isFourOfAKind(grouped: GroupedCards): boolean {
  if (grouped.length !== 2) {
    return false;
  }

  return Math.abs(grouped[0].length - grouped[1].length) === 3;
}

export function isThreeOfAKind(grouped: GroupedCards): boolean {
  if (grouped.length !== 3) {
    return false;
  }

  return grouped[0].length === 3 || grouped[1].length === 3 || grouped[2].length === 3;
}

export function isFlush(source: Cards): boolean {
  const first = source[0];
  for (let i = 1; i < source.length; i++) {
    if (first.suit !== source[i].suit) {
      return false;
    }
  }

  return true;
}

export function isStraight(sorted: Cards): boolean {
  let len: 5 | 4 = sorted.length;
  if (sorted[0].value === '2' && sorted[4].value === 'A') {
    // 1, 2, 3, 4, 5
    len = 4;
  }

  for (let i = 1; i < len; i++) {
    const curr = sorted[i];
    const prev = sorted[i - 1];
    if (getNumber(curr) - getNumber(prev) !== 1) {
      return false;
    }
  }

  return true;
}

export function getNumber(card: Card): number {
  const map = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2
  };

  return map[card.value];
}
