import { createCard } from '../src/cards';
import { Patterns, Cards } from '../src/rules';

type Max = {
  [Property in keyof typeof Patterns]: Cards
};

export const max: Max = {
  Royal_Straight_Flush: [
    createCard('spade', '10'),
    createCard('spade', 'A'),
    createCard('spade', 'K'),
    createCard('spade', 'J'),
    createCard('spade', 'Q')
  ] as Cards,
  Straight_Flush: [
    createCard('spade', '10'),
    createCard('spade', '9'),
    createCard('spade', 'K'),
    createCard('spade', 'J'),
    createCard('spade', 'Q')
  ] as Cards,
  Four_of_a_kind: [
    createCard('club', 'A'),
    createCard('spade', 'A'),
    createCard('diamond', 'A'),
    createCard('heart', 'A'),
    createCard('spade', 'K')
  ] as Cards,
  Full_house: [
    createCard('heart', 'K'),
    createCard('club', 'A'),
    createCard('spade', 'A'),
    createCard('diamond', 'A'),
    createCard('spade', 'K')
  ] as Cards,
  Flush: [
    createCard('spade', '9'),
    createCard('spade', 'A'),
    createCard('spade', 'K'),
    createCard('spade', 'J'),
    createCard('spade', 'Q')
  ] as Cards,
  Straight: [
    createCard('spade', '10'),
    createCard('club', 'A'),
    createCard('spade', 'K'),
    createCard('spade', 'J'),
    createCard('spade', 'Q')
  ] as Cards,
  Three_of_a_kind: [
    createCard('heart', 'Q'),
    createCard('club', 'A'),
    createCard('spade', 'A'),
    createCard('diamond', 'A'),
    createCard('spade', 'K')
  ] as Cards,
  Two_pair: [
    createCard('heart', 'K'),
    createCard('club', 'A'),
    createCard('spade', 'Q'),
    createCard('diamond', 'A'),
    createCard('spade', 'K')
  ] as Cards,
  Pair: [
    createCard('heart', 'Q'),
    createCard('club', 'A'),
    createCard('spade', 'A'),
    createCard('diamond', 'J'),
    createCard('spade', 'K')
  ] as Cards,
  High_Card: [
    createCard('heart', 'Q'),
    createCard('club', 'A'),
    createCard('spade', '9'),
    createCard('diamond', 'J'),
    createCard('spade', 'K')
  ] as Cards
} as const;
