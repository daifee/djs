import LinkedNode from './linked-node';

export default class LinkedList<D> {
  protected head: LinkedNode<D> | null = null;

  constructor (value?: D[]) {
    if (value != null) {
      value.forEach((data) => {
        this.add(data);
      });
    }
  }

  isEmpty (): boolean {
    return this.head == null;
  }

  size (): number {
    let result = 0;

    this.each(() => {
      result += 1;
    });

    return result;
  }

  // 插入 add
  addFirst (data: D): boolean {
    const node = new LinkedNode(data);

    if (this.head == null) {
      this.head = node;
      return true;
    }

    node.next = this.head;
    this.head = node;

    return true;
  }

  addLast (data: D): boolean {
    if (this.isEmpty()) {
      return this.addFirst(data);
    }

    let last = this.head as LinkedNode<D>;
    while (last.next != null) {
      last = last.next;
    }

    const node = new LinkedNode(data);
    last.next = node;

    return true;
  }

  add (data: D): boolean;
  add (index: number, data: D): boolean;
  add (index: number | D, data?: D): boolean {
    if (data === undefined) {
      return this.addLast(index as D);
    }

    if (index === 0) {
      return this.addFirst(data);
    }

    let i = 1;
    let left = this.head;
    while (left != null) {
      if (i === index) {
        break;
      }

      i += 1;
      left = left.next;
    }

    if (left == null) {
      return false;
    }

    const middle = new LinkedNode<D>(data);
    const right = left.next;
    left.next = middle;
    middle.next = right;

    return true;
  }

  // 移除 remove
  removeFirst (): boolean {
    if (this.isEmpty()) {
      return false;
    }

    const newHead = (this.head as LinkedNode<D>).next;
    this.head = newHead;

    return true;
  }

  removeLast (): boolean {
    if (this.isEmpty()) {
      return false;
    }

    let prev: LinkedNode<D> | null = null;
    let last = this.head;
    while ((last?.next) != null) {
      prev = last;
      last = last.next;
    }

    if (prev != null) {
      prev.next = null;
    } else {
      this.head = null;
    }

    return true;
  }

  remove (index: number): boolean {
    if (index === 0) {
      return this.removeFirst();
    }

    if (this.isEmpty()) {
      return false;
    }

    let prev: LinkedNode<D> = this.head as LinkedNode<D>;
    let target = prev.next;
    let i = 1;

    while (((target?.next) != null) && i !== index) {
      prev = target;
      target = target.next;
      i += 1;
    }

    if ((target != null) && i === index) {
      prev.next = target.next;
      return true;
    }
    // 检索不到
    return false;
  }

  // 检索 get
  get (index: number): D | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    let i = 0;
    let curr = this.head;
    while (((curr?.next) != null) && i !== index) {
      i += 1;
      curr = curr.next;
    }

    if (i === index && (curr != null)) {
      return curr.data;
    }

    return undefined;
  }

  getFirst (): D | undefined {
    return this.head?.data;
  }

  getLast (): D | undefined {
    let last = this.head;
    while ((last?.next) != null) {
      last = last.next;
    }

    return last?.data;
  }

  // 遍历 each
  each (callback: (item: D, index: number) => void): void {
    let curr = this.head;
    let index = 0;
    while (curr != null) {
      callback(curr.data, index);
      curr = curr.next;
      index += 1;
    }
  }

  toArray (): D[] {
    if (this.isEmpty()) return [];

    const result: D[] = [];

    this.each((item) => {
      result.push(item);
    });

    return result;
  }
}
