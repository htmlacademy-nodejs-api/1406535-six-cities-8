import { inject, injectable } from 'inversify';
import { NextFunction, Response } from 'express';
import { Component } from '../../const.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { CreateUserRequest } from './create-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController');

    this.addRoute({ path: '/register', method: 'post', handler: this.create });
  }

  public async create(_req: CreateUserRequest, _res: Response, _next: NextFunction): Promise<void> {
    throw new Error('[UserController] Oops');
  }
}
