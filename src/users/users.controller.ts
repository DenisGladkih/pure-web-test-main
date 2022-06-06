import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserEntity} from './user-entity';
import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateResult} from "typeorm";

@ApiTags('Пользователи')
@Controller('/api/users')

export class UsersController {

    constructor(private readonly userService: UsersService) {
    }

    @ApiOperation({summary: 'Создать пользователя'})
    @ApiResponse({status: 200, type: UserEntity})
    @Post()
    create(
        @Body() userDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Найти всех пользлвателей'})
    @ApiResponse({status: 200, type: [UserEntity]})
    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAllUsers();
    }

    @ApiOperation({summary: 'Найти пользователя'})
    @ApiResponse({status: 200, type: UserEntity})
    @Get(':userId')
    findOne(
        @Param('userId') userId: string): Promise<UserEntity> {
        return this.userService.findUser(userId);
    }

    @ApiOperation({summary: 'Обновить данные пользователя'})
    @ApiResponse({status: 200, type: UpdateResult})
    @Patch(':userId')
    update(
        @Param('userId') userId: string,
        @Body() userDto: CreateUserDto): Promise<UpdateResult> {
        return this.userService.updateUser(userId, userDto);
    }

    @ApiOperation({summary: 'Удалить пользователя'})
    @ApiResponse({status: 200, type: UserEntity})
    @Delete(':userId')
    remove(
        @Param('userId') userId: string): Promise<UserEntity> {
        return this.userService.removeUser(userId);
    }
}