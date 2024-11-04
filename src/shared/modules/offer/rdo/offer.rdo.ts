import { Expose, Transform, Type } from 'class-transformer';
import { City, Location } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { CITIES, OfferType } from '../../../const.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'createdAt' })
  public postDate: Date;

  @Expose({ name: 'cityName' })
  @Transform(({ value }) => CITIES.find((item) => item.name === value))
  public city: City;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public type: OfferType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public facilities: string[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public location: Location;

  @Expose()
  public commentCount: number;

  @Expose()
  public rating: number;
}
