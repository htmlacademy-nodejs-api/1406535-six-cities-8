import { City } from './city.type.js';
import { OfferType } from './offer-type.type.js';
import { FACILITIES } from '../const.js';
import { User } from './user.type.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  descriptoin: string;
  postDate: Date;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  facilities: typeof FACILITIES;
  user: User;
  comments: number;
  location: Location;
}
