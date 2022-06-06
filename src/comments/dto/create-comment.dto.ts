import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length, MaxLength, MinLength} from "class-validator";

export class CreateCommentDto {
    @ApiProperty({example: 'Это мой комментарий', description: 'Комментарий пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @MinLength(1, {message: ' Комментарий не может быть меньше одного символа'})
    body: string;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    cardId: number;
}