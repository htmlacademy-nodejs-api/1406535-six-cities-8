import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FacilityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'facilities',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FacilityEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public name: string;
}

export const FacilityModel = getModelForClass(FacilityEntity);
