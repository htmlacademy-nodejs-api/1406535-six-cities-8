import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
    } catch (err: unknown) {
      console.error('Can\'t generate offers.');

      if (err instanceof Error) {
        console.error(`Details: ${err.message}`);
      }
    }
  }
}
