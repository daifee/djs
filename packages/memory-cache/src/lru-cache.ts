
import { AbstractCache, CacheMeta } from './cache';
import HashMap from './hash-map';
import LinkedList, { LinkedNode } from './linked-list';

export default class LRUCache<V> extends AbstractCache<V> {
  protected list: LinkedList<CacheMeta<V>>;

  constructor(capacity: number) {
    super(capacity);

    this.cache = new HashMap();
    this.list = new LinkedList();
  }

  get(key: string): V | undefined {
    const node = this.cache.get(key);
    if (node == null) {
      return undefined;
    }

    // fresh
    this.freshNode(node);

    return node.value.value;
  }

  put(key: string, value: V): void {
    if (this.capacity === 0) {
      return;
    }

    let node = this.cache.get(key);

    // old
    if (node != null) {
      node.value.value = value;
      // fresh
      this.freshNode(node);
      return;
    }

    // new
    if (this.capacity === this.size) {
      this.deleteExpiredValue();
    }
    node = new LinkedNode(new CacheMeta(key, value));
    this.cache.put(key, node);
    this.list.addLast(node);
  }

  delete(key: string): boolean {
    const node = this.cache.get(key);

    if (node == null) {
      return false;
    }

    this.list.remove(node);
    return this.cache.remove(key);
  }

  clear(): void {
    this.cache = new HashMap();
    this.list = new LinkedList();
  }

  protected deleteExpiredValue(): void {
    const node = this.list.getFirst() as LinkedNode<CacheMeta<V>>;
    this.list.remove(node);
    this.cache.remove(node.value.key);
  }

  protected freshNode(node: LinkedNode<CacheMeta<V>>): void {
    this.list.remove(node);
    this.list.addLast(node);
  }
}
