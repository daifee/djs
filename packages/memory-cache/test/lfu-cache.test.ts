
import LFUCache from '../src/lfu-cache';
import testCases from '../../../test-utils/test-cases';

describe('./lfu-cache.test.ts', () => {
  test('case-1', () => {
    const cache = new LFUCache<number>(2);

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
    const cache = new LFUCache<number>(3);

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

  test('case-3', () => {
    const cache = new LFUCache<number>(0);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.size, 0],
      [cache.get('1'), undefined]
    ]);
  });

  test('case-4', () => {
    const cache = new LFUCache<number>(1);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.size, 1],
      [cache.get('1'), 1]
    ]);
  });

  test('case-5', () => {
    const cache = new LFUCache<number>(1);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('2', 2), undefined],
      [cache.size, 1],
      [cache.get('1'), undefined],
      [cache.get('2'), 2]
    ]);
  });

  test('case-6', () => {
    const cache = new LFUCache<number>(1);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.get('1'), 1],
      [cache.put('2', 2), undefined],
      [cache.size, 1],
      [cache.get('1'), undefined],
      [cache.get('2'), 2]
    ]);
  });

  test('case-7', () => {
    const cache = new LFUCache<number>(2);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.get('1'), 1],
      [cache.put('2', 2), undefined],
      [cache.put('3', 3), undefined],
      [cache.size, 2],
      [cache.get('1'), 1],
      [cache.get('2'), undefined],
      [cache.get('3'), 3]
    ]);
  });

  test('case-8', () => {
    const cache = new LFUCache<number>(2);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('1', 11), undefined],
      [cache.put('2', 2), undefined],
      [cache.put('3', 3), undefined],
      [cache.size, 2],
      [cache.get('1'), 11],
      [cache.get('2'), undefined],
      [cache.get('3'), 3]
    ]);
  });

  test('case-9', () => {
    const cache = new LFUCache<number>(2);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('1', 11), undefined],
      [cache.put('2', 2), undefined],
      [cache.get('2'), 2],
      [cache.put('3', 3), undefined],
      [cache.size, 2],
      [cache.get('1'), undefined],
      [cache.get('2'), 2],
      [cache.get('3'), 3]
    ]);
  });

  test('case-10', () => {
    const cache = new LFUCache<number>(2);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('1', 11), undefined],
      [cache.put('2', 2), undefined],
      [cache.get('2'), 2],
      [cache.get('1'), 11],
      [cache.put('3', 3), undefined],
      [cache.size, 2],
      [cache.get('1'), 11],
      [cache.get('2'), undefined],
      [cache.get('3'), 3]
    ]);
  });

  test('case-11', () => {
    const cache = new LFUCache<number>(3);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('1', 11), undefined],
      [cache.put('1', 12), undefined],
      [cache.put('2', 2), undefined],
      [cache.put('2', 22), undefined],
      [cache.put('3', 3), undefined],
      [cache.put('4', 4), undefined],
      [cache.put('5', 5), undefined],
      [cache.put('6', 6), undefined],
      [cache.size, 3],
      [cache.get('1'), 12],
      [cache.get('2'), 22],
      [cache.get('3'), undefined],
      [cache.get('4'), undefined],
      [cache.get('5'), undefined],
      [cache.get('6'), 6]
    ]);
  });

  test('case-12', () => {
    const cache = new LFUCache<number>(3);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('1', 11), undefined],
      [cache.put('1', 12), undefined],
      [cache.put('2', 2), undefined],
      [cache.put('2', 22), undefined],
      [cache.put('3', 3), undefined],
      [cache.put('4', 4), undefined],
      [cache.put('5', 5), undefined],
      [cache.put('5', 51), undefined],
      [cache.put('6', 6), undefined],
      [cache.size, 3],
      [cache.get('1'), 12],
      [cache.get('2'), undefined],
      [cache.get('3'), undefined],
      [cache.get('4'), undefined],
      [cache.get('5'), 51],
      [cache.get('6'), 6]
    ]);
  });

  test('case-13', () => {
    const cache = new LFUCache<number>(3);

    testCases([
      [cache.size, 0],
      [cache.put('1', 1), undefined],
      [cache.put('1', 11), undefined],
      [cache.put('1', 12), undefined],
      [cache.put('2', 2), undefined],
      [cache.put('2', 22), undefined],
      [cache.put('3', 3), undefined],
      [cache.put('4', 4), undefined],
      [cache.put('3', 31), undefined],
      [cache.put('5', 5), undefined],
      [cache.put('6', 6), undefined],
      [cache.size, 3],
      [cache.get('1'), 12],
      [cache.get('2'), 22],
      [cache.get('3'), undefined],
      [cache.get('4'), undefined],
      [cache.get('5'), undefined],
      [cache.get('6'), 6]
    ]);
  });
});
