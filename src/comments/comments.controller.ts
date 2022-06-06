import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateResult} from "typeorm";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentEntity} from "./comment-entity";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {JwtRightsGuard} from "../auth/guards/jwt-rights.guard";

@ApiTags('Комментарии')
@Controller('/api/users')

export class CommentsController {

    constructor(private readonly commentService: CommentsService) {
    }

    @ApiOperation({summary: 'Создать комментарий пользователя в карточке пользователя'})
    @ApiResponse({status: 200, type: CommentEntity})
    @Post(':userId/columns/:columnId/cards/:cardId/comments')
    create(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Param('cardId') cardId: string,
        @Body() commentDto: CreateCommentDto): Promise<CommentEntity> {
        return this.commentService.createComment(userId, columnId, cardId, commentDto);
    }

    @ApiOperation({summary: 'Найти комментарий пользователя в карточке пользователя'})
    @ApiResponse({status: 200, type: CommentEntity})
    @UseGuards(JwtAuthGuard)
    @Get(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
    findOne(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Param('cardId') cardId: string,
        @Param('commentId') commentId: string): Promise<CommentEntity> {
        return this.commentService.findComment(userId, columnId, cardId, commentId);
    }

    @ApiOperation({summary: 'Найти все комментарии пользователя в карточке пользователя'})
    @ApiResponse({status: 200, type: [CommentEntity]})
    @UseGuards(JwtAuthGuard)
    @Get(':userId/columns/:columnId/cards/:cardId/comments')
    findAll(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Param('cardId') cardId: string,): Promise<CommentEntity[]> {
        return this.commentService.findAllComments(userId, columnId, cardId);
    }

    @ApiOperation({summary: 'Обновить комментарий в карточке пользователя'})
    @ApiResponse({status: 200, type: UpdateResult})
    @UseGuards(JwtAuthGuard,JwtRightsGuard)
    @Patch(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
    update(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Param('cardId') cardId: string,
        @Param('commentId') commentId: string,
        @Body() commentDto: CreateCommentDto): Promise<UpdateResult> {
        return this.commentService.updateComment(userId, columnId, cardId, commentId, commentDto);
    }

    @ApiOperation({summary: 'Удалить комментарий в карточке пользователя'})
    @ApiResponse({status: 200, type: CommentEntity})
    @UseGuards(JwtAuthGuard,JwtRightsGuard)
    @Delete(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
    delete(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Param('cardId') cardId: string,
        @Param('commentId') commentId: string): Promise<CommentEntity> {
        return this.commentService.removeComment(userId, columnId, cardId, commentId);
    }
}
