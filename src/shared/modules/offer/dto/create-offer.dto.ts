import { Length } from 'class-validator';
import { City, Location, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  @Length(10, 100, { message: 'Title must be longer than 10 and shorter than 100 chars' })
  public title: string;

  public description: string;
  public postDate: Date;
  public city: City;
  public preview: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public type: OfferType;
  public rooms: number;
  public guests: number;
  public price: number;
  public facilities: string[];
  public userId: string;
  public location: Location;
}
