import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../users/user-entity";
import {UsersService} from "../users/users.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJWTconfig} from "../configs/jwt.config";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsersService],
    imports: [
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:getJWTconfig
        }),
    ],
    exports: [
        AuthService,
    ]
})
export class AuthModule {
}
