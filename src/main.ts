import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())/**Import para as validaçoes do DTO funcionarem */
  app.useGlobalInterceptors(new LogInterceptor()); /**Ativando essa linha o Interceptors fica de forma global*/
  await app.listen(3000);
  console.log("Servidor rodando na porta 3000")
}
bootstrap();
