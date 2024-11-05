import { Expose, Transform } from 'class-transformer';
import { OfferRdo } from './offer.rdo.js';

export class FavoriteOfferRdo extends OfferRdo {
  @Expose()
  @Transform(({ value }) => !value)
  declare public isFavorite: boolean;
}
