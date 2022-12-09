import LinkedList from '../src';

type INPUT = Array<[string, number[]]>;

function executeCase(input: INPUT): number[] {
  const obj = new LinkedList<number>();

  input.forEach((item) => {
    obj[item[0]](...item[1]);
  });

  return obj.toArray();
}

test('case 0', () => {
  const obj = new LinkedList<number>();
  expect(obj.toArray()).toEqual([]);
  expect(obj.size()).toEqual(0);

  const obj2 = new LinkedList<number>([2, 3, 4, 5, 7]);
  expect(obj2.toArray()).toEqual([2, 3, 4, 5, 7]);
  expect(obj2.size()).toEqual(5);
});

test('case 1: addFirst', () => {
  const obj = new LinkedList<number>();

  expect(obj.size()).toEqual(0);
  expect(obj.addFirst(1)).toBe(true);
  expect(obj.toArray()).toEqual([1]);
  expect(obj.size()).toEqual(1);

  expect(obj.addFirst(2)).toBe(true);
  expect(obj.toArray()).toEqual([2, 1]);
  expect(obj.size()).toEqual(2);

  expect(obj.addFirst(3)).toBe(true);
  expect(obj.toArray()).toEqual([3, 2, 1]);

  expect(obj.addFirst(4)).toBe(true);
  expect(obj.toArray()).toEqual([4, 3, 2, 1]);
  expect(obj.size()).toEqual(4);
});

test('case 2: addLast', () => {
  const obj = new LinkedList<number>();

  expect(obj.addLast(1)).toBe(true);
  expect(obj.toArray()).toEqual([1]);
  expect(obj.size()).toEqual(1);

  expect(obj.addLast(2)).toBe(true);
  expect(obj.toArray()).toEqual([1, 2]);
  expect(obj.size()).toEqual(2);

  expect(obj.addLast(3)).toBe(true);
  expect(obj.toArray()).toEqual([1, 2, 3]);
  expect(obj.size()).toEqual(3);

  expect(obj.addLast(4)).toBe(true);
  expect(obj.toArray()).toEqual([1, 2, 3, 4]);
  expect(obj.size()).toEqual(4);
});

test('case 3: addFirst, addLast', () => {
  const input: INPUT = [
    ['addFirst', [1]],
    ['addLast', [2]],
    ['addFirst', [3]],
    ['addLast', [4]]
  ];
  const value = executeCase(input);
  expect(value).toEqual([3, 1, 2, 4]);
});

test('case 4: isEmpty, toArray', () => {
  const obj = new LinkedList<number>();

  expect(obj.isEmpty()).toBe(true);
  expect(obj.toArray()).toEqual([]);
});

test('case 5: add()', () => {
  const obj = new LinkedList<number>();
  expect(obj.add(1, 1)).toBe(false);
  expect(obj.toArray()).toEqual([]);
  expect(obj.size()).toEqual(0);

  expect(obj.add(0, 1)).toBe(true);
  expect(obj.toArray()).toEqual([1]);
  expect(obj.size()).toEqual(1);

  expect(obj.add(2, 39)).toBe(false);
  expect(obj.toArray()).toEqual([1]);
  expect(obj.size()).toEqual(1);
});

test('case 6', () => {
  const input: INPUT = [
    ['add', [1]],
    ['add', [2]],
    ['add', [0, 3]],
    ['add', [4, 0]],
    ['add', [3, 1]],
    ['add', [31]]
  ];
  const value = executeCase(input);
  expect(value).toEqual([3, 1, 2, 1, 31]);
});

test('case 7', () => {
  const input: INPUT = [
    ['add', [1]],
    ['add', [2]],
    ['add', [0, 3]],
    ['add', [4, 0]],
    ['addLast', [7]],
    ['add', [3, 1]],
    ['add', [31]],
    ['addFirst', [8]],
    ['addFirst', [9]],
    ['add', [19]],
    ['add', [7, 70]]
  ];

  const value = executeCase(input);
  expect(value).toEqual([9, 8, 3, 1, 2, 1, 7, 70, 31, 19]);
});

test('case 8: remove*', () => {
  const obj = new LinkedList<number>();

  expect(obj.size()).toEqual(0);
  expect(obj.removeFirst()).toBe(false);
  expect(obj.removeLast()).toBe(false);
  expect(obj.remove(0)).toBe(false);
  expect(obj.size()).toEqual(0);

  obj.add(1);
  expect(obj.size()).toEqual(1);
  obj.add(2);
  expect(obj.size()).toEqual(2);
  obj.add(3);
  expect(obj.size()).toEqual(3);
  expect(obj.remove(0)).toBe(true);
  expect(obj.toArray()).toEqual([2, 3]);
  expect(obj.size()).toEqual(2);

  expect(obj.removeFirst()).toBe(true);
  expect(obj.toArray()).toEqual([3]);
  expect(obj.size()).toEqual(1);

  expect(obj.removeLast()).toBe(true);
  expect(obj.toArray()).toEqual([]);
  expect(obj.size()).toEqual(0);
});

test('case 9', () => {
  const input: INPUT = [
    ['add', [1]],
    ['add', [2]],
    ['add', [0, 3]],
    ['removeFirst', []],
    ['removeLast', []],
    ['add', [4, 0]],
    ['addLast', [7]],
    ['add', [3, 1]],
    ['remove', [3]],
    ['add', [31]],
    ['addFirst', [8]],
    ['addFirst', [9]],
    ['remove', [11]],
    ['add', [19]],
    ['remove', [5]],
    ['add', [7, 70]]
  ];

  const value = executeCase(input);
  expect(value).toEqual([9, 8, 1, 7, 31]);
});

test('case 10', () => {
  const obj = new LinkedList<number>();

  expect(obj.getFirst()).toBe(undefined);
  expect(obj.getLast()).toBe(undefined);
  expect(obj.get(0)).toBe(undefined);
  expect(obj.get(1)).toBe(undefined);
});

test('case 11', () => {
  const obj = new LinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  expect(obj.getFirst()).toEqual(1);
  expect(obj.getLast()).toEqual(9);
  expect(obj.get(0)).toEqual(1);
  expect(obj.get(5)).toEqual(6);
  expect(obj.get(8)).toEqual(9);
  expect(obj.get(-1)).toEqual(undefined);
  expect(obj.get(10)).toEqual(undefined);
  expect(obj.get(100)).toEqual(undefined);
});

test('case 12', () => {
  const obj = new LinkedList<number>();

  obj.each(() => {
    expect(true).toBe(false);
  });
});

test('case 11', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const obj = new LinkedList(arr);

  let times = 0;
  obj.each((item, index) => {
    times += 1;
    expect(item).toEqual(arr[index]);
  });

  expect(times).toEqual(9);
});

test('case 12', () => {
  const obj = new LinkedList<number>([3, 2, 5]);

  expect(obj.remove(0)).toBe(true);
  expect(obj.remove(1)).toBe(true);
  expect(obj.toArray()).toEqual([2]);
});

test('case 13', () => {
  const obj = new LinkedList([]);
  expect(obj.remove(22)).toBe(false);
});
