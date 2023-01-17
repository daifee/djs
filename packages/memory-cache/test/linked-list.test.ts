
import {
  LinkedNode,
  LinkedList
} from '../src/linked-list';
import groupCases from '../../../test-utils/group-cases';

describe('LinkedNode', () => {
  test('case-1', () => {
    const node = new LinkedNode(23);

    expect(node).toBeInstanceOf(LinkedNode);
    expect(node.value).toEqual(23);
    expect(node.next).toStrictEqual(null);
    expect(node.prev).toStrictEqual(null);
  });
});

describe.only('LinkedList', () => {
  test('case-1', () => {
    const list = new LinkedList<number>();

    expect(list).toBeInstanceOf(LinkedList);
    expect([
      list.isEmpty(),
      list.size,
      list.getFirst()?.value,
      list.getLast()?.value
    ]).toStrictEqual([
      true,
      0,
      undefined,
      undefined
    ]);
  });

  test('case-2', () => {
    const list = new LinkedList<number>();

    const { received, expected } = groupCases([
      [list.size, 0],
      [list.add(new LinkedNode(1)), undefined],
      [list.getFirst()?.value, 1],
      [list.getLast()?.value, 1],
      [list.add(new LinkedNode(2)), undefined],
      [list.getFirst()?.value, 1],
      [list.getLast()?.value, 2],
      [list.addFirst(new LinkedNode(0)), undefined],
      [list.addLast(new LinkedNode(3)), undefined],
      [list.getFirst()?.value, 0],
      [list.getLast()?.value, 3],
      [list.size, 4],
      [list.isEmpty(), false]
    ]);

    expect(received).toStrictEqual(expected);
  });

  test('case-3', () => {
    const list = new LinkedList<string>();

    const { received, expected } = groupCases([
      [list.isEmpty(), true],
      [list.add(new LinkedNode('3')), undefined],
      [list.add(new LinkedNode('3')), undefined],
      [list.getFirst() !== list.getLast(), true]
    ]);

    expect(received).toStrictEqual(expected);
  });

  test('case-4', () => {
    const list = new LinkedList<string>();

    const node = new LinkedNode('33');

    const { received, expected } = groupCases([
      [list.add(node), undefined],
      [list.remove(node), undefined],
      [list.isEmpty(), true],
      [list.size, 0],
      [list.getFirst(), null],
      [list.getLast(), null],
      [list.add(node), undefined],
      [list.getFirst(), node],
      [list.getLast(), node]
    ]);

    expect(received).toStrictEqual(expected);
  });

  test('case-5', () => {
    const node = new LinkedNode(3);
    const list = new LinkedList<number>();
    list.add(node);

    expect(() => {
      list.add(node);
    }).toThrowError();
  });

  test('case-6', () => {
    const list = new LinkedList<number>();

    const node = new LinkedNode(43);

    list.add(new LinkedNode(32));
    list.add(node);

    expect(node.prev).toStrictEqual(list.getFirst());
    list.remove(node);
    expect(node.prev).toStrictEqual(null);
  });
});
