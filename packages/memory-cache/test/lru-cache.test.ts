
import LRUCache from '../src/lru-cache';
import testCases from '../../../test-utils/test-cases';

describe('./lru-cache.test.ts', () => {
  test('case-1', () => {
    const cache = new LRUCache(0);

    testCases([
      [cache.size, 0]
    ]);
  });
});
