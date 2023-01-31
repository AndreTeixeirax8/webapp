import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

@Module({
    imports:[],/** Aqui vai os modulos que ele vai importar, receber outros modulos */
    controllers: [UserController],/**Controllers disponibilizados por esse modulo */
    providers:[], /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */
    exports:[],/**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */
})
export class UserModule{}