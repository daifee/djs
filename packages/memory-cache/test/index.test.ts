import {
  FIFOCache,
  LFUCache
} from '../src';

describe('LFUCache', () => {
  test('case-1', () => {
    const cache = new LFUCache<number>(2);

    cache.put('2', 2);
    cache.put('3', 3);
    cache.put('4', 4);

    expect([
      cache.get('2'),
      cache.get('3'),
      cache.get('4')
    ]).toStrictEqual([undefined, 3, 4]);
  });

  test('case-2', () => {
    const cache = new LFUCache<number>(3);

    cache.put('2', 2);
    cache.get('2');
    cache.put('3', 3);
    cache.put('4', 4);
    cache.put('5', 5);

    expect([
      cache.get('2'),
      cache.get('3'),
      cache.get('4'),
      cache.get('5')
    ]).toStrictEqual([2, undefined, 4, 5]);
  });
});

describe('FIFOCache', () => {
  test('case-1', () => {
    const cache = new FIFOCache<number>(2);

    cache.put('2', 2);
    cache.put('3', 3);
    cache.put('4', 4);

    expect([
      cache.get('2'),
      cache.get('3'),
      cache.get('4')
    ]).toStrictEqual([undefined, 3, 4]);
  });

  test('case-2', () => {
    const cache = new FIFOCache<number>(3);

    cache.put('2', 2);
    cache.get('2');
    cache.put('3', 3);
    cache.put('4', 4);
    cache.put('5', 5);

    expect([
      cache.get('2'),
      cache.get('3'),
      cache.get('4'),
      cache.get('5')
    ]).toStrictEqual([undefined, 3, 4, 5]);
  });

  test('case-3', () => {
    const cache = new FIFOCache<number>(3);

    cache.put('2', 2);
    cache.put('3', 3);
    cache.get('2');
    cache.put('4', 4);
    cache.put('5', 5);

    expect([
      cache.get('2'),
      cache.get('3'),
      cache.get('4'),
      cache.get('5')
    ]).toStrictEqual([undefined, 3, 4, 5]);
  });
});
