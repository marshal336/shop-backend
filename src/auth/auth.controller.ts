import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async register(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...user } =
      await this.authService.register(createAuthDto);

    this.authService.addRefreshTokenInCookie(res, refreshToken);

    return user;
  }

  @Post('log-in')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...user } =
      await this.authService.login(createAuthDto);
    this.authService.addRefreshTokenInCookie(res, refreshToken);

    return user;
  }

  @Post('log-in/access-token')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async getNewToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookie = req.cookies[this.authService.TOKEN_NAME];

    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenInCookie(res);
      throw new UnauthorizedException('No token');
    }

    const { refreshToken, ...user } = await this.authService.newTokens(
      refreshTokenFromCookie,
    );
    this.authService.addRefreshTokenInCookie(res, refreshToken);

    return user;
  }

  @Post('log-out')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenInCookie(res);
    return true;
  }
}
