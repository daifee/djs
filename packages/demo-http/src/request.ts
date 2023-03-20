
import * as net from 'node:net';
import { URL } from 'node:url';
import { Buffer } from 'node:buffer';
import Headers from './headers';
import ResponseParser from './response-parser';

const LRLN = '\r\n';

export type Method = 'GET' | 'POST' | 'PUT' | 'HEAD';

export interface RequestOptions {
  url: string
  method: Method
  port?: number
  headers?: { [key: string]: string }
  body?: string | Buffer
}

export type RequestCallback = (error: Error | null, message?: Response) => void;

class Request {
  readonly options: RequestOptions;
  private callback?: RequestCallback;

  readonly connection: net.Socket;

  //
  readonly url: URL;
  readonly hostname: string;
  readonly pathname: string;
  readonly search: string;
  get port(): number {
    if (this.options.port != null) {
      return this.options.port;
    }
    if (this.url.port !== '') {
      return parseInt(this.url.port, 10);
    }

    return 80;
  }

  readonly method: Method;

  readonly headers: Headers;
  readonly response: ResponseParser;

  constructor(options: RequestOptions, callback?: RequestCallback) {
    this.options = options;
    this.callback = callback;

    this.url = new URL(options.url);
    this.hostname = this.url.hostname;
    this.pathname = this.url.pathname;
    this.search = this.url.search;
    this.method = options.method;

    this.connection = this.getConnection();

    this.response = new ResponseParser();

    /**
     * headers
     */
    this.headers = new Headers();
    // 默认
    this.headers.set('host', this.hostname);
    this.headers.set('accept', '*/*');
    this.headers.set('user-agent', 'demo/1.0.0');
    // 自定义
    if (options.headers != null) {
      const headers = options.headers;
      Object.keys(headers).forEach((name) => {
        this.headers.set(name, headers[name]);
      });
    }

    this.connection.on('connect', () => {
      this.send();
    });
    this.connection.on('data', (data: Buffer) => {
      this.response.push(data);
    });
    this.connection.on('end', () => {
      console.log('end');
    });
    this.connection.on('close', (hasError: boolean) => {
      console.log('close');
    });
    // Emitted when an error occurs. The 'close' event will be called directly following this event.
    this.connection.on('error', (error: Error) => {
      this.catchError(error);
    });
    // Emitted after resolving the host name but before connecting. Not applicable to Unix sockets.
    this.connection.on('lookup', (error: Error | undefined, address: string, family: string | number, host: string) => {
      this.catchError(error);
    });
    // Emitted if the socket times out from inactivity. This is only to notify that the socket has been idle. The user must manually close the connection.
    this.connection.on('timeout', () => {
      this.catchError(new Error('time out'));
    });

    setTimeout(() => {
      this.response.log();
    }, 10000);
  }

  private send(): void {
    this.sendRequestLine();
    this.sendHeaders();
    this.sendBody();
  }

  private sendRequestLine(): void {
    const content = `${this.method} ${this.pathname}${this.search} HTTP/1.1${LRLN}`;
    this.write(content);
  }

  private sendHeaders(): void {
    const headers = this.headers.entries();
    for (const [name, value] of headers) {
      this.sendHeader(name, value);
    }
  }

  private sendHeader(name: string, value: string): void {
    const content = `${name}: ${value}${LRLN}`;
    this.write(content);
  }

  private sendBody(): void {
    const body = this.options.body;
    if (body == null) {
      this.write(`${LRLN}`);
      return;
    }

    const size = typeof body === 'object' ? body.length : Buffer.byteLength(body);
    this.sendHeader('content-length', `${size}`);
    this.write(body);
  }

  private write(data: string | Buffer): boolean {
    console.log('write', data);
    return this.connection.write(data, this.catchError);
  }

  private getConnection(): net.Socket {
    const socket = net.createConnection(this.port, this.hostname);
    return socket;
  }

  private readonly catchError = (error: Error | undefined): void => {
    if (error != null && (this.callback != null)) {
      console.error(error);

      this.callback(error);
      delete this.callback;
    }
  };
}

export function request(options: RequestOptions, callback?: RequestCallback): Request {
  const req = new Request(options, callback);

  return req;
}

request({
  url: 'http://baidu.com',
  method: 'GET'
}, (error, response) => {
  console.log(error, response);
});
