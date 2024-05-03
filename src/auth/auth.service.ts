import * as argon2 from 'argon2';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  TOKEN_NAME = 'refreshToken';
  EXPIRES_TOKEN = 1;

  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async createTokents(id: string) {
    const payload = { id: id };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('user not exists');
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Invalid password');
    return user;
  }
  async register(createAuthDto: CreateAuthDto) {
    const hash = await argon2.hash(createAuthDto.password);
    const user = await this.userService.create(createAuthDto, hash);
    const tokens = await this.createTokents(user.id);
    const { password, ...fullUser } = user;
    return { ...fullUser, ...tokens };
  }
  async login(id: string) {
    const user = await this.userService.findOneById(id)
    const tokens = await this.createTokents(user.id);
    const { password, ...fullUser } = user;
    return { ...fullUser, ...tokens };
  }
  addRefreshTokenInCookie(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRES_TOKEN);
    res.cookie(this.TOKEN_NAME, refreshToken, {
      httpOnly: true,
      expires: expiresIn,
      secure: true,
      domain: this.configService.get('DOMAIN'),
      sameSite:
        this.configService.get('MODE') === 'development' ? 'none' : 'lax',
    });
  }
  removeRefreshTokenInCookie(res: Response) {
    res.cookie(this.TOKEN_NAME, '', {
      expires: new Date(0),
    });
  }
}
