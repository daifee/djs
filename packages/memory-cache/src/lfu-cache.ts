
import LinkedList, { LinkedNode } from './linked-list';
import {
  AbstractCache,
  CacheMeta as CacheMetaBase
} from './cache';
import HashMap from './hash-map';

const INIT_FREQ = 1;
class CacheMeta<V> extends CacheMetaBase<V> {
  freq: number;

  constructor(key: string, value: V, freq: number = INIT_FREQ) {
    super(key, value);
    this.freq = freq;
  }
}

class FreqList {
  protected list: LinkedList<number>;
  protected map: HashMap<number, LinkedNode<number>>;

  constructor() {
    this.list = new LinkedList();
    this.map = new HashMap();
  }

  getMin(): number | undefined {
    return this.list.getFirst()?.value;
  }

  remove(freq: number): void {
    const node = this.map.get(freq);
    if (node == null) {
      return;
    }

    this.list.remove(node);
    this.map.remove(freq);
  }

  add(freq: number): void {
    let node = this.map.get(freq);
    if (node != null) {
      return;
    }

    node = new LinkedNode(freq);
    this.map.put(freq, node);

    // list
    let target: LinkedNode<number> | null = null;
    this.list.each((n) => {
      if (target == null && n.value > (node as LinkedNode<number>).value) {
        target = n;
      }
    });

    if (target == null) {
      this.list.addLast(node);
    } else {
      this.list.addBefore(node, target);
    }
  }
}

export default class LFUCache<V> extends AbstractCache<V> {
  protected cache: HashMap<string, LinkedNode<CacheMeta<V>>>;
  protected freqMapCacheList: HashMap<number, LinkedList<CacheMeta<V>>>;
  protected freqList: FreqList;

  constructor(capacity: number) {
    super(capacity);

    this.cache = new HashMap();
    this.freqMapCacheList = new HashMap();
    this.freqList = new FreqList();
  }

  get(key: string): V | undefined {
    const node = this.cache.get(key);
    if (node == null) {
      return undefined;
    }

    this.freshNode(node);

    return node.value.value;
  }

  put(key: string, value: V): void {
    let node = this.cache.get(key);

    // old
    if (node != null) {
      // update: order, times, value
      this.freshNode(node);
      node.value.value = value;
      return undefined;
    }

    // new
    if (this.size === this.capacity) {
      this.deleteExpiredValue();
    }
    // cache
    if (this.size < this.capacity) {
      node = new LinkedNode(new CacheMeta(key, value));
      this.addNode(node);
    }
  }

  delete(key: string): boolean {
    const node = this.cache.get(key);
    if (node == null) {
      return false;
    }

    return this.removeNode(node);
  }

  clear(): void {
    this.cache = new HashMap();
    this.freqList = new FreqList();
    this.freqMapCacheList = new HashMap();
  }

  // 提升新鲜度（freq, order）
  protected freshNode(node: LinkedNode<CacheMeta<V>>): void {
    this.removeNode(node);

    const freq = node.value.freq;
    if (this.freqMapCacheList.get(freq) == null) {
      this.freqList.remove(freq);
    }
    node.value.freq = freq + 1;

    this.addNode(node);
  }

  protected addNode(node: LinkedNode<CacheMeta<V>>): void {
    const { freq, key } = node.value;

    this.cache.put(key, node);

    let list = this.freqMapCacheList.get(freq);
    if (list == null) {
      list = new LinkedList<CacheMeta<V>>();
      this.freqMapCacheList.put(freq, list);
    }
    list.addLast(node);

    this.freqList.add(node.value.freq);
  }

  protected removeNode(node: LinkedNode<CacheMeta<V>>): boolean {
    const { key, freq } = node.value;

    const list = this.freqMapCacheList.get(freq) as LinkedList<CacheMeta<V>>;
    list.remove(node);
    if (list.isEmpty()) {
      this.freqMapCacheList.remove(freq);
    }

    return this.cache.remove(key);
  }

  protected deleteExpiredValue(): void {
    const freq = this.getLeastFreq();
    if (freq === undefined) {
      return;
    }

    const list = this.freqMapCacheList.get(freq) as LinkedList<CacheMeta<V>>;

    const node = list.getFirst() as LinkedNode<CacheMeta<V>>;

    this.removeNode(node);
  }

  protected getLeastFreq(): number | undefined {
    return this.freqList.getMin();
  }
}
