import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { getRandomNumber, getSomeArrayItems } from '../../helpers/index.js';
import { CITIES_LIST } from '../../const.js';

const Price = {
  MIN: 100,
  MAX: 100000,
} as const;

const Rooms = {
  MIN: 1,
  MAX: 8,
} as const;

const Guests = {
  MIN: 1,
  MAX: 10,
} as const;

const Position = {
  LAT_MIN: 48,
  LAT_MAX: 54,
  LONG_MIN: 2,
  LONG_MAX: 11,
  RANK: 6,
} as const;

const IMAGES_QUANTITY = 6;
const MAX_OFFER_NUMBER = 1000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData
  ) {}

  private uniteToString(items: string | string[], unifier: string = ';'): string {
    return typeof items === 'string' ? items : items.join(unifier);
  }

  private getFacilities(): string {
    const number = getRandomNumber(0, this.mockData.facilities.length);

    if (number === 0) {
      return '';
    }

    return this.uniteToString(getSomeArrayItems(this.mockData.facilities, number));
  }

  public generate(): string {
    const title = `Proposal ${getRandomNumber(0, MAX_OFFER_NUMBER)}`;
    const description = getSomeArrayItems(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(getRandomNumber(1, 7), 'day')
      .toISOString();
    const city = CITIES_LIST[getRandomNumber(0, CITIES_LIST.length - 1)];
    const preview = getSomeArrayItems(this.mockData.previews);
    const images = this.uniteToString(getSomeArrayItems(this.mockData.images, IMAGES_QUANTITY));
    const isPremium = getSomeArrayItems([false, true]);
    const isFavorite = getSomeArrayItems([false, true]);
    const rating = getRandomNumber(1, 5, 1);
    const type = getSomeArrayItems(['apartment', 'house', 'room', 'hotel']);
    const rooms = getRandomNumber(Rooms.MIN, Rooms.MAX);
    const guests = getRandomNumber(Guests.MIN, Guests.MAX);
    const price = getRandomNumber(Price.MIN, Price.MAX);
    const facilities = this.getFacilities();
    const user = getSomeArrayItems(this.mockData.users);
    const email = getSomeArrayItems(this.mockData.emails);
    const avatar = getSomeArrayItems(this.mockData.avatars);
    const isPro = getSomeArrayItems([false, true]);
    const lat = getRandomNumber(Position.LAT_MIN, Position.LAT_MAX, Position.RANK);
    const long = getRandomNumber(Position.LONG_MIN, Position.LONG_MAX, Position.RANK);

    return [title, description, createdDate, city, preview, images, isPremium, isFavorite, rating, type, rooms, guests, price, facilities, user, email, avatar, '*******', isPro, lat, long].join('\t');
  }
}
