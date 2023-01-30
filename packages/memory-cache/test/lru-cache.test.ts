import LRUCache from '../src/lfu-cache';
import testCases from '../../../test-utils/test-cases';

describe.only('LRUCache', () => {
  test('case-1', () => {
    const cache = new LRUCache<number>(2);

    testCases([
      [cache.put('2', 2), undefined],
      [cache.put('3', 3), undefined],
      [cache.put('4', 4), undefined],
      [cache.get('2'), undefined],
      [cache.get('3'), 3],
      [cache.get('4'), 4]
    ]);
  });

  test('case-2', () => {
    const cache = new LRUCache<number>(3);

    testCases([
      [cache.put('2', 2), undefined],
      [cache.get('2'), 2],
      [cache.put('3', 3), undefined],
      [cache.put('4', 4), undefined],
      [cache.put('5', 5), undefined],
      [cache.get('2'), 2],
      [cache.get('3'), undefined],
      [cache.get('4'), 4],
      [cache.get('5'), 5]
    ]);
  });
});
