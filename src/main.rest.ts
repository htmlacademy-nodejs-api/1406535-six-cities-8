import { PinoLogger } from './shared/libs/logger/pino.logger.js';
import { RESTApp } from './rest/rest.app.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const app = new RESTApp(logger);
  await app.init();
}

bootstrap();
