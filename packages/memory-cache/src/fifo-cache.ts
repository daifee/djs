
import { CacheMeta, AbstractCache } from './cache';
import HashMap from './hash-map';
import LinkedList, { LinkedNode } from './linked-list';

export default class FIFOCache<V> extends AbstractCache<V> {
  protected list: LinkedList<CacheMeta<V>>;

  constructor(capacity: number) {
    super(capacity);

    this.list = new LinkedList();
  }

  get(key: string): V | undefined {
    const node = this.cache.get(key);

    return node?.value.value;
  }

  put(key: string, value: V): void {
    let node = this.cache.get(key);
    if (node != null) {
      node.value.value = value;
      return;
    }

    // new
    if (this.size === this.capacity) {
      this.deleteExpiredValue();
    }

    if (this.size < this.capacity) {
      node = new LinkedNode(new CacheMeta(key, value));
      this.list.addLast(node);
      this.cache.put(key, node);
    }
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
    const node = this.list.getFirst();
    if (node == null) {
      return;
    }

    this.list.remove(node);
    this.cache.remove(node.value.key);
  }
}
