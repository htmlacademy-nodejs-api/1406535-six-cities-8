import { Command } from './commands/command.interface.js';

type CommandList = Record<string, Command>;

export class CLIApp {
  private commands: CommandList = {};

  public registerCommands(commandItems: Command[]): void {
    commandItems.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered.`);
      }

      this.commands[command.getName()] = command;
    });
  }
}
