import { LinkedNode } from './linked-list';
import HashMap from './hash-map';

export class CacheMeta<V> {
  key: string;
  value: V;

  constructor(key: string, value: V) {
    this.key = key;
    this.value = value;
  }
}

export abstract class AbstractCache<V> {
  protected capacity: number;
  protected cache: HashMap<string, LinkedNode<CacheMeta<V>>>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new HashMap();
  }

  get size(): number {
    return this.cache.size;
  }

  abstract get(key: string): V | undefined;

  abstract put(key: string, value: V): void;

  abstract delete(key: string): boolean;

  abstract clear(): void;

  protected abstract deleteExpiredValue(): void;
}
