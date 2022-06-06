import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {CardEntity} from "../cards/card-entity";
import {ColumnEntity} from "../columns/column.entity";

@Entity()
export class CommentEntity {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Это мой комментарий', description: 'Комментарий'})
    @Column({nullable: false})
    body: string;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column("int", {nullable: true})
    cardId: number;

    @ManyToOne(() => CardEntity, card => card.comments,
        {onDelete: 'CASCADE'})
    @JoinColumn({name: "cardId"})
    card: CardEntity;
}
