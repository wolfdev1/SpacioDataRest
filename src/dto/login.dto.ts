import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Username must be a string'})
  @IsDefined({ message: 'Username must be defined'})
  @IsNotEmpty({ message: 'Username must not be empty'})
  username: string;

  @IsString({ message: 'Password must be a string'})
  @IsDefined({ message: 'Password must be defined'})
  @IsNotEmpty({ message: 'Password must not be empty'})
  password: string;
}
