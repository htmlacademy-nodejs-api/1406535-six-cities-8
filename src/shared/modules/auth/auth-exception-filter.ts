import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Component } from '../../const.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { BaseUserException } from './errors/base-user.exception.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({ type: 'AUTHORIZATION', error: error.message });
  }
}
