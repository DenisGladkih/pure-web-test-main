import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CardsService} from "./cards.service";
import {CreateCardDto} from "./dto/create-card.dto";
import {CardEntity} from "./card-entity";
import {UpdateResult} from "typeorm";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {JwtRightsGuard} from "../auth/guards/jwt-rights.guard";


@ApiTags('Карточки')
@Controller('api/users')
export class CardsController {

    constructor(private readonly cardService: CardsService) {
    }

    @ApiOperation({summary: 'Создать карточку пльзователя в колонке пользователя'})
    @ApiResponse({status: 200, type: CardEntity})
    @UseGuards(JwtAuthGuard)
    @Post(':userId/columns/:columnId/cards')
    create(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Body() cardDto: CreateCardDto): Promise<CardEntity> {
        return this.cardService.createCard(userId, columnId, cardDto);
    }

    @ApiOperation({summary: 'Найти карточку пльзователя в колонке пользователя'})
    @ApiResponse({status: 200, type: CardEntity})
    @UseGuards(JwtAuthGuard)
    @Get(':userId/columns/:columnId/cards/:cardId')
    findOne(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Param('cardId') cardId: string): Promise<CardEntity> {
        return this.cardService.findCard(userId, columnId, cardId,);
    }

    @ApiOperation({summary: 'Найти все карточки пользователя'})
    @ApiResponse({status: 200, type: [CardEntity]})
    @UseGuards(JwtAuthGuard)
    @Get(':userId/columns/:columnId/cards')
    findAll(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string): Promise<CardEntity[]> {
        return this.cardService.findAllCards(userId, columnId);
    }

    @ApiOperation({summary: 'Обновить карточку пользователя'})
    @ApiResponse({status: 200, type: UpdateResult})
    @UseGuards(JwtAuthGuard,JwtRightsGuard)
    @Patch(':userId/columns/:columnId/cards/:cardId')
    update(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('cardId') cardId: string,
           @Body() cardDto: CreateCardDto): Promise<UpdateResult> {
        return this.cardService.updateCard(userId, columnId, cardId, cardDto);
    }

    @ApiOperation({summary: 'Удалить карточку пользователя'})
    @ApiResponse({status: 200, type: CardEntity})
    @UseGuards(JwtAuthGuard,JwtRightsGuard)
    @Delete(':userId/columns/:columnId/cards/:cardId')
    remove(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Param('cardId') cardId: string): Promise<CardEntity> {
        return this.cardService.removeCard(userId, columnId, cardId);
    }
}
