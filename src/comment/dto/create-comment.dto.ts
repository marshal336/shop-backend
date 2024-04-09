
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CardItem, User } from 'src/types/comment';

export class CreateCommentDto {
    @ApiProperty({
        default: 'value'
    })
    @IsString()
    title: string;
}


export class CommentResponse {
    @IsString()
    id: string
    @IsString()

    title: string
    @IsString()

    userId: string
    @IsString()

    cardItemId: string
    @IsString()

    user: User
    cardItem: CardItem
}