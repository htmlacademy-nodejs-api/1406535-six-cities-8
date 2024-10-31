import { injectable, inject } from 'inversify';
import { Config } from 'convict';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/const.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';

@injectable()
export class RESTApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: PinoLogger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {
    this.server = express();
  }

  private async initDataBase() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.get('/', (_req, res) => {
      res.send('Hello');
    });
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database...');
    await this.initDataBase();
    this.logger.info('Init database completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
