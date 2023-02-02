import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports:[PrismaModule],/** Aqui vai os modulos que ele vai importar, receber outros modulos */
    controllers: [UserController],/**Controllers disponibilizados por esse modulo */
    providers:[UserService], /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */
    exports:[],/**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */
})
export class UserModule implements NestModule{

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path:'users/:id',
            method:RequestMethod.ALL
        })
    }

}