
export interface HeadersObject {
  [key: string]: string
}

export type HeadersArray = Array<[string, string]>;

export type InitHeaders = HeadersObject | HeadersArray | Headers;

function encodeName(name: string): string {
  return name.toLowerCase();
}

export default class Headers {
  private readonly entiry: Map<string, string> = new Map();

  constructor(init?: InitHeaders) {
    if (init instanceof Headers) {
      const iterator = init.entries();
      for (const [name, value] of iterator) {
        this.set(name, value);
      }
    } else if (Array.isArray(init)) {
      for (const [name, value] of init) {
        this.set(name, value);
      }
    } else if (init != null) {
      Object.keys(init).forEach((name) => {
        this.set(name, init[name]);
      });
    }
  }

  set(name: string, value: string): void {
    name = encodeName(name);
    this.entiry.set(name, value);
  }

  get(name: string): string | undefined {
    name = encodeName(name);
    return this.entiry.get(name);
  }

  delete(name: string): void {
    name = encodeName(name);
    this.entiry.delete(name);
  }

  append(name: string, value: string): void {
    name = encodeName(name);

    const oldValue = this.get(name);
    if (oldValue != null) {
      value = oldValue + ', ' + value;
    }

    this.set(name, value);
  }

  has(name: string): boolean {
    name = encodeName(name);
    return this.entiry.has(name);
  }

  forEach(callback: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
    this.entiry.forEach(callback, thisArg);
  }

  entries(): IterableIterator<[string, string]> {
    return this.entiry.entries();
  }

  keys(): IterableIterator<string> {
    return this.entiry.keys();
  }

  values(): IterableIterator<string> {
    return this.entiry.values();
  }
}
