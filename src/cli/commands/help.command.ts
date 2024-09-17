import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.

      Пример: cli.js --<command> [--arguments]

      Команды:
        --version:                   # выводит номер версии
        --help:                      # печатает этот текст
        --import <filepath>:         # импортирует данные из tsv-файла
    `);
  }
}
