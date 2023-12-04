import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsEnum,
  Min,
} from 'class-validator';

export class UserRegister {
  @IsNotEmpty()
  @IsString()
  userName: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  confirmation_pass: string;
}
