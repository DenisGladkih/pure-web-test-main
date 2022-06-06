import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {CardEntity} from "./card-entity";
import {CreateCardDto} from "./dto/create-card.dto";
import {UsersService} from "../users/users.service";
import {ColumnsService} from "../columns/columns.service";
import {CARD_NOT_FOUND_ERROR, CARDS_NOT_FOUND_ERROR} from "../constants/error.constants";

@Injectable()
export class CardsService {

    constructor(@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>,
                private readonly userService: UsersService, private readonly columnService: ColumnsService) {
    }

    async createCard(userId: string, columnId: string, cardDto: CreateCardDto): Promise<CardEntity> {
        const column = await this.columnService.findColumn(userId, columnId);
        cardDto.columnId = column.id;
        return await this.cardRepository.save(cardDto);
    }

    async findCard(userId: string, columnId: string, cardId: string): Promise<CardEntity> {
        const column = await this.columnService.findColumn(userId, columnId);
        const card = await this.cardRepository.findOne({where: {id: cardId, columnId: column.id}})
        if (!card) throw new NotFoundException(CARD_NOT_FOUND_ERROR);
        return card
    }

    async findAllCards(userId: string, columnId: string): Promise<CardEntity[]> {
        const column = await this.columnService.findColumn(userId, columnId);
        const cardsList = await this.cardRepository.find({where: {columnId: column.id}});
        if (cardsList.length == 0) throw  new NotFoundException(CARDS_NOT_FOUND_ERROR);
        return cardsList;
    }

    async updateCard(userId: string, columnId: string, cardId: string, cardDto: CreateCardDto): Promise<UpdateResult> {
        const card = await this.findCard(userId, columnId, cardId)
        return await this.cardRepository.update(card, cardDto)
    }

    async removeCard(userId: string, columnId: string, cardId: string): Promise<CardEntity> {
        const card = await this.findCard(userId, columnId, cardId)
        return await this.cardRepository.remove(card);
    }
}