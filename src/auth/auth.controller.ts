import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('/')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }


  @Post('register')
  public async register(@Body() registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    return await this.authService.register(registerUserDto);
  }

}
