
export class FIFOCache<DATA> {
  protected size: number;
  protected hash: Map<string, DATA>;
  protected list: string[];

  constructor(size: number) {
    this.size = size;
    this.hash = new Map();
    this.list = [];
  }

  put(key: string, data: DATA): void {
    const index = this.list.indexOf(key);
    if (index !== -1) {
      this.list.splice(index, 1);
    }

    this.list.push(key);
    if (this.size < this.list.length) {
      const expiredKey = this.list.shift() as string;
      this.hash.delete(expiredKey);
    }

    this.hash.set(key, data);
  }

  get(key: string): DATA | undefined {
    return this.hash.get(key);
  }
}

export class LRUCache<DATA> {
  protected size: number;
  protected hash: Map<string, DATA>;
  protected list: string[];

  constructor(size: number) {
    this.size = size;
    this.hash = new Map<string, DATA>();
    this.list = [];
  }

  put(key: string, data: DATA): void {
    this.refresh(key);

    if (this.size < this.list.length) {
      const expiredKey = this.list.shift() as string;
      this.hash.delete(expiredKey);
    }

    this.hash.set(key, data);
  }

  get(key: string): DATA | undefined {
    const data = this.hash.get(key);

    if (data !== undefined) {
      this.refresh(key);
    }

    return data;
  }

  refresh(key: string): void {
    const index = this.list.indexOf(key);
    if (index !== -1) {
      this.list.splice(index, 1);
    }

    this.list.push(key);
  }
}

export const LFUCache = LRUCache;
