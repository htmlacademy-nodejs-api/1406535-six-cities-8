import { DotenvParseOutput, config } from 'dotenv';
import { Config } from './config.interface.js';
import { PinoLogger } from '../logger/pino.logger.js';

export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;

  constructor(
    private readonly logger: PinoLogger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env-file.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env-file found and successfully parsed!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
