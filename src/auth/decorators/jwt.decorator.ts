import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard/jwt.guard';

export const Auth = () => UseGuards(JwtGuard);
