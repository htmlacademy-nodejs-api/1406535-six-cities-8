import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { City, Location, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title: string;

  @prop({ trim: true, required: true })
  public description: string;

  @prop({ required: true })
  public city: City;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: false, default: false })
  public isFavorite: boolean;

  @prop({ required: false, default: 0 })
  public rating: number;

  @prop({ required: true })
  public type: OfferType;

  @prop({ required: true })
  public rooms: number;

  @prop({ required: true })
  public guests: number;

  @prop({ required: true })
  public price: number;

  @prop({ required: true })
  public facilities: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({ required: false, default: 0 })
  public commentCount: number;

  @prop({ required: true })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
