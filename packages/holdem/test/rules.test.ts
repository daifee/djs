import testCases from '../../../test-utils/test-cases';
import { createCard } from '../src/cards';
import {
  Cards,
  createSortedCards,
  getNumber
} from '../src/rules';

describe('getNumber', () => {
  test('case-1', () => {
    testCases([
      [getNumber(createCard('club', '2')), 2],
      [getNumber(createCard('club', '3')), 3],
      [getNumber(createCard('club', '4')), 4],
      [getNumber(createCard('club', '5')), 5],
      [getNumber(createCard('club', '6')), 6],
      [getNumber(createCard('club', '7')), 7],
      [getNumber(createCard('club', '8')), 8],
      [getNumber(createCard('club', '9')), 9],
      [getNumber(createCard('club', '10')), 10],
      [getNumber(createCard('club', 'J')), 11],
      [getNumber(createCard('club', 'Q')), 12],
      [getNumber(createCard('club', 'K')), 13],
      [getNumber(createCard('club', 'A')), 14]
    ]);
  });

  test('case-2', () => {
    testCases([
      [getNumber(createCard('diamond', '2')), 2],
      [getNumber(createCard('diamond', '3')), 3],
      [getNumber(createCard('diamond', '4')), 4],
      [getNumber(createCard('heart', '5')), 5],
      [getNumber(createCard('heart', '6')), 6],
      [getNumber(createCard('heart', '7')), 7],
      [getNumber(createCard('heart', '8')), 8],
      [getNumber(createCard('heart', '9')), 9],
      [getNumber(createCard('spade', '10')), 10],
      [getNumber(createCard('spade', 'J')), 11],
      [getNumber(createCard('spade', 'Q')), 12],
      [getNumber(createCard('spade', 'K')), 13],
      [getNumber(createCard('club', 'A')), 14]
    ]);
  });
});

describe('createSortedCards', () => {
  test('不会修改原数组', () => {
    const sourceCards = [
      createCard('club', '6'),
      createCard('club', '2'),
      createCard('club', '9'),
      createCard('club', '4'),
      createCard('club', '5')
    ] as Cards;

    const sortedCards = createSortedCards(sourceCards);
    expect(sourceCards !== sortedCards).toBe(true);

    expect(sourceCards[0].value).toEqual('6');
  });

  test('从小到大', () => {
    const sourceCards = [
      createCard('club', '6'),
      createCard('club', '2'),
      createCard('club', '9'),
      createCard('club', '4'),
      createCard('club', '5')
    ] as Cards;

    const sortedCards = createSortedCards(sourceCards);

    expect(sortedCards).toEqual([
      createCard('club', '2'),
      createCard('club', '4'),
      createCard('club', '5'),
      createCard('club', '6'),
      createCard('club', '9')
    ]);
  });

  test('A是最大值', () => {
    const sourceCards = [
      createCard('club', 'A'),
      createCard('club', 'K'),
      createCard('club', 'Q'),
      createCard('club', 'J'),
      createCard('club', '10')
    ] as Cards;

    const sortedCards = createSortedCards(sourceCards);

    expect(sortedCards).toEqual([
      createCard('club', '10'),
      createCard('club', 'J'),
      createCard('club', 'Q'),
      createCard('club', 'K'),
      createCard('club', 'A')
    ]);
  });
});
