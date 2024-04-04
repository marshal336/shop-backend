import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { Profile } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';
import { IGoogleResponse } from 'src/types/google-res';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('CLIENT_ID'),
      clientSecret: configService.get('CLIENT_SECRET'),
      callbackURL: configService.get('CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(_: any, __: any, profile: Profile) {
    const exist = await this.authService.validateGoogleUser(
      profile._json.email,
    );
    if (exist) throw new BadGatewayException('user exist');

    const payload: IGoogleResponse = {
      email: profile._json.email,
      firstName: profile._json.name,
    };
    const { password, ...user } = await this.userService.createGoogle(payload);
    return user;
  }
}
// http://localhost:5500/api/auth/google/log-in
