
export default class LinkedNode<D> {
  declare data: D;
  next: LinkedNode<D> | null = null;

  constructor (data: D) {
    this.data = data;
  }
}
