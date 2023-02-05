import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
/**o CORS serve para liberar os dominios que vão acessar a api  para configurar basta passar 
 * um objeto com as permissões 
 * 
 *   app.enableCors({
    methods:['GET'],
    origin:['hcode.com.br','*']
  });
*/
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe())/**Import para as validaçoes do DTO funcionarem */
  app.useGlobalInterceptors(new LogInterceptor()); /**Ativando essa linha o Interceptors fica de forma global*/
  await app.listen(3000);
  console.log("Servidor rodando na porta 3000")
}
bootstrap();
