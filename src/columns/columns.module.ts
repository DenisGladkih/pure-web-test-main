import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../users/user-entity";
import {ColumnEntity} from "./column.entity";
import {ColumnsService} from "./columns.service";
import {ColumnsController} from "./columns.controller";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [ColumnsController],
    providers: [ColumnsService, UsersService, JwtService],
    imports: [
        TypeOrmModule.forFeature([UserEntity, ColumnEntity])
    ]
})
export class ColumnsModule {
}
