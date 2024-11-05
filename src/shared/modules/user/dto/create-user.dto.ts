import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserType } from '../../../const.js';

export class CreateUserDto {
  @IsString()
  @Length(1, 15, { message: 'Name must be longer than 1 and shorter than 15 chars' })
  public name: string;

  @IsEmail({}, { message: 'Field must be a valid email address' })
  public email: string;

  @IsEnum(UserType)
  public type: UserType;

  @IsString()
  @Length(6, 12, { message: 'Password must be more than 6 and up to 12 chars' })
  public password: string;
}
