
import { Writable, WritableOptions } from 'node:stream';
import { Buffer } from 'node:buffer';
import { HeadersObject } from './headers';

export default class OutgoingMessage extends Writable {
  data: Buffer[];

  constructor(options: WritableOptions) {
    super(options);

    this.data = [];
  }

  /**
   * WritableStream
   */
  _construct(callback: (error?: Error | null | undefined) => void): void {
    //
  }

  // _destroy(error: Error | null, callback: (error?: Error | null | undefined) => void): void {
  //   //
  // }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
    console.log(chunk, encoding);
    callback();
  }

  _writev(chunks: Array<{ chunk: any, encoding: BufferEncoding }>, callback: (error?: Error | null | undefined) => void): void {
    //
  }

  _final(callback: (error?: Error | null | undefined) => void): void {
    //
  }

  addTrailers(headers: HeadersObject): void {

  }

  appendHeaders(name: string, value: string | string[]): OutgoingMessage {
    return this;
  }
}
