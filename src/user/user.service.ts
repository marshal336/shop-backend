import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthDto: CreateAuthDto, password: string): Promise<User> {
    const isExist = await this.prisma.user.findFirst({
      where: {
        email: createAuthDto.email,
      },
    });
    if (isExist) throw new BadRequestException('user already exist');
    const user = await this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        password,
      },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
}
