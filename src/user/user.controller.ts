import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/jwt.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, })
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    const { password, ...user } = await this.userService.findOneById(id);
    return user;
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async update(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
