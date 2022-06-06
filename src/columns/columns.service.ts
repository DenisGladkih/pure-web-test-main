import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {ColumnEntity} from "./column.entity";
import {CreateColumnDto} from "./dto/create-column.dto";
import {UsersService} from "../users/users.service";
import {COLUMN_NOT_FOUND_ERROR, COLUMNS_NOT_FOUND_ERROR} from "../constants/error.constants";

@Injectable()
export class ColumnsService {

    constructor(@InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>,
                private readonly userService: UsersService) {
    }

    async createColumn(userId: string, columnDto: CreateColumnDto): Promise<ColumnEntity> {
        const user = await this.userService.findUser(userId);
        columnDto.userId = user.id;
        return await this.columnRepository.save(columnDto);
    }

    async findAllColumns(userId: string): Promise<ColumnEntity[]> {
        const user = await this.userService.findUser(userId);
        const columnsList = await this.columnRepository.find({where: {userId: user.id}})
        if (columnsList.length == 0) throw new NotFoundException(COLUMNS_NOT_FOUND_ERROR);
        return columnsList;
    }

    async findColumn(userId: string, columnId: string): Promise<ColumnEntity> {
        const user = await this.userService.findUser(userId);
        const column = await this.columnRepository.findOne({where: {id: columnId, userId: user.id}})
        if (!column) throw new NotFoundException(COLUMN_NOT_FOUND_ERROR)
        return column;
    }

    async updateColumn(userId: string, columnId: string, columnDto: CreateColumnDto): Promise<UpdateResult> {
        const column = await this.findColumn(userId, columnId);
        return await this.columnRepository.update(column, columnDto);
    }

    async removeColumn(userId: string, columnId: string): Promise<ColumnEntity> {
        const column = await this.findColumn(userId, columnId);
        return await this.columnRepository.remove(column);
    }
}
