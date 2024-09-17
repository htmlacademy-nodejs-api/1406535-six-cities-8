import { CLIApp, HelpCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApp;
  cliApp.registerCommands([new HelpCommand, new VersionCommand]);

  cliApp.processCommand(process.argv);
}

bootstrap();
