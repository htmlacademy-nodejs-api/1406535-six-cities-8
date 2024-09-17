import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, User, Location, City } from '../../types/index.js';
import { CITIES, CITIES_LIST } from '../../const.js';

const defaultCity = CITIES[0];

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string = ''
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File wasn\'t read.');
    }
  }

  private parseCity(cityName: string): City {
    if (!CITIES_LIST.includes(cityName)) {
      throw new Error(`Wrong city - (${cityName}).`);
    }

    return CITIES.find((city) => city.name === cityName) || defaultCity;
  }

  private parseImages(images: string): string[] {
    return images.split(';');
  }

  private parseFacilities(facilities: string): string[] {
    return facilities.split(';');
  }

  private parseUser(...params: string[]): User {
    const [name, email, avatar, password, isPro] = params;

    return {
      name,
      email,
      avatar,
      password,
      isPro: Boolean(isPro)
    };
  }

  private parseLocation(lat: string, long: string): Location {
    return {
      latitude: Number.parseInt(lat, 10),
      longitude: Number.parseInt(long, 10),
    };
  }

  private parseLineToOffer(line: string): Offer {
    const [title, description, postDate, city, preview, images, isPremium, isFavorite, rating, type, rooms, guests, price, facilities, name, email, avatar, password, isPro, comments, lat, long] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: this.parseCity(city),
      preview,
      images: this.parseImages(images),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: Number.parseInt(rating, 10),
      type: type as OfferType,
      rooms: Number.parseInt(rooms, 10),
      guests: Number.parseInt(guests, 10),
      price: Number.parseInt(price, 10),
      facilities: this.parseFacilities(facilities),
      user: this.parseUser(name, email, avatar, password, isPro),
      comments: Number.parseInt(comments, 10),
      location: this.parseLocation(lat, long),
    };
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
