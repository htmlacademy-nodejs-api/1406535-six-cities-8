import { ClassConstructor, plainToInstance } from 'class-transformer';

export function getRandomNumber(a: number, b: number, rank: number = 0) {
  return +(Math.random() * (b - a) + a).toFixed(rank);
}

export function getSomeArrayItems<T>(items: T[], quantity: number = 1): T | T[] {
  if (quantity > items.length) {
    throw new Error('Where aren\'t enought elements in array');
  }

  if (quantity === 1) {
    return items[getRandomNumber(0, items.length - 1)] as T;
  }

  const set = new Set();
  while (set.size < quantity) {
    set.add(items[getRandomNumber(0, items.length - 1)]);
  }

  return [...set] as T[];
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
