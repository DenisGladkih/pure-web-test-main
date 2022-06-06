import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {USER_EMAIL_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR} from "../constants/error.constants";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserEntity} from "../users/user-entity";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
    }

    async registration(userDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(userDto);
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return await this.generateToken(user)
    }

    private async generateToken(user: UserEntity) {
        const payload = {email: user.email, id: user.id}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {

        const user = await this.userService.findUserByEmail(userDto.email);
        if (!user) throw  new UnauthorizedException(USER_EMAIL_NOT_FOUND_ERROR);

        const isCorrectPassword = await bcrypt.compare(userDto.password, user.password);
        if (!isCorrectPassword) throw  new UnauthorizedException(WRONG_PASSWORD_ERROR);

        return user;
    }
}
