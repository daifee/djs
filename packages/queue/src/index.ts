
import LinkedList from '@daifee/linked-list';

export default class Queue<D> {
  protected list: LinkedList<D>;

  constructor(value?: D[]) {
    this.list = new LinkedList<D>(value);
  }

  size(): number {
    return this.list.size();
  }

  enqueue(data: D): void {
    this.list.addLast(data);
  }

  dequeue(): D | undefined {
    if (this.size() === 0) {
      return undefined;
    }

    const first = this.list.getFirst();
    this.list.removeFirst();

    return first;
  }
}
