import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.

      Пример: ${chalk.redBright('cli.js --<command> [--arguments]')}

      Команды:
        ${chalk.bgBlue('--version')}                              ${chalk.blueBright('# выводит номер версии')}
        ${chalk.bgBlue('--help')}                                 ${chalk.blueBright('# печатает этот текст')}
        ${chalk.bgBlue('--import')} <filepath>                    ${chalk.blueBright('# импортирует данные из tsv-файла')}
        ${chalk.bgBlue('--generate')} <n> <filepath> <url>        ${chalk.blueBright('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
