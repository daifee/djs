
import LinkedList, { LinkedNode } from './linked-list';
import HashMap from './hash-map';

const INIT_FREQ = 1;
class CacheNode<V> {
  key: string;
  value: V;
  freq: number;

  constructor(key: string, value: V, freq: number = INIT_FREQ) {
    this.key = key;
    this.value = value;
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

export default class LFUCache<V> {
  protected capacity: number;
  protected cache: HashMap<string, LinkedNode<CacheNode<V>>>;
  protected freqMapCacheList: HashMap<number, LinkedList<CacheNode<V>>>;

  protected freqList: FreqList;

  constructor(capacity: number) {
    this.capacity = capacity;

    this.cache = new HashMap();
    this.freqMapCacheList = new HashMap();

    this.freqList = new FreqList();
  }

  get size(): number {
    return this.cache.size;
  }

  delete(key: string): void {

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
    if (this.capacity === 0) {
      return undefined;
    }

    let node = this.cache.get(key);
    if (node != null) {
      // update: order, times, value
      this.freshNode(node);
      node.value.value = value;
      return undefined;
    }

    if (this.capacity === this.cache.size) {
      this.removeStaleNode();
    }

    // cache
    node = new LinkedNode(new CacheNode(key, value));
    this.addNode(node);
  }

  // 提升新鲜度（freq, order）
  protected freshNode(node: LinkedNode<CacheNode<V>>): void {
    this.removeNode(node);

    const freq = node.value.freq;
    if (this.freqMapCacheList.get(freq) == null) {
      this.freqList.remove(freq);
    }
    node.value.freq = freq + 1;

    this.addNode(node);
  }

  protected addNode(node: LinkedNode<CacheNode<V>>): void {
    const { freq, key } = node.value;

    this.cache.put(key, node);

    let list = this.freqMapCacheList.get(freq);
    if (list == null) {
      list = new LinkedList<CacheNode<V>>();
      this.freqMapCacheList.put(freq, list);
    }
    list.addLast(node);

    this.freqList.add(node.value.freq);
  }

  protected removeNode(node: LinkedNode<CacheNode<V>>): void {
    const { key, freq } = node.value;
    this.cache.remove(key);

    const list = this.freqMapCacheList.get(freq) as LinkedList<CacheNode<V>>;
    list.remove(node);
    if (list.isEmpty()) {
      this.freqMapCacheList.remove(freq);
    }
  }

  protected removeStaleNode(): void {
    const freq = this.getLeastFreq();
    const list = this.freqMapCacheList.get(freq) as LinkedList<CacheNode<V>>;

    const node = list.getFirst() as LinkedNode<CacheNode<V>>;

    this.removeNode(node);
  }

  protected getLeastFreq(): number {
    return this.freqList.getMin() as number;
  }
}
