import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {PugAdapter} from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

@Module({
  imports: [ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
    //ignoreUserAgents: iguinora um determinado ususario 
    ttl:60,//segundos
    limit:10 //quantos acessos por minuto a aplicação pode receber

  }),
     forwardRef(()=>UserModule) ,forwardRef(()=>AuthModule),
      MailerModule.forRoot({
        transport:'smtps://conner9@ethereal.email:v39aSvjMp3KG877Auv@smtp.ethereal.email',
        defaults:{
          from:'',
        },
        template: {
          dir: __dirname + '/template',
          adapter: new PugAdapter(),
          options:{
            strict:true,
          },
        }
      })
    ],/** Aqui vai os modulos que ele vai importar, receber outros modulos */
  controllers: [AppController],/**Controllers disponibilizados por esse modulo */
  providers: [AppService], /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */
  exports:[AppService] /**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */
})
export class AppModule {}
