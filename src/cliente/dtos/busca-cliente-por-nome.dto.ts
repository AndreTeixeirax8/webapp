import { IsDateString, IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class  BuscarClientePorNomeDTO{
    @IsString()
    name:string;

    
}