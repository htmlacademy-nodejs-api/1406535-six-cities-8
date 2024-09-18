import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...params: string[]): Promise<void> {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.extractOffers());
    } catch (err: unknown) {
      console.error(`Can't import data from file: ${fileName}.`);

      if (err instanceof Error) {
        console.error(`Details: ${err.message}`);
      }
    }
  }
}
