import testCases from '../../../test-utils/test-cases';
import { createCard } from '../src/cards';
import {
  Cards,
  CardsModel,
  compare,
  createGroupedCards,
  createSortedCards,
  getNumber,
  isFourOfAKind,
  isThreeOfAKind,
  Patterns
} from '../src/rules';
import { max as MockMax } from './mock.data';

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

  test('从大到小', () => {
    const sourceCards = [
      createCard('club', '6'),
      createCard('club', '2'),
      createCard('club', '9'),
      createCard('club', '4'),
      createCard('club', '5')
    ] as Cards;

    const sortedCards = createSortedCards(sourceCards);

    expect(sortedCards).toEqual([
      createCard('club', '9'),
      createCard('club', '6'),
      createCard('club', '5'),
      createCard('club', '4'),
      createCard('club', '2')
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
      createCard('club', 'A'),
      createCard('club', 'K'),
      createCard('club', 'Q'),
      createCard('club', 'J'),
      createCard('club', '10')
    ]);
  });
});

describe('createGroupedCards', () => {
  test('不会修改原数组', () => {
    const sortedCards = [
      createCard('club', '2'),
      createCard('club', '5'),
      createCard('club', '6'),
      createCard('spade', '6'),
      createCard('club', '9')
    ] as Cards;

    const groupedCards = createGroupedCards(sortedCards);
    expect(groupedCards.length).toEqual(4);

    expect(sortedCards[0].value).toEqual('2');
  });

  test('金刚', () => {
    const sortedCards = [
      createCard('club', '5'),
      createCard('club', '6'),
      createCard('diamond', '6'),
      createCard('heart', '6'),
      createCard('spade', '6')
    ] as Cards;

    const groupedCards = createGroupedCards(sortedCards);
    expect(groupedCards.length).toEqual(2);
    expect(groupedCards[0].length).toEqual(1);
    expect(groupedCards[1].length).toEqual(4);
  });

  test('葫芦', () => {
    const sortedCards = [
      createCard('club', '5'),
      createCard('diamond', '5'),
      createCard('club', '6'),
      createCard('heart', '6'),
      createCard('spade', '6')
    ] as Cards;

    const groupedCards = createGroupedCards(sortedCards);
    expect(groupedCards.length).toEqual(2);
    expect(groupedCards[0].length).toEqual(2);
    expect(groupedCards[1].length).toEqual(3);
  });

  test('三条', () => {
    const sortedCards = [
      createCard('diamond', '5'),
      createCard('club', '6'),
      createCard('heart', '6'),
      createCard('spade', '6'),
      createCard('club', 'A')
    ] as Cards;

    const groupedCards = createGroupedCards(sortedCards);
    expect(groupedCards.length).toEqual(3);
    expect(groupedCards[0].length).toEqual(1);
    expect(groupedCards[1].length).toEqual(3);
    expect(groupedCards[2].length).toEqual(1);
  });

  test('两对', () => {
    const sortedCards = [
      createCard('diamond', '5'),
      createCard('club', '5'),
      createCard('heart', '6'),
      createCard('spade', '6'),
      createCard('club', 'A')
    ] as Cards;

    const groupedCards = createGroupedCards(sortedCards);
    expect(groupedCards.length).toEqual(3);
    expect(groupedCards[0].length).toEqual(2);
    expect(groupedCards[1].length).toEqual(2);
    expect(groupedCards[2].length).toEqual(1);
  });

  test('对子', () => {
    const sortedCards = [
      createCard('diamond', '5'),
      createCard('club', '5'),
      createCard('heart', '6'),
      createCard('spade', 'Q'),
      createCard('club', 'A')
    ] as Cards;

    const groupedCards = createGroupedCards(sortedCards);
    expect(groupedCards.length).toEqual(4);
    expect(groupedCards[0].length).toEqual(2);
    expect(groupedCards[1].length).toEqual(1);
    expect(groupedCards[2].length).toEqual(1);
    expect(groupedCards[3].length).toEqual(1);
  });
});

describe('isFourOfAKind', () => {
  test('true', () => {
    const groupedCards = [
      [
        createCard('club', '10')
      ],
      [
        createCard('club', 'J'),
        createCard('diamond', 'J'),
        createCard('heart', 'J'),
        createCard('spade', 'J')
      ]
    ];
    expect(isFourOfAKind(groupedCards)).toEqual(true);
  });

  test('true', () => {
    const groupedCards = [
      [
        createCard('club', 'Q')
      ],
      [
        createCard('club', '9')
      ],
      [
        createCard('diamond', 'J'),
        createCard('heart', 'J'),
        createCard('spade', 'J')
      ]
    ];
    expect(isFourOfAKind(groupedCards)).toEqual(false);
  });
});

describe('isThreeOfAKind', () => {
  test('true', () => {
    const groupedCards = [
      [
        createCard('club', '10')
      ],
      [
        createCard('club', 'A')
      ],
      [
        createCard('diamond', 'J'),
        createCard('heart', 'J'),
        createCard('spade', 'J')
      ]
    ];
    expect(isThreeOfAKind(groupedCards)).toEqual(true);
  });

  test('true', () => {
    const groupedCards = [
      [
        createCard('club', '10'),
        createCard('club', 'Q')
      ],
      [
        createCard('diamond', 'J'),
        createCard('heart', 'J'),
        createCard('spade', 'J')
      ]
    ];
    expect(isThreeOfAKind(groupedCards)).toEqual(false);
  });
});

describe('CardModel', () => {
  test('皇家同花顺', () => {
    const cards = [
      createCard('club', 'J'),
      createCard('club', 'Q'),
      createCard('club', 'A'),
      createCard('club', 'K'),
      createCard('club', '10')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Royal_Straight_Flush);
  });

  test('同花顺', () => {
    const cards = [
      createCard('club', 'J'),
      createCard('club', 'Q'),
      createCard('club', '9'),
      createCard('club', 'K'),
      createCard('club', '10')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Straight_Flush);
  });

  test('金刚', () => {
    const cards = [
      createCard('club', 'Q'),
      createCard('spade', 'Q'),
      createCard('diamond', 'Q'),
      createCard('heart', 'Q'),
      createCard('club', '10')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Four_of_a_kind);
  });

  test('葫芦', () => {
    const cards = [
      createCard('club', 'Q'),
      createCard('spade', 'Q'),
      createCard('diamond', 'Q'),
      createCard('heart', '10'),
      createCard('club', '10')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Full_house);
  });

  test('同花', () => {
    const cards = [
      createCard('heart', 'J'),
      createCard('heart', '3'),
      createCard('heart', '6'),
      createCard('heart', 'A'),
      createCard('heart', '10')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Flush);
  });

  test('顺子', () => {
    const cards = [
      createCard('club', 'J'),
      createCard('spade', 'Q'),
      createCard('club', 'A'),
      createCard('heart', 'K'),
      createCard('club', '10')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Straight);
  });

  test('顺子：A~5', () => {
    const cards = [
      createCard('club', 'A'),
      createCard('spade', '4'),
      createCard('club', '3'),
      createCard('club', '2'),
      createCard('club', '5')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Straight);
  });

  test('三条', () => {
    const cards = [
      createCard('club', 'A'),
      createCard('spade', 'A'),
      createCard('club', 'A'),
      createCard('heart', '2'),
      createCard('club', '5')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Three_of_a_kind);
  });

  test('两对', () => {
    const cards = [
      createCard('club', 'A'),
      createCard('spade', 'A'),
      createCard('club', '3'),
      createCard('heart', '3'),
      createCard('club', '5')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Two_pair);
  });

  test('对子', () => {
    const cards = [
      createCard('club', 'A'),
      createCard('spade', '5'),
      createCard('club', '3'),
      createCard('club', '2'),
      createCard('club', '5')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.Pair);
  });

  test('高张', () => {
    const cards = [
      createCard('club', 'A'),
      createCard('spade', '4'),
      createCard('club', '9'),
      createCard('club', '2'),
      createCard('club', '5')
    ] as Cards;

    const model = new CardsModel(cards);
    expect(model.pattern).toEqual(Patterns.High_Card);
  });
});

describe('compare', () => {
  test('case-1', () => {
    const result = compare(MockMax.Royal_Straight_Flush, [
      createCard('spade', '10'),
      createCard('spade', 'A'),
      createCard('spade', 'J'),
      createCard('spade', 'K'),
      createCard('spade', 'Q')
    ] as Cards);

    expect(result).toEqual(0);
  });

  test('case-2', () => {
    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Straight_Flush
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Four_of_a_kind
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Full_house
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Flush
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Straight
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Three_of_a_kind
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Two_pair
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.Pair
    )).toEqual(1);

    expect(compare(
      MockMax.Royal_Straight_Flush,
      MockMax.High_Card
    )).toEqual(1);
  });

  test('case-3', () => {
    expect(compare(
      [
        createCard('spade', '2'),
        createCard('spade', 'A'),
        createCard('spade', '3'),
        createCard('spade', '4'),
        createCard('spade', '5')
      ] as Cards,
      [
        createCard('spade', '2'),
        createCard('spade', '3'),
        createCard('spade', '4'),
        createCard('spade', '5'),
        createCard('spade', '6')
      ] as Cards
    )).toEqual(-1);

    expect(compare(
      [
        createCard('spade', 'K'),
        createCard('spade', 'A'),
        createCard('spade', 'J'),
        createCard('spade', '10'),
        createCard('spade', 'Q')
      ] as Cards,
      [
        createCard('spade', '2'),
        createCard('spade', '3'),
        createCard('spade', '4'),
        createCard('spade', '5'),
        createCard('spade', '6')
      ] as Cards
    )).toEqual(1);

    expect(compare(
      [
        createCard('spade', '2'),
        createCard('spade', '3'),
        createCard('spade', '4'),
        createCard('spade', '5'),
        createCard('spade', '6')
      ] as Cards,
      [
        createCard('spade', '2'),
        createCard('spade', '3'),
        createCard('spade', '4'),
        createCard('spade', '5'),
        createCard('spade', '6')
      ] as Cards
    )).toEqual(0);
  });
});
