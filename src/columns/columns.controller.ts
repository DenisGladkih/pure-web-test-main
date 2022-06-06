import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ColumnsService} from "./columns.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ColumnEntity} from "./column.entity";
import {CreateColumnDto} from "./dto/create-column.dto";
import {UpdateResult} from "typeorm";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {JwtRightsGuard} from "../auth/guards/jwt-rights.guard";

@ApiTags('Колонки')
@Controller('api/users')
export class ColumnsController {

    constructor(private readonly columnService: ColumnsService) {
    }

    @ApiOperation({summary: 'Создать колонку пользователя'})
    @ApiResponse({status: 200, type: ColumnEntity})
    @UseGuards(JwtAuthGuard)
    @Post(':userId/columns')
    create(
        @Param('userId') userId: string,
        @Body() columnDto: CreateColumnDto): Promise<ColumnEntity> {
        return this.columnService.createColumn(userId, columnDto);
    }

    @ApiOperation({summary: 'Найти все колонки пользователя'})
    @ApiResponse({status: 200, type: [ColumnEntity]})
    @UseGuards(JwtAuthGuard)
    @Get(':userId/columns')
    findAll(
        @Param('userId') userId: string): Promise<ColumnEntity[]> {
        return this.columnService.findAllColumns(userId);
    }

    @ApiOperation({summary: 'Найти колонку пользователя'})
    @ApiResponse({status: 200, type: ColumnEntity})
    @UseGuards(JwtAuthGuard)
    @Get(':userId/columns/:columnId')
    findOne(@Param('userId') userId: string,
            @Param('columnId') columnId: string): Promise<ColumnEntity> {
        return this.columnService.findColumn(userId, columnId);
    }

    @ApiOperation({summary: 'Обновить колонку пользователя'})
    @ApiResponse({status: 200, type: UpdateResult})
    @UseGuards(JwtAuthGuard,JwtRightsGuard)
    @Patch(':userId/columns/:columnId')
    update(@Param('userId') userId: string,
           @Param('columnId') columnId: string,
           @Body() columnDto: CreateColumnDto): Promise<UpdateResult> {
        return this.columnService.updateColumn(userId, columnId, columnDto);
    }

    @ApiOperation({summary: 'Удалить колонку пользователя'})
    @ApiResponse({status: 200, type: ColumnEntity})
    @UseGuards(JwtAuthGuard,JwtRightsGuard)
    @Delete(':userId/columns/:columnId')
    remove(@Param('userId') userId: string,
           @Param('columnId') columnId: string): Promise<ColumnEntity> {
        return this.columnService.removeColumn(userId, columnId);
    }
}
