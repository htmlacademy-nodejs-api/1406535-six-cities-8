import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Facility } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FacilityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'facilities',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FacilityEntity extends defaultClasses.TimeStamps implements Facility {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const FacilityModel = getModelForClass(FacilityEntity);
