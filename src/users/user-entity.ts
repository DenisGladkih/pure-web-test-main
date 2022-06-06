import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {ColumnEntity} from "../columns/column.entity";

@Entity()
export class UserEntity {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Email пользователя'})
    @Column({unique: true, nullable: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль пользователя'})
    @Column({nullable:false})
    password: string;

    @OneToMany(() => ColumnEntity, (column) => column.user,{
        onDelete: 'CASCADE'
    })
    columns: ColumnEntity[]

}
