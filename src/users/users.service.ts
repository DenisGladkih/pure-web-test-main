import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, UpdateResult} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UserEntity} from './user-entity';
import {ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR, USERS_NOT_FOUND_ERROR} from "../constants/error.constants";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async createUser(userDto: CreateUserDto): Promise<UserEntity> {
         const oldUser = await this.findUserByEmail(userDto.email);
         if (oldUser) throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        userDto.password = await this.hashUserPassword(userDto.password);
        return await this.userRepository.save(userDto);
    }

    async findUser(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(userId);
        if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)
        return user;
    }

    async findUserByEmail(userEmail: string): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {email: userEmail}});
    }

    async findAllUsers(): Promise<UserEntity[]> {
        const usersList = await this.userRepository.find();
        if (usersList.length == 0) throw new NotFoundException(USERS_NOT_FOUND_ERROR);
        return usersList;
    }

    async updateUser(userId: string, userDto: CreateUserDto): Promise<UpdateResult> {
        const user = await this.findUser(userId);
        userDto.password = await this.hashUserPassword(userDto.password);
        return await this.userRepository.update(user, userDto)
    }

    async removeUser(userId: string): Promise<UserEntity> {
        const user = await this.findUser(userId);
        return await this.userRepository.remove(user);
    }

    async hashUserPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 5);
    }
}