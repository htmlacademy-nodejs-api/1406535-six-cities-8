import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/http-error.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../const.js';
import { OfferService } from './index.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: 'get', handler: this.index });
    this.addRoute({ path: '/', method: 'post', handler: this.create });
    this.addRoute({ path: '/:offerId', method: 'get', handler: this.show });
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'OfferController');
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }
}
