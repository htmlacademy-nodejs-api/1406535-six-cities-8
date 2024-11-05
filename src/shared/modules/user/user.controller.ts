import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Component } from '../../const.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CreateUserDto, UserService } from './index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './types/login-user-request.type.js';
import { CreateUserRequest } from './types/create-user-request.type.js';
import { BaseController, HttpError, PrivateRouteMiddleware, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { AuthService } from '../auth/index.js';
import { OfferService } from '../offer/index.js';
import { FavoriteOfferRdo } from '../offer/rdo/favorite-offer.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController');

    this.addRoute({
      path: '/register',
      method: 'post',
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: 'post',
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: 'get',
      handler: this.checkAuthenticate,
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: 'post',
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: 'get',
      handler: this.getFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: 'post',
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: 'delete',
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email «${body.email}» exists.`, 'UserController');
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(UserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, { filepath: req.file?.path });
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, foundedUser));
  }

  public async getFavorite({ tokenPayload: { email } }: Request, res: Response) {
    const user = await this.userService.findByEmail(email);
    const offers = await this.offerService.findByIds(user?.favorites as string[]);
    this.ok(res, fillDTO(FavoriteOfferRdo, offers));
  }

  public async addFavorite({ body, tokenPayload: { email } }: Request, res: Response) {
    const user = await this.userService.findByEmail(email);
    const favorites = user?.favorites;
    const offer = await this.offerService.findById(body.offerId);
    if (!favorites?.includes(offer?.id)) {
      favorites?.push(offer?.id);
      this.userService.updateById(user?.id, { favorites });
    }
    this.ok(res, fillDTO(FavoriteOfferRdo, offer));
  }

  public async deleteFavorite({ body, tokenPayload: { email } }: Request, res: Response) {
    const user = await this.userService.findByEmail(email);
    const favorites = user?.favorites;
    const offer = await this.offerService.findById(body.offerId);
    if (favorites?.includes(offer?.id)) {
      const newFavorites = favorites?.filter((offerId) => offerId !== offer?.id);
      this.userService.updateById(user?.id, { favorites: newFavorites });
    }
    this.noContent(res, null);
  }
}
