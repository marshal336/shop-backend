import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../prisma/@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async findOneByEmail(email: string) {
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
    const exist = await this.prisma.user.findFirst({ where: { id } })
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: dto?.email ? dto.email : exist.email,
        password: dto?.password ? await hash(dto.password) : exist.email,
        firstName: dto?.firstName ? dto.firstName : exist.firstName,
        lastName: dto?.lastName ? dto.lastName : exist.lastName,
        address: dto?.address ? dto.address : exist.address,
      }
    });
    const { password, ...fullUser } = user;

    return fullUser;
  }
}
