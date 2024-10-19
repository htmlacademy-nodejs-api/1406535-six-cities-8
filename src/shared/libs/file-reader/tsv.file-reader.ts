import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { City, Location, Offer, OfferType, User } from '../../types/index.js';
import { CITIES, CITIES_LIST } from '../../const.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly fileName: string = ''
  ) {
    super();
  }

  private getCity(cityName: string): City {
    if (!CITIES_LIST.includes(cityName)) {
      throw new Error(`Wrong city - ${cityName}`);
    }

    return CITIES.find((city) => city.name === cityName) as City;
  }

  private parseToArray(line: string, separator: string = ';'): string[] {
    return line.split(separator) ?? [];
  }

  private parseUser(...params: string[]): User {
    const [name, email, avatar, password, isPro] = params;

    return {
      name,
      email,
      avatar,
      password,
      isPro: this.parseToBoolean(isPro),
    };
  }

  private parseLocation(lat: string, long: string): Location {
    return {
      latitude: this.parseToNumber(lat),
      longitude: this.parseToNumber(long),
    };
  }

  private parseToBoolean(value: string): boolean {
    if (value !== 'false' && value !== 'true') {
      throw new Error(`Isn't boolean value - ${value}`);
    }

    return value === 'true';
  }

  private parseToNumber(value: string): number {
    const clearedValue = value.replaceAll(' ', '').replace(',', '.');
    const result = clearedValue.includes('.') ?
      Number.parseFloat(clearedValue) :
      Number.parseInt(clearedValue, 10);

    if (typeof result !== 'number') {
      throw new Error(`Isn't numeric value - ${value}`);
    }

    return result;
  }

  private parseLineToOffer(line: string): Offer {
    const [title, description, postDate, city, preview, images, isPremium, isFavorite, rating, type, rooms, guests, price, facilities, name, email, avatar, password, isPro, lat, long] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: this.getCity(city),
      preview,
      images: this.parseToArray(images),
      isPremium: this.parseToBoolean(isPremium),
      isFavorite: this.parseToBoolean(isFavorite),
      rating: this.parseToNumber(rating),
      type: type as OfferType,
      rooms: this.parseToNumber(rooms),
      guests: this.parseToNumber(guests),
      price: this.parseToNumber(price),
      facilities: this.parseToArray(facilities),
      user: this.parseUser(name, email, avatar, password, isPro),
      location: this.parseLocation(lat, long),
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.fileName, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let lineCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const singleLine = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        lineCount++;

        const parsedOffer = this.parseLineToOffer(singleLine);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', lineCount);
  }
}
