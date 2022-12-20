import LinkedList from '@daifee/linked-list';

export default class Stack<D> {
  protected list: LinkedList<D>;

  constructor(value?: D[]) {
    this.list = new LinkedList(value);
  }

  size(): number {
    return this.list.size();
  }

  push(data: D): boolean {
    return this.list.addLast(data);
  }

  pop(): D | undefined {
    const data = this.list.getLast();
    this.list.removeLast();
    return data;
  }
}
