import { City, Location, OfferType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public preview?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: OfferType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public facilities?: string[];
  public userId?: string;
  public location?: Location;
  public rating?: number;
  public commentCount?: number;
}
