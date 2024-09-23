import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { Config } from '../shared/libs/config/config.interface.js';

export class RESTApp {
  constructor(
    private readonly logger: PinoLogger,
    private readonly config: Config,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
