
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

// -1(l < r); 0(l == r); 1(l > r)
type CompareResult = -1 | 0 | 1;

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
    // max -> min
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

// max -> min
export function createSortedCards(cards: Cards): Cards {
  const result = [...cards] as Cards;

  result.sort((l, r) => {
    const delta = getNumber(l) - getNumber(r);
    if (delta < 0) {
      return 1;
    }
    if (delta > 0) {
      return -1;
    }
    return 0;
  });

  return result;
}

export function checkPattern({ source, sorted, grouped }: CardsModel): TPattern {
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
      // K
      if (getNumber(sorted[1]) === 13) {
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
  let begin = 0;
  // A, 5
  if (getNumber(sorted[0]) === 14 && getNumber(sorted[1]) === 5) {
    // 1, 5, 4, 3, 2
    begin = 1;
  }

  const end = sorted.length - 1;
  for (let i = begin; i < end; i++) {
    const curr = sorted[i];
    const next = sorted[i + 1];
    if (getNumber(curr) - getNumber(next) !== 1) {
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

export function compare(l: Cards, r: Cards): CompareResult {
  const lModel = new CardsModel(l);
  const rModel = new CardsModel(r);

  return compareCardsModel(lModel, rModel);
}

function compareCardsModel(lModel: CardsModel, rModel: CardsModel): CompareResult {
  // 不同类型
  if (lModel.pattern !== rModel.pattern) {
    return compareCardsModelForDiffentPattern(lModel, rModel);
  }

  // 同类型
  return compareCardsModelForSamePattern(lModel, rModel);
}

function compareCardsModelForDiffentPattern(lModel: CardsModel, rModel: CardsModel): CompareResult {
  const mapWeight = {
    [`${Patterns.Royal_Straight_Flush}`]: 10,
    [`${Patterns.Straight_Flush}`]: 9,
    [`${Patterns.Four_of_a_kind}`]: 8,
    [`${Patterns.Full_house}`]: 7,
    [`${Patterns.Flush}`]: 6,
    [`${Patterns.Straight}`]: 5,
    [`${Patterns.Three_of_a_kind}`]: 4,
    [`${Patterns.Two_pair}`]: 3,
    [`${Patterns.Pair}`]: 2,
    [`${Patterns.High_Card}`]: 1
  };

  if (mapWeight[lModel.pattern] > mapWeight[rModel.pattern]) {
    return 1;
  } else {
    return -1;
  }
}

function compareCardsModelForSamePattern(lModel: CardsModel, rModel: CardsModel): CompareResult {
  function compareHighCard(l: CardsModel, r: CardsModel): CompareResult {
    let index = 0;
    while (l.sorted[index] != null) {
      const result = compareCard(l.sorted[index], r.sorted[index]);

      if (result !== 0) {
        return result;
      }

      index += 1;
    }

    return 0;
  }

  function compareStraight(l: CardsModel, r: CardsModel): CompareResult {
    if (isOTTFF(l.sorted) && isOTTFF(r.sorted)) {
      return 0;
    }

    if (isOTTFF(r.sorted)) {
      return 1;
    }

    if (isOTTFF(l.sorted)) {
      return -1;
    }

    return compareHighCard(l, r);
  }

  function compareGroupedCards(l: CardsModel, r: CardsModel): CompareResult {
    function compareFn(a: Card[], b: Card[]): -1 | 0 | 1 {
      if (a.length > b.length) {
        return -1;
      }
      if (a.length < b.length) {
        return 1;
      }

      return 0;
    }

    const lGroupedCards = [...l.grouped].sort(compareFn);
    const rGroupedCards = [...r.grouped].sort(compareFn);
    let index = 0;
    while (lGroupedCards[index] != null) {
      const result = compareCard(lGroupedCards[0][0], rGroupedCards[0][0]);
      if (result !== 0) {
        return result;
      }

      index += 1;
    }

    return 0;
  }

  switch (lModel.pattern) {
    // 比高牌：同花、高牌
    case Patterns.High_Card:
    case Patterns.Flush:
      return compareHighCard(lModel, rModel);
    // 只需比高牌：皇家同花顺、同花顺、顺子
    case Patterns.Royal_Straight_Flush:
    case Patterns.Straight_Flush:
    case Patterns.Straight:
      return compareStraight(lModel, rModel);
    // 先比组合高牌：金刚、葫芦、三条、两对、对子
    default:
      return compareGroupedCards(lModel, rModel);
  }
}

export function compareCard(lCard: Card, rCard: Card): CompareResult {
  const delta = getNumber(lCard) - getNumber(rCard);
  if (delta > 0) {
    return 1;
  }

  if (delta < 0) {
    return -1;
  }

  return 0;
}

function isOTTFF(sortedCards: Cards): boolean {
  if (getNumber(sortedCards[0]) === 14 && getNumber(sortedCards[1]) === 5) {
    return true;
  } else {
    return false;
  }
}
