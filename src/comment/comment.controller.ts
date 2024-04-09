import { Controller, Post, Body, Param, HttpCode, HttpStatus, Patch, Delete, } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Auth } from 'src/decorators/jwt.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('create/:id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async create(@Body() { title }: CreateCommentDto, @CurrentUser('id') id: string, @Param('id') postId: string) {
    return this.commentService.create({ title }, id, postId)
  }
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async update(@Body() { title }: CreateCommentDto, @CurrentUser('id') id: string, @Param('id') commentId: string) {
    return this.commentService.update({ title }, id, commentId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  async delete(@Param('id') id: string) {
    return this.commentService.delete(id)
  }

}
