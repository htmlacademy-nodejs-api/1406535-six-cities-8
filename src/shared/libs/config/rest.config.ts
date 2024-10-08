import { config } from 'dotenv';
import { injectable, inject } from 'inversify';
import { Config } from './config.interface.js';
import { PinoLogger } from '#libs/logger/pino.logger.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '#shared/const.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: PinoLogger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env-file.');
    }

    configRestSchema.load({});
    configRestSchema.validate({
      allowed: 'strict',
      output: this.logger.info,
    });
    this.config = configRestSchema.getProperties();
    this.logger.info('.env-file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
