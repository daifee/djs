
import LinkedList, { LinkedNode } from './linked-list';
import HashMap from './hash-map';

const INIT_TIMES = 1;
class CacheNode<V> {
  key: string;
  value: V;
  times: number;

  constructor(key: string, value: V, times: number = INIT_TIMES) {
    this.key = key;
    this.value = value;
    this.times = times;
  }
}

export default class LFUCache<V> {
  protected capacity: number;
  protected mapCache: HashMap<string, LinkedNode<CacheNode<V>>>;
  protected mapTimesList: HashMap<number, LinkedList<CacheNode<V>>>;

  protected leastTimes: number;

  constructor(capacity: number) {
    this.capacity = capacity;

    this.mapCache = new HashMap();
    this.mapTimesList = new HashMap();

    this.leastTimes = INIT_TIMES;
  }

  get(key: string): V | undefined {
    const node = this.mapCache.get(key);
    if (node == null) {
      return undefined;
    }

    this.freshNode(node);

    return node.value.value;
  }

  put(key: string, value: V): void {
    let node = this.mapCache.get(key);
    if (node != null) {
      // update: order, times, value
      this.freshNode(node);
      node.value.value = value;
      return undefined;
    }

    if (this.capacity === this.mapCache.size) {
      this.removeStaleNode();
    }

    if (this.capacity <= this.mapCache.size) {
      return undefined;
    }

    // cache
    node = new LinkedNode(new CacheNode(key, value));
    this.addNode(node);
  }

  // 提升新鲜度（times, order）
  protected freshNode(node: LinkedNode<CacheNode<V>>): void {
    this.removeNode(node);

    node.value.times += 1;

    this.addNode(node);
  }

  protected addNode(node: LinkedNode<CacheNode<V>>): void {
    const { times, key } = node.value;

    this.mapCache.put(key, node);

    let list = this.mapTimesList.get(times);
    if (list == null) {
      list = new LinkedList<CacheNode<V>>();
      this.mapTimesList.put(times, list);
    }
    list.addLast(node);
  }

  protected removeNode(node: LinkedNode<CacheNode<V>>): void {
    const { key, times } = node.value;
    this.mapCache.remove(key);

    const list = this.mapTimesList.get(times) as LinkedList<CacheNode<V>>;
    list.remove(node);
    if (list.isEmpty()) {
      this.mapTimesList.remove(times);
    }
  }

  protected removeStaleNode(): void {
    // TODO: update leastTimes
    const times = this.leastTimes;
    const list = this.mapTimesList.get(times) as LinkedList<CacheNode<V>>;

    const node = list.getFirst() as LinkedNode<CacheNode<V>>;

    this.removeNode(node);
  }
}
