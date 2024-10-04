import { injectable, inject } from 'inversify';
import { Config } from 'convict';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/const.js';

@injectable()
export class RESTApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: PinoLogger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) { }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
