
import { LinkedList, LinkedNode } from './linked-list';

class CacheNode<V> extends LinkedNode<V> {
  key: string;
  value: V;
  times: number;

  constructor(key: string, value: V) {
    super(value);

    this.times = 0;
    this.key = key;
    this.value = value;
  }
}

export class LFUCache<V> {
  protected capacity: number;
  protected hash: Map<string, CacheNode<V>>;
  protected list: LinkedList<V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.hash = new Map();
    this.list = new LinkedList();
  }

  get(key: string): V | undefined {
    const node = this.hash.get(key);
    if (node == null) {
      return undefined;
    }

    // update: order, times
    this.updateOrder(node);
    node.times += 1;

    return node.value;
  }

  put(key: string, value: V): void {
    let node = this.hash.get(key);
    if (node != null) {
      this.updateOrder(node);
      node.times += 1;
      return undefined;
    }

    if (this.capacity === this.list.size) {
      // delete expiredNode
      const expiredNode = this.findExpiredNode();
      if (expiredNode != null) {
        this.list.remove(expiredNode);
      }
    }

    if (this.capacity < this.list.size) {
      node = new CacheNode(key, value);
      node.times += 1;
      this.list.addLast(node);
      this.hash.set(key, node);
    }
  }

  protected findExpiredNode(): CacheNode<V> | null {
    let node: CacheNode<V> | null = null;

    (this.list).each((cursor: LinkedNode<V>) => {
      const cur = cursor as CacheNode<V>;
      if (node == null) {
        node = cur;
      } else if (node.times > cur.times) {
        node = cur;
      }
    });

    return node;
  }

  protected updateOrder(node: CacheNode<V>): void {
    this.list.remove(node);
    this.list.addLast(node);
  }
}
