import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateCardDto) {
    const exist = await this.prisma.cardItem.findFirst({
      where: {
        title: dto.title,
      },
    });
    if (exist) throw new BadRequestException('card exist');
    const card = await this.prisma.cardItem.create({
      data: {
        ...dto,
      },
      include: {
        comments: true
      }
    });
    return card;
  }

  async findById(id: string) {
    const card = await this.prisma.cardItem.findFirst({
      where: { id },
      include: { comments: { include: { user: true } } }
    })
    if (!card) throw new BadRequestException('no card')

    return card
  }
  async getAll() {
    const card = await this.prisma.cardItem.findMany({
      include: {
        comments: {
          include: { user: true }
        }
      }
    })
    if (!card) throw new BadRequestException('no card')

    return card
  }
}
