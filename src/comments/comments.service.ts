import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {CommentEntity} from "./comment-entity";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CardsService} from "../cards/cards.service";
import {COMMENT_NOT_FOUND_ERROR, COMMENTS_NOT_FOUND_ERROR} from "../constants/error.constants";

@Injectable()
export class CommentsService {

    constructor(@InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>,
                private readonly cardService: CardsService) {
    }

    async createComment(userId: string, columnId: string, cardId: string, commentDto: CreateCommentDto): Promise<CommentEntity> {
        const card = await this.cardService.findCard(userId, columnId, cardId);
        commentDto.cardId = card.id;
        return await this.commentRepository.save(commentDto);
    }

    async findComment(userId: string, columnId: string, cardId: string, commentId: string): Promise<CommentEntity> {
        const card = await this.cardService.findCard(userId, columnId, cardId);
        const comment = await this.commentRepository.findOne({where: {id: commentId, cardId: card.id}})
        if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
        return comment
    }

    async findAllComments(userId: string, columnId: string, cardId: string): Promise<CommentEntity[]> {
        const card = await this.cardService.findCard(userId, columnId, cardId);
        const commentsList = await this.commentRepository.find({where: {cardId: card.id}});
        if (commentsList.length == 0) throw  new NotFoundException(COMMENTS_NOT_FOUND_ERROR);
        return commentsList;
    }

    async updateComment(userId: string, columnId: string, cardId: string, commentId: string, commentDto: CreateCommentDto): Promise<UpdateResult> {
        const comment = await this.findComment(userId, columnId, cardId, commentId);
        return await this.commentRepository.update(comment, commentDto)
    }

    async removeComment(userId: string, columnId: string, cardId: string, commentId: string): Promise<CommentEntity> {
        const comment = await this.findComment(userId, columnId, cardId, commentId);
        return await this.commentRepository.remove(comment)
    }
}
