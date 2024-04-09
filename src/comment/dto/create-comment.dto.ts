
import { IsString } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    title: string;
}
