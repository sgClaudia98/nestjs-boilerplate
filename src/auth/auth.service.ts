import { AuthResponse } from './dto/auth-response.dto';
import { Usuario } from './../usuario/usuario';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegistarUsuarioDto } from './dto/registar-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class AuthService {

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<Partial<Usuario>> {
    const user = await this.usuarioService.findOne({ email: email }, { relations: ['division'] });
    if (user && await bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUsuarioDto: LoginUsuarioDto): Promise<{ access_token: string }> {
    // validar login
    const user = await this.validateUser(loginUsuarioDto.email, loginUsuarioDto.password);

    // validacion incorrecta
    if (!user) {
      throw new HttpException('Correo o contraseña incorrectos', HttpStatus.BAD_REQUEST)
    }

    // Cuerpo del JWT
    const payload = {
      sub: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      rolId: user.rolId
    };
    return {
      access_token: this.jwtService.sign(payload),
      // exipresIn:
    };
  }

  async register(usuarioDto: RegistarUsuarioDto):
    Promise<AuthResponse> {

    try {
      await this.usuarioService.registrar(usuarioDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

    return {
      success: true,
      message: 'Usuario Registrado exitosamente',
    };
  }

}
