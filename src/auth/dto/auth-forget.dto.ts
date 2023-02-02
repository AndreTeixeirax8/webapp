import { IsEmail, IsString } from "class-validator";

export class AuthForgetDTO{

    @IsEmail()
    email:string;

}