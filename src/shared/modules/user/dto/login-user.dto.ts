import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Field must be a valid email address' })
  public email: string;

  @IsString({ message: 'Password is required' })
  public password: string;
}
