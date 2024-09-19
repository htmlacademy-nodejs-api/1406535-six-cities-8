import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(...params: string[]): Promise<void> | void {
    const [count, filePath, url] = params;
    const offerCount = Number.parseInt(count, 10);
  }
}
