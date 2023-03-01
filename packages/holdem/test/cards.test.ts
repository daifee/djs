import {
  createCards
} from '../src/cards';

describe('createCards', () => {
  test('case-1', () => {
    const cards = createCards();
    // 12张牌
    expect(cards.length).toEqual(52);

    const suits = new Set();
    const values = new Set();
    const uniques = new Set();
    cards.forEach((card) => {
      suits.add(card.suit);
      values.add(card.value);
      uniques.add(`${card.suit}-${card.value}`);
    });
    // 4个花色
    expect(suits.size).toEqual(4);
    // 13个点
    expect(values.size).toEqual(13);
    // suit + value 不会重复
    expect(uniques.size).toEqual(52);
  });

  test('case-2', () => {
    const cards1 = createCards();
    const cards2 = createCards();

    cards1.forEach((item, index) => {
      expect(cards1[index]).toEqual(cards2[index]);
    });
  });
});
