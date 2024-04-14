import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UserDto } from './dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAuthDto: CreateAuthDto, password?: string): Promise<User> {
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
  async createGoogle({ email, firstName }: { email: string, firstName: string }): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        password: '',
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

  async findOneById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, dto: UserDto) {
    let data = dto;
    if (data.password) {
      data = { ...dto, password: await hash(data.password) };
    }
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
    const { password, ...fullUser } = user;

    return fullUser;
  }
}
