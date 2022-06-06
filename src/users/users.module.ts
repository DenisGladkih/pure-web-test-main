import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user-entity';
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {ColumnEntity} from "../columns/column.entity";
import {ColumnsModule} from "../columns/columns.module";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [UsersService, JwtService, AuthModule],
    imports: [
        TypeOrmModule.forFeature([UserEntity, ColumnEntity]),
        ColumnsModule,
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {
}