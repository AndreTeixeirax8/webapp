import { IsJWT, IsString } from "class-validator";

export class AuthMeDTO{

    @IsJWT()
    token:string;

}