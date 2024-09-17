import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.

      Пример: ${chalk.blueBright('cli.js --<command> [--arguments]')}

      Команды:
        ${chalk.bgBlue('--version')}                  ${chalk.redBright('# выводит номер версии')}
        ${chalk.bgBlue('--help')}                     ${chalk.redBright('# печатает этот текст')}
        ${chalk.bgBlue('--import')} <filepath>        ${chalk.redBright('# импортирует данные из tsv-файла')}
    `);
  }
}
