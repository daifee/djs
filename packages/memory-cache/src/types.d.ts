
export abstract class Cache<D> {
  protected size: number;

  constructor(size: number) {
    this.size = size;
  }

  set(key: string, data: D): boolean;

  put(key: string): D | undefined;
}
