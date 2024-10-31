import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Component } from '../../const.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { BaseController } from '../../../rest/controller/base-controller.abstract.js';
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

  public create(_req: CreateUserRequest, _res: Response): void {
    throw new Error('[UserController] Oops');
  }
}
