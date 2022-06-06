import {Module} from '@nestjs/common';
import {CommentsController} from './comments.controller';
import {CommentsService} from './comments.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardEntity} from "../cards/card-entity";
import {CommentEntity} from "./comment-entity";
import {ColumnEntity} from "../columns/column.entity";
import {UserEntity} from "../users/user-entity";
import {UsersService} from "../users/users.service";
import {CardsService} from "../cards/cards.service";
import {ColumnsService} from "../columns/columns.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, CardsService, ColumnsService,JwtService ],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, CardEntity, UserEntity, ColumnEntity, CommentEntity])
  ]
})
export class CommentsModule {}
