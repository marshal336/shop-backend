import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../../prisma/@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return user ? user.id : null;
  },
);
