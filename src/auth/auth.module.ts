import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FileModule } from "src/file/file.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports:[JwtModule.register({
        secret:process.env.JWT_SECRET,
    }),forwardRef(()=>UserModule) ,//Usaro o forwardRef para resolver dependencia circular
    PrismaModule,
    FileModule,
],
    controllers:[AuthController],
    providers:[AuthService],//todo serviço é um provider dentro do modulo
    exports:[AuthService]
})
export class AuthModule{

}