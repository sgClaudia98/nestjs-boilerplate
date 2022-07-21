
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  configService.get('jwtKey'),
      signOptions: { expiresIn: '60s' }
    });
  }

  async validate(payload: any): Promise<{ userId: string, email: string }>{
    return { userId: payload.sub, email: payload.email };
  }
}
