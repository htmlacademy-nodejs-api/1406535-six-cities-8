import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId({ message: 'Field offerId must be a valid id' })
  public offerId: string;

  @IsString()
  @Length(5, 1024, { message: 'Comment must be more than 5 and up to 1024 chars' })
  public text: string;

  @IsInt()
  @Min(1)
  @Max(5)
  public rating: number;

  public userId?: string;
}
