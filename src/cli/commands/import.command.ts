import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private onOfferImport(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} offers imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...params: string[]): Promise<void> {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onOfferImport);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err: unknown) {
      console.error(`Can't import data from file: ${fileName}.`);

      if (err instanceof Error) {
        console.error(`Details: ${err.message}`);
      }
    }
  }
}
