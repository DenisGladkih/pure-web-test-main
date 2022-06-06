import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('RESTful API с авторизацией для trello')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Порт: ${PORT}`));
}

start();
