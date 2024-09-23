import { PinoLogger } from '../shared/libs/logger/pino.logger.js';

export class RESTApp {
  constructor(
    private readonly logger: PinoLogger
  ) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}
