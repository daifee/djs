import {
  FIFOCache,
  LFUCache,
  LRUCache
} from '../src';

describe.skip('LRUCache', () => {
  test('case-1', () => {
    const cache = new LRUCache<number>(2);

    cache.set('2', 2);
    cache.set('3', 3);
    cache.set('4', 4);

    expect([
      cache.put('2'),
      cache.put('3'),
      cache.put('4')
    ]).toStrictEqual([undefined, 3, 4]);
  });

  test('case-2', () => {
    const cache = new LRUCache<number>(3);

    cache.set('2', 2);
    cache.put('2');
    cache.set('3', 3);
    cache.set('4', 4);
    cache.set('5', 5);

    expect([
      cache.put('2'),
      cache.put('3'),
      cache.put('4'),
      cache.put('5')
    ]).toStrictEqual([undefined, 3, 4, 5]);
  });
});

describe.skip('LFUCache', () => {
  test('case-1', () => {
    const cache = new LFUCache<number>(2);

    cache.set('2', 2);
    cache.set('3', 3);
    cache.set('4', 4);

    expect([
      cache.put('2'),
      cache.put('3'),
      cache.put('4')
    ]).toStrictEqual([undefined, 3, 4]);
  });

  test('case-2', () => {
    const cache = new LFUCache<number>(3);

    cache.set('2', 2);
    cache.put('2');
    cache.set('3', 3);
    cache.set('4', 4);
    cache.set('5', 5);

    expect([
      cache.put('2'),
      cache.put('3'),
      cache.put('4'),
      cache.put('5')
    ]).toStrictEqual([2, undefined, 4, 5]);
  });
});

describe.skip('FIFOCache', () => {
  test('case-1', () => {
    const cache = new FIFOCache<number>(2);

    cache.set('2', 2);
    cache.set('3', 3);
    cache.set('4', 4);

    expect([
      cache.put('2'),
      cache.put('3'),
      cache.put('4')
    ]).toStrictEqual([undefined, 3, 4]);
  });

  test('case-2', () => {
    const cache = new FIFOCache<number>(3);

    cache.set('2', 2);
    cache.put('2');
    cache.set('3', 3);
    cache.set('4', 4);
    cache.set('5', 5);

    expect([
      cache.put('2'),
      cache.put('3'),
      cache.put('4'),
      cache.put('5')
    ]).toStrictEqual([undefined, 3, 4, 5]);
  });
});
