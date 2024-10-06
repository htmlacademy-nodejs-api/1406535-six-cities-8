import { injectable, inject } from 'inversify';
import { Config } from 'convict';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/const.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';

@injectable()
export class RESTApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: PinoLogger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) { }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');
  }
}
