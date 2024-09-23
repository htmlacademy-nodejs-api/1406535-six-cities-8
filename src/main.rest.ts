import { PinoLogger } from './shared/libs/logger/pino.logger.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { RESTApp } from './rest/rest.app.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);

  const app = new RESTApp(logger, config);
  await app.init();
}

bootstrap();
