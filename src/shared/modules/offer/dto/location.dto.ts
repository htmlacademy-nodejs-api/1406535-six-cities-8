import { IsLatitude, IsLongitude } from 'class-validator';

export class LocationRdo {
  @IsLatitude()
  public latitude: number;

  @IsLongitude()
  public longitude: number;
}
