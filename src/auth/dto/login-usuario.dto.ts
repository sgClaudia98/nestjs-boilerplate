import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @IsNotEmpty()  @IsEmail()  email: string;
  @IsNotEmpty()  password: string;
}
