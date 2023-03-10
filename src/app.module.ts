import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { CidadeModule } from 'src/modules/cidade/cidade.module';
import { CidadeEntity } from 'src/modules/cidade/entity';
import { UfModule } from 'src/modules/uf/uf.module';
import { UfEntity } from 'src/modules/uf/entity';
import { ProdutoModule } from './modules/produto/produto.module';
import { ProdutoEntity } from './modules/produto/entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      //ignoreUserAgents: iguinora um determinado ususario
      ttl: 60, //segundos
      limit: 10, //quantos acessos por minuto a aplicação pode receber
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    CidadeModule,
    UfModule,
    ProdutoModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'conner9@ethereal.email',
          pass: 'v39aSvjMp3KG877Auv',
        },
      },
      defaults: {
        from: '"teste nome "<conner9@ethereal.email>',
      },
      template: {
        dir: __dirname + '/template',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, CidadeEntity, UfEntity, ProdutoEntity],
      synchronize: true, //deixa true só no ambiente de desenvolvimento
    }),
  ] /** Aqui vai os modulos que ele vai importar, receber outros modulos */,
  controllers: [
    AppController,
  ] /**Controllers disponibilizados por esse modulo */,
  providers: [
    AppService,
  ] /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */,
  exports: [
    AppService,
  ] /**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */,
})
export class AppModule {}
