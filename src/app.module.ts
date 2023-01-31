import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],/** Aqui vai os modulos que ele vai importar, receber outros modulos */
  controllers: [AppController],/**Controllers disponibilizados por esse modulo */
  providers: [AppService], /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */
  exports:[AppService] /**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */
})
export class AppModule {}
