import Stack from '../src';

test('case-1', () => {
  const stack = new Stack<number>();

  expect(stack).toBeInstanceOf(Stack);
  expect(stack.size()).toStrictEqual(0);
  expect(stack.pop()).toStrictEqual(undefined);
  expect(stack.pop()).toStrictEqual(undefined);
});

test('case-2', () => {
  const stack = new Stack<number>([1, 2, 3, 4]);
  expect(stack.size()).toEqual(4);
  expect(stack.pop()).toEqual(4);
  expect(stack.pop()).toEqual(3);
  expect(stack.pop()).toEqual(2);
  expect(stack.pop()).toEqual(1);
  expect(stack.size()).toEqual(0);
  expect(stack.pop()).toStrictEqual(undefined);
});

test('case-3', () => {
  const stack = new Stack<number>();

  stack.push(1);
  stack.push(2);

  expect(stack.size()).toEqual(2);
  expect(stack.pop()).toEqual(2);
  expect(stack.size()).toEqual(1);

  stack.push(3);
  expect(stack.size()).toEqual(2);
  expect(stack.pop()).toEqual(3);
  expect(stack.size()).toEqual(1);

  expect(stack.pop()).toEqual(1);
});
