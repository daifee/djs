import { Buffer } from 'node:buffer';
import { Writable, WritableOptions } from 'node:stream';

export default class MessageParser extends Writable {
  message: Buffer[];

  constructor(options: WritableOptions) {
    super(options);

    this.message = [];
  }

  _write(chunk: Buffer): void {
    this.message.push(chunk);
  }
}
