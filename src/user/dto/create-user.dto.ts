import { IsString,IsEmail, } from "class-validator";

export class  CreateUserDTO{
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    /**Usando esse validator podemos definir 
     * se vamos aceitar uma senha fraca ou forte obrigando o usuario a 
     * digitar letras maisuculas e minusculas e simbolos. Se  adicionado esse decorator
     * ele adiciona no minimo o valor 1 para cada um de seus itens 
     */
   /*removido por que só tem disponvel nas versões do class validator acima de 14 
   @IsStrongPassword({
        minLength:3,
        minLowercase:0,
        minNumbers:0,
        minSymbols:0,
        minUppercase:0,
    })*/
    @IsString()
    password:string;
}