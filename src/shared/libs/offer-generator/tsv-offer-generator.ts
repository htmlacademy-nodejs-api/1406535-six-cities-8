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

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData
  ) {}

  generate(): string {
    const title = `Proposal ${getRandomNumber(0, 10000)}`;
    const description = getSomeArrayItems(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(getRandomNumber(1, 7), 'day')
      .toISOString();
    const city = CITIES_LIST[getRandomNumber(0, CITIES_LIST.length)];
    const preview = getSomeArrayItems(this.mockData.previews);
    const images = [getSomeArrayItems(this.mockData.images, IMAGES_QUANTITY)].join(';');
    const isPremium = getSomeArrayItems([false, true]);
    const isFavorite = getSomeArrayItems([false, true]);
    const rating = getRandomNumber(1, 5, 1);
    const type = getSomeArrayItems(['apartment', 'house', 'room', 'hotel']);
    const rooms = getRandomNumber(Rooms.MIN, Rooms.MAX);
    const guests = getRandomNumber(Guests.MIN, Guests.MAX);
    const price = getRandomNumber(Price.MIN, Price.MAX);
    const facilities = [getSomeArrayItems(this.mockData.facilities, getRandomNumber(0, this.mockData.facilities.length))].join(';');
    const user = getSomeArrayItems(this.mockData.users);
    const email = getSomeArrayItems(this.mockData.emails);
    const avatar = getSomeArrayItems(this.mockData.avatars);
    const pass = '*******';
    const isPro = getSomeArrayItems([false, true]);
    const lat = getRandomNumber(Position.LAT_MIN, Position.LAT_MAX, Position.RANK);
    const long = getRandomNumber(Position.LONG_MIN, Position.LONG_MAX, Position.RANK);

    return [title, description, createdDate, city, preview, images, isPremium, isFavorite, rating, type, rooms, guests, price, facilities, user, email, avatar, pass, isPro, lat, long].join('\t');
  }
}
