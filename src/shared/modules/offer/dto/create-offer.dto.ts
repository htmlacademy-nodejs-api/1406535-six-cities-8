import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsIn, IsInt, IsMongoId, IsObject, IsString, Length, Matches, Max, Min, MinLength, ValidateNested } from 'class-validator';
import { CITIES_LIST, FACILITIES, OfferType } from '../../../const.js';
import { Type } from 'class-transformer';
import { LocationRdo } from './location.dto.js';

const IMAGES_TYPES = /\.(gif|jpe?g|png|webp|bmp)$/i;

export class CreateOfferDto {
  @IsString()
  @Length(10, 100, { message: 'Title must be longer than 10 and shorter than 100 chars' })
  public title: string;

  @IsString()
  @Length(20, 1024, { message: 'Description must be at least 20 and up to 1024 chars' })
  public description: string;

  @IsIn(CITIES_LIST)
  public cityName: string;

  @IsString()
  @MinLength(5)
  @Matches(IMAGES_TYPES, { message: 'Field preview must be string with path to one of image type: gif, jpg, png, webp, bmp' })
  public preview: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  @MinLength(5, { each: true })
  @Matches(IMAGES_TYPES, { each: true, message: 'Field images must be an array of 6 images of type: gif, jpg, png, webp, bmp' })
  public images: string[];

  @IsBoolean()
  public isPremium: boolean;

  @IsEnum(OfferType)
  public type: OfferType;

  @IsInt({ message: 'Field rooms must be an integer' })
  @Min(1, { message: '1 room min' })
  @Max(8, { message: '8 rooms max' })
  public rooms: number;

  @IsInt({ message: 'Field guests must be an integer' })
  @Min(1, { message: '1 guest min' })
  @Max(10, { message: '10 guests max' })
  public guests: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price: number;

  @IsArray()
  @IsIn(FACILITIES, { each: true })
  public facilities: string[];

  public userId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LocationRdo)
  public location: LocationRdo;
}
