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
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { LocalGuard } from 'src/guard/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async register(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...user } = await this.authService.register(createAuthDto);
    this.authService.addRefreshTokenInCookie(res, refreshToken);
    return user;
  }

  @Post('log-in')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { refreshToken, ...user } =
      await this.authService.login(req.user as string);
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
