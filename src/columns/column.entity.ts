import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../users/user-entity";
import {CardEntity} from "../cards/card-entity";

@Entity()
export class ColumnEntity {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Моя колонка', description: 'Название колонки'})
    @Column({nullable: false})
    title: string;

    @OneToMany(() => CardEntity, (card) => card.column, {
        onDelete: 'CASCADE'
    })
    cards: CardEntity[]

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column("int", {nullable:true})
    userId: number;

    @ManyToOne(() => UserEntity, user => user.columns,
        {onDelete: 'CASCADE'})
    @JoinColumn({name:"userId"})
    user: UserEntity;
}









