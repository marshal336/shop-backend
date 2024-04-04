import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strateg';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
