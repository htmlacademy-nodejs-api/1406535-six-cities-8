import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/http-error.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../const.js';
import { OfferService } from './index.js';
import { ParamOfferId } from './types/param-offerid.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/:offerId', method: 'get', handler: this.show });
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'OfferController');
    }

    this.ok(res, offer);
  }

}
