import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserEntity} from "../users/user-entity";

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

   @UsePipes(new ValidationPipe())
    @Post('registration')
    async  registration(@Body() userDto: CreateUserDto): Promise<UserEntity> {
        return this.authService.registration(userDto);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() authDto: CreateUserDto) {
        return this.authService.login(authDto)
    }
}


