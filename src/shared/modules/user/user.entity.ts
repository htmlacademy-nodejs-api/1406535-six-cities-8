import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

export class UserEntity implements User {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false })
  public avatar: string;

  @prop({ required: true })
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);
