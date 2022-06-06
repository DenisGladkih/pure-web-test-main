import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {ColumnsModule} from './columns/columns.module';
import {ConfigModule} from "@nestjs/config";
import {CardsModule} from './cards/cards.module';
import {CommentsModule} from './comments/comments.module';
import {AuthModule} from './auth/auth.module';


@Module({
    imports: [

        ConfigModule.forRoot({
            envFilePath: '.env'
        }),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true
        }),
        UsersModule,
        ColumnsModule,
        CardsModule,
        CommentsModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}