import { AuthResponse } from './dto/auth-response.dto';
import { User } from './../user/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistarUserDto } from './dto/registar-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne({ email: email }, { relations: ['division'] });
    if (user && await bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    // validar login
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);

    // validacion incorrecta
    if (!user) {
      throw new HttpException('Correo o contraseña incorrectos', HttpStatus.BAD_REQUEST)
    }

    // Cuerpo del JWT
    const payload = {
      sub: user.id,
      name: user.name,
      lastname: user.lastname,
      rolId: user.rolId
    };
    return {
      access_token: this.jwtService.sign(payload),
      // exipresIn:
    };
  }

  async register(userDto: RegistarUserDto):
    Promise<AuthResponse> {

    try {
      await this.userService.registrar(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

    return {
      success: true,
      message: 'User Registrado exitosamente',
    };
  }

}
