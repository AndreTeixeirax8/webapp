import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({
        secret:"segredotemqueter32digitos",
    })]
})
export class AuthModule{

}