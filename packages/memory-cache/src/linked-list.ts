
export type GhostNode<V> = LinkedNode<V> | null;

export class LinkedNode<V> {
  prev: GhostNode<V> = null;
  next: GhostNode<V> = null;
  value: V;

  constructor(value: V) {
    this.value = value;
  }
}

export class LinkedList<V> {
  protected head: GhostNode<V> = null;
  protected tail: GhostNode<V> = null;
  size: number = 0;

  isEmpty(): boolean {
    return this.size === 0;
  }

  add(node: LinkedNode<V>): void {
    if (this.isEmpty()) {
      return this.addFirst(node);
    }

    return this.addLast(node);
  }

  addFirst(node: LinkedNode<V>): void {
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      const head = this.head as LinkedNode<V>;
      this.head = node;
      node.next = head;
      head.prev = node;
    }

    this.size += 1;
  }

  addLast(node: LinkedNode<V>): void {
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      const tail = this.tail as LinkedNode<V>;
      this.tail = node;
      tail.next = node;
      node.prev = tail;
    }
    this.size += 1;
  }

  remove(node: LinkedNode<V>): void {
    const prev = node.prev;
    const next = node.next;

    if (prev != null) {
      prev.next = next;
    }

    if (next != null) {
      next.prev = prev;
    }

    node.prev = null;
    node.next = null;

    if (node === this.head) {
      this.head = next;
    }

    if (node === this.tail) {
      this.tail = prev;
    }

    this.size -= 1;
  }

  each(callback: (node: LinkedNode<V>, index: number) => void): void {
    let cursor = this.head;
    let index = 0;
    while (cursor != null) {
      callback(cursor, index);
      index += 1;
      cursor = cursor.next;
    }
  }
}
