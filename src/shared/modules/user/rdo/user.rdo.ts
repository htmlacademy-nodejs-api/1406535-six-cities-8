import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public id: string;
}
