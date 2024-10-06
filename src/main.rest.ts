#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { RESTApplication } from './rest/rest.application.js';
import { Component } from './shared/const.js';
import { PinoLogger } from './shared/libs/logger/pino.logger.js';
import { Logger } from './shared/libs/logger/logger.interface.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { MongoDatabaseClient } from './shared/libs/database-client/mongo.database-client.js';
import { DatabaseClient } from './shared/libs/database-client/database-client.interface.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RESTApplication>(Component.RestApplication).to(RESTApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const application = container.get<RESTApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
