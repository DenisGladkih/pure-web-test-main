import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {ColumnEntity} from "../columns/column.entity";
import {CommentEntity} from "../comments/comment-entity";

@Entity()
export class CardEntity {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Моя карточка', description: 'Название карточки'})
    @Column({nullable: false})
    title: string;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column("int", {nullable:true})
    columnId: number;

    @ManyToOne(() => ColumnEntity, column => column.cards,
        {  onDelete: 'CASCADE'})
    @JoinColumn({name:"columnId"})
    column: ColumnEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.card, {
        onDelete: 'CASCADE'
    })
    comments: CommentEntity[]

}
