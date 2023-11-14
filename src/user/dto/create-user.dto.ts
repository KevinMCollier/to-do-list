import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(['Lazy', 'Normal', 'Motivated'])
  productivityLevel: string;
}
