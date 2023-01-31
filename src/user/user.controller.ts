import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')
export class UserController{

    @Post()
    async create(@Body() body){
        return {body}; 
    }

    @Get()
    async list(){
        return{users:[]}
    }

    @Get(':id')
    async show(@Param()params){
        return{users:{},params}
    }

    /**O PUT faz a alteração total dos dados ou seja se tem nome e endereço e você passar 
     * apenas o nome ele vai pegar o endereço que já existe no banco e deixar em branco
     */
    @Put(':id')
    /**Os decorators aplicado podem ser varios , aqui estamos pegando o corpo da requisição
    e os paramtros nele  */
    async update(@Body() body,@Param()params){
        return {body,params,method:'put'}
    }

      /**O PATCH faz a alteração dos dados porem os que não forem passados ele preserva no banco 
       * não são alterados , vai se alterar apenas os dados informados.
     */
    @Patch(':id')
    async updatePartial(@Body() body,@Param()params){
        return {body,params,method:'patch'}
    }

    @Delete(':id')
    async delete(@Param()params){
        return{
            params
        }
    }

}

