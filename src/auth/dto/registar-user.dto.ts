import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistarUserDto {
  @IsNotEmpty()  name: string;
  @IsNotEmpty()  lastname: string;
  @IsNotEmpty()  password: string;
  @IsNotEmpty()  @IsEmail()  email: string;
  
}
