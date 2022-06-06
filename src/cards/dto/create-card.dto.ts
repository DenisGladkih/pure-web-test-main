import {ApiProperty} from "@nestjs/swagger";
import {IsString, MinLength} from "class-validator";

export class CreateCardDto {
    @ApiProperty({example: 'Моя карточка', description: 'Название карточки'})
    @IsString({message: 'Должно быть строкой'})
    @MinLength(1, {message: ' Название не может быть меньше 1 символа'})
    title: string;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    columnId: number;
}