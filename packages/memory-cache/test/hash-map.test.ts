
import HashMap from '../src/hash-map';

import testCases from '../../../test-utils/test-cases';

describe('hash-map', () => {
  test('case-1', () => {
    const map = new HashMap<string, number>();

    testCases([
      [map instanceof HashMap, true],
      [map.size, 0],
      [map.isEmpty(), true],
      [map.get('1'), undefined]
    ]);
  });

  test('case-2', () => {
    const map = new HashMap<string, number>();

    testCases([
      [map.size, 0],
      [map.put('1', 1), undefined],
      [map.size, 1],
      [map.isEmpty(), false],
      [map.put('1', 3), undefined],
      [map.size, 1],
      [map.isEmpty(), false],
      [map.put('3', 3), undefined],
      [map.size, 2],
      [map.isEmpty(), false]
    ]);
  });

  test('case-3', () => {
    const map = new HashMap<string, number>();

    testCases([
      [map.put('1', 1), undefined],
      [map.get('1'), 1],
      [map.put('1', 3), undefined],
      [map.get('1'), 3]
    ]);
  });

  test('case-4', () => {
    const map = new HashMap<string, number>();

    testCases([
      [map.get('1'), undefined],
      [map.remove('1'), false],
      [map.put('1', 32), undefined],
      [map.remove('1'), true]
    ]);
  });

  test('case-5', () => {
    const map = new HashMap<string, number>();

    testCases([
      [map.put('1', 1), undefined],
      [map.put('2', 1), undefined],
      [map.put('1', 2), undefined],
      [map.put('3', 1), undefined],
      [map.size, 3],
      [map.clear(), undefined],
      [map.size, 0],
      [map.isEmpty(), true]
    ]);
  });
});
