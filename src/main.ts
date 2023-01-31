import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())/**Import para as validaçoes do DTO funcionarem */
  await app.listen(3000);
  console.log("Servidor rodando na porta 3000")
}
bootstrap();
