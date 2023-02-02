import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";

@Module({
    imports:[JwtModule.register({
        secret:"segredotemqueter32digitos",
    }),UserModule,
    PrismaModule
],
    controllers:[AuthController]
})
export class AuthModule{

}