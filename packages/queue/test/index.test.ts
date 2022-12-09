import Queue from '../src';

test('case-1', () => {
  const queue = new Queue<number>();
  expect(queue).toBeInstanceOf(Queue);
  expect(queue.size()).toStrictEqual(0);
  expect(queue.dequeue()).toStrictEqual(undefined);
});

test('case-2', () => {
  const queue = new Queue<number>([1, 2, 3, 4, 5]);
  expect(queue.size()).toEqual(5);
});

test('case-3', () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.enqueue(4);
  queue.enqueue(5);

  expect(queue.size()).toStrictEqual(5);
  expect(queue.dequeue()).toEqual(1);
  expect(queue.size()).toStrictEqual(4);
  expect(queue.dequeue()).toEqual(2);
  expect(queue.dequeue()).toEqual(3);
  expect(queue.dequeue()).toEqual(4);
  expect(queue.dequeue()).toEqual(5);
  expect(queue.dequeue()).toEqual(undefined);
  expect(queue.size()).toStrictEqual(0);
});

test('case-4', () => {
  const queue = new Queue<number>([9, 8, 7]);
  queue.enqueue(1);
  queue.enqueue(2);

  expect(queue.size()).toStrictEqual(5);
  expect(queue.dequeue()).toEqual(9);
  expect(queue.size()).toStrictEqual(4);
  expect(queue.dequeue()).toEqual(8);
  expect(queue.dequeue()).toEqual(7);
  expect(queue.dequeue()).toEqual(1);
  expect(queue.dequeue()).toEqual(2);
  expect(queue.dequeue()).toEqual(undefined);
  expect(queue.size()).toStrictEqual(0);
});
