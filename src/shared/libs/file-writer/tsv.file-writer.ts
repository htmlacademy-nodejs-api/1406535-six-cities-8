import { WriteStream, createWriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(
    fileName: string
  ) {
    this.stream = createWriteStream(fileName, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(line: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${line}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
