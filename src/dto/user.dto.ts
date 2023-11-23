import { IsString, IsInt, IsUrl } from 'class-validator';

export class UserDto {
  @IsString()
  readonly userId: string;

  @IsUrl()
  readonly avatar_url: string;

  @IsString()
  readonly name: string;

  @IsInt()
  readonly xp: number;

  @IsInt()
  readonly level: number;
}
