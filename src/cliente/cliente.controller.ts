import { Body, Controller, Post } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import {CriarClienteDTO} from "./dtos/criar-cliente.dto"

@Controller('clientes')
export class ClienteController{

    constructor(
        private readonly clienteService:ClienteService,
    ){}


    @Post()
    async create(@Body() body:CriarClienteDTO){
        return this.clienteService.create(body); 
    }
}