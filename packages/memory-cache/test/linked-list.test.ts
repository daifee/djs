
import LinkedList, {
  LinkedNode
} from '../src/linked-list';
import testCases from '../../../test-utils/test-cases';

describe('LinkedNode', () => {
  test('case-1', () => {
    const node = new LinkedNode(23);

    expect(node).toBeInstanceOf(LinkedNode);
    expect(node.value).toEqual(23);
    expect(node.next).toStrictEqual(null);
    expect(node.prev).toStrictEqual(null);
  });
});

describe('LinkedList', () => {
  test('case-1', () => {
    const list = new LinkedList<number>();

    testCases([
      [list.isEmpty(), true],
      [list.size, 0],
      [list.getFirst()?.value, undefined],
      [list.getLast()?.value, undefined]
    ]);
  });

  test('case-2', () => {
    const list = new LinkedList<number>();

    testCases([
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
  });

  test('case-3', () => {
    const list = new LinkedList<string>();

    testCases([
      [list.isEmpty(), true],
      [list.add(new LinkedNode('3')), undefined],
      [list.add(new LinkedNode('3')), undefined],
      [list.getFirst() !== list.getLast(), true]
    ]);
  });

  test('case-4', () => {
    const list = new LinkedList<string>();

    const node = new LinkedNode('33');

    testCases([
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

  test('case-7', () => {
    const list = new LinkedList<number>();

    testCases([
      [list.isEmpty(), true],
      [list.size, 0],
      [list.addFirst(new LinkedNode(99)), undefined],
      [list.isEmpty(), false],
      [list.size, 1],
      [list.getFirst()?.value, 99],
      [list.getLast()?.value, 99]
    ]);
  });

  test('case-8', () => {
    const list = new LinkedList<number>();

    const node1 = new LinkedNode(1);
    const node2 = new LinkedNode(2);
    const node3 = new LinkedNode(3);

    testCases([
      [list.size, 0],
      [list.add(node1), undefined],
      [list.getFirst(), node1],
      [list.getLast(), node1],
      [list.addBefore(node2, node1), undefined],
      [list.size, 2],
      [list.getFirst(), node2],
      [list.getLast(), node1],
      [list.addBefore(node3, node1), undefined],
      [list.size, 3],
      [list.getFirst(), node2],
      [list.getLast(), node1]
    ]);
  });
});
