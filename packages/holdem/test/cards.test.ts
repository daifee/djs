import {
  createCards,
  getId
} from '../src/cards';

describe('createCards', () => {
  test('case-1', () => {
    const cards = createCards();
    // 12张牌
    expect(cards.length).toEqual(52);

    const suits = new Set();
    const values = new Set();
    const ids = new Set();
    cards.forEach((card) => {
      suits.add(card.suit);
      values.add(card.value);
      ids.add(getId(card));
    });
    // 4个花色
    expect(suits.size).toEqual(4);
    // 13个点
    expect(values.size).toEqual(13);
    // suit + value 不会重复
    expect(ids.size).toEqual(52);
  });

  test('case-2', () => {
    const cards1 = createCards();
    const cards2 = createCards();

    cards1.forEach((item, index) => {
      expect(cards1[index]).toEqual(cards2[index]);
    });
  });

  test('case-3', () => {
    const cards1 = createCards(true);
    const cards2 = createCards(true);

    let shuffled = false;

    cards1.forEach((item, index) => {
      if (getId(cards1[index]) !== getId(cards2[index])) {
        shuffled = true;
      }
    });

    expect(shuffled).toEqual(true);
  });

  test('case-4', () => {
    const cards1 = createCards(false);
    const cards2 = createCards(true);

    let shuffled = false;

    cards1.forEach((item, index) => {
      if (getId(cards1[index]) !== getId(cards2[index])) {
        shuffled = true;
      }
    });

    expect(shuffled).toEqual(true);
  });

  test('case-5', () => {
    const cards1 = createCards(false);
    const cards2 = createCards();

    cards1.forEach((item, index) => {
      expect(cards1[index]).toEqual(cards2[index]);
    });
  });

  test('case-6', () => {
    const cards1 = createCards(false);
    const cards2 = createCards(false);

    cards1.forEach((item, index) => {
      expect(cards1[index]).toEqual(cards2[index]);
    });
  });
});

describe('getId', () => {
  test('case-1', () => {
    const card = createCards()[0];
    const id = getId(card);

    expect(id).toEqual(`${card.value}-${card.suit}`);
  });
});
