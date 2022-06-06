import {Module} from '@nestjs/common';
import {CardsController} from './cards.controller';
import {CardsService} from './cards.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ColumnEntity} from "../columns/column.entity";
import {CardEntity} from "./card-entity";
import {UsersService} from "../users/users.service";
import {ColumnsService} from "../columns/columns.service";
import {UserEntity} from "../users/user-entity";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [CardsController],
  providers: [CardsService ,UsersService, ColumnsService ,JwtService ],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, CardEntity, UserEntity])
  ]
})
export class CardsModule {}
