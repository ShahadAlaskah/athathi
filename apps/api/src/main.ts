import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Security
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }));
    app.enableCors();

    // Validation
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
