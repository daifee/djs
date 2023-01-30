
export default class HashMap<K, V> {
  protected map: Map<K, V>;

  constructor() {
    this.map = new Map();
  }

  get size(): number {
    return this.map.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  put(key: K, value: V): void {
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  remove(key: K): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    return this.map.clear();
  }
}
