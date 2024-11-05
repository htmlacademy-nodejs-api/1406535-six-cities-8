import { Expose } from 'class-transformer';
import { UserType } from '../../../const.js';

export class LoggedUserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public type: UserType;

  @Expose()
  public avatar: string;
}
