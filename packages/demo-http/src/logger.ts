
import { Writable, WritableOptions } from 'node:stream';
import * as fs from 'node:fs';

interface LoggerOptions extends WritableOptions {
  filepath: string
};

class Logger extends Writable {
  fileFD: number;
  filepath: string;

  constructor(options: LoggerOptions) {
    const { filepath, ...rest } = options;
    super(rest);

    this.filepath = filepath;
  }

  _construct(callback: (error?: Error | null | undefined) => void): void {
    fs.open(this.filepath, 'a', (err, fd) => {
      if (err != null) {
        callback(err);
      } else {
        this.fileFD = fd;
        callback();
      }
    });
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
    fs.write(this.fileFD, chunk, callback);
  }
}

const logger = new Logger({
  filepath: './log.txt'
});

logger.write('daifee\r\n');
logger.write(Buffer.from('zhang\n', 'utf-8'));
