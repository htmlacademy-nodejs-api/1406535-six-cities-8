#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger } from '#libs/logger/logger.interface.js';
import { PinoLogger } from '#libs/logger/pino.logger.js';
import { RESTApplication } from './rest/rest.application.js';
import { Config, RestConfig, RestSchema } from '#libs/config/index.js';
import { Component } from '#shared/const.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RESTApplication>(Component.RestApplication).to(RESTApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RESTApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
