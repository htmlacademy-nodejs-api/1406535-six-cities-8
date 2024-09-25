import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '#types/index.js';
import { TSVOfferGenerator } from '#libs/offer-generator/tsv.offer-generator.js';
import { TSVFileWriter } from '#libs/file-writer/tsv.file-writer.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, сount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < сount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;

    try {
      await this.load(url);
      await this.write(filePath, Number.parseInt(count, 10));
      console.info(`File ${filePath} was created!`);
    } catch (err: unknown) {
      console.error('Can\'t generate offers.');

      if (err instanceof Error) {
        console.error(`Details: ${err.message}`);
      }
    }
  }
}
