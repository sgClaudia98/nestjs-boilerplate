import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistarUsuarioDto {
  @IsNotEmpty()  nombre: string;
  @IsNotEmpty()  apellidos: string;
  @IsNotEmpty()  password: string;
  @IsNotEmpty()  @IsEmail()  email: string;
  telefonoMovil: string;
  telefonoFijo: string;
  entidadId: number;
  puesto: string;
  divisionId: string;
  firmaAutorizada: boolean;
}
