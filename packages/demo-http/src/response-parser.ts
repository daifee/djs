
export default class ResponseParser {
  state: 'status-line' | 'headers' | 'body' = 'status-line';

  statusLineFragments: Buffer[] = [];
  headersFragments: Buffer[] = [];
  bodyFragments: Buffer[] = [];

  push(data: Buffer): void {
    if (this.state === 'status-line') {
      const remain = this.pushStatusLineData(data);
      if (remain != null) {
        this.state = 'headers';
        this.push(remain);
      }
      return;
    }

    if (this.state === 'headers') {
      const remain = this.pushHeadersData(data);
      if (remain != null) {
        this.state = 'body';
        this.push(remain);
      }
      return;
    }

    this.pushBodyData(data);
  }

  pushStatusLineData(data: Buffer): Buffer | null {
    const fragments = this.statusLineFragments.concat(data);
    const bufStatusLine = Buffer.concat(fragments);
    const index = bufStatusLine.indexOf('\r\n');

    if (index === -1) {
      this.statusLineFragments.push(data);
      return null;
    }
    // 包含换行
    const end = index + 2;
    const fragment = data.subarray(0, end);
    this.statusLineFragments.push(fragment);
    return data.subarray(end);
  }

  pushHeadersData(data: Buffer): Buffer | null {
    const fragments = this.headersFragments.concat(data);
    const bufStatusLine = Buffer.concat(fragments);
    const index = bufStatusLine.indexOf('\r\n\r\n');

    if (index === -1) {
      this.headersFragments.push(data);
      return null;
    }
    // 包含换行和空白行
    const end = index + 4;
    const fragment = data.subarray(0, end);
    this.headersFragments.push(fragment);
    return data.subarray(end);
  }

  pushBodyData(data: Buffer): void {
    this.bodyFragments.push(data);
  }

  parse(data: Buffer): void {

  }

  parseStatusLine(): void {

  }

  parseHeaders(): void {

  }

  parseBody(): void {

  }

  log(): void {
    this.print(this.statusLineFragments);
    this.print(this.headersFragments);
    this.print(this.bodyFragments);
  }

  print(list: Buffer[]): void {
    const str = Buffer.concat(list).toString('utf-8');
    console.log(str);
  }
}
