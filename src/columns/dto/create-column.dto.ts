import {ApiProperty} from "@nestjs/swagger";
import {IsString, MinLength} from "class-validator";

export class CreateColumnDto {

    @ApiProperty({example: 'Моя колонка', description: 'Название колонки'})
    @IsString({message: 'Должно быть строкой'})
    @MinLength(1, {message: 'Заголовок не может быть пустым'})
    title: string;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    userId: number;
}