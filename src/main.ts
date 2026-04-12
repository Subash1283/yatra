import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

process.removeAllListeners('warning');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ENABLE CORS
  app.enableCors({
    origin: [
      "http://localhost:5173",        // frontend local dev
      "http://127.0.0.1:5174",
      "https://yatranepal.tech"       // your frontend domain (if deployed)
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4001);
}
bootstrap();