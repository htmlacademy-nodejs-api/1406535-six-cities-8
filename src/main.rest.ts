#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { Component } from './shared/const.js';
import { RESTApplication } from './rest/rest.application.js';

async function bootstrap() {
  const container = Container.merge(createRestApplicationContainer());

  const application = container.get<RESTApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
