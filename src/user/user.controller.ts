import { Body, Controller, Delete, Get, Param, Patch, Post, Put,ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{

    constructor(
        private readonly userService:UserService
    ){}

   // @UseInterceptors(LogInterceptor) Ativa o Intercptor de forma local
    @Post()
    async create(@Body() body:CreateUserDTO){
        return this.userService.create(body); 
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':id')
    async show(@Param('id',ParseIntPipe) id:number){

        return this.userService.show(id);
    }

    /**O PUT faz a alteração total dos dados ou seja se tem nome e endereço e você passar 
     * apenas o nome ele vai pegar o endereço que já existe no banco e deixar em branco
     */
    @Put(':id')
    /**Os decorators aplicado podem ser varios , aqui estamos pegando o corpo da requisição
    e os paramtros nele  */
    async update(@Body() data:UpdatePutUserDTO,@Param('id',ParseIntPipe) id:number){
        return this.userService.update(id,data)
    }

      /**O PATCH faz a alteração dos dados porem os que não forem passados ele preserva no banco 
       * não são alterados , vai se alterar apenas os dados informados.
     */
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDTO,@Param('id',ParseIntPipe) id:number){

        return this.userService.updatePartial(id,data)
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number){
        
        return this.userService.delete(id)
    }

}

