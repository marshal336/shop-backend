import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }
  async create({ title }: CreateCommentDto, id: string, cardItemId?: string) {
    if (!title) {
      throw new BadRequestException('Title is required');
    }
    const comment = await this.prisma.comment.create({
      data: {
        title,
        cardItemId,
        userId: id
      },
      include: {
        user: true,
        cardItem: true
      },

    })

    return comment
  }
  async update({ title }: CreateCommentDto, userId: string, id: string) {
    const comment = await this.prisma.comment.update({
      where: { id },
      data: { title, userId }
    })

    return comment
  }
  async delete(id: string) {
    await this.prisma.comment.delete({
      where: { id },
    })

    return { message: 'success' }
  }
}
