import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Component } from '../../const.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CommentService } from './index.js';
import { OfferService } from '../offer/index.js';
import { HttpError } from '../../libs/rest/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController');

    this.addRoute({ path: '/', method: 'post', handler: this.create });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
    const allComments = await this.commentService.findByOfferId(body.offerId);
    const commentCount = allComments.length;
    const totalRating = allComments.reduce((sum, current) => sum + current.rating, 0);
    const rating = parseFloat((totalRating / commentCount).toFixed(1));
    await this.offerService.updateById(body.offerId, { rating, commentCount });
  }
}
