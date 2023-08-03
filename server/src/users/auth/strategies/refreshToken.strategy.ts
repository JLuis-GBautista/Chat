import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const refreshToken = req?.cookies['refresh_token'];
          if (!refreshToken) return null;
          return refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: any) {
    if (payload === null) throw new UnauthorizedException();
    return payload;
  }
}
