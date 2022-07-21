import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { RegistarUsuarioDto } from './dto/registar-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('/')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto): Promise<{ access_token: string }> {
    return this.authService.login(loginUsuarioDto);
  }


  @Post('register')
  public async register(@Body() registarUsuarioDto: RegistarUsuarioDto): Promise<AuthResponse> {
    return await this.authService.register(registarUsuarioDto);
  }

}
