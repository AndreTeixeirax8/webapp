import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ClienteEntity } from "./entity/cliente.entity";

@Module({
    imports:[forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ClienteEntity]) ],/** Aqui vai os modulos que ele vai importar, receber outros modulos */
    controllers: [ClienteController],/**Controllers disponibilizados por esse modulo */
    providers:[ClienteService], /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */
    exports:[ClienteService],/**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */
})
export class ClienteModule {
   /* export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path:'users/:id',
            method:RequestMethod.ALL
        })
    }*/

}