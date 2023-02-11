import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { ClienteService } from "./cliente.service";
import {CriarClienteDTO} from "./dtos/criar-cliente.dto"

//@UserGuards(ThrottlerGuard({})) usar para proteger a aplicação cotnra DDOS
@UseGuards(AuthGuard, RoleGuard)//não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api 
@Controller('clientes')
export class ClienteController{

    constructor(
        private readonly clienteService:ClienteService,
    ){}

    @Roles(Role.Admin)    
    @Post()
    async create(@Body() body:CriarClienteDTO){
        return this.clienteService.criar(body); 
    }

    @Roles(Role.Admin)
    @Get()
    async list(){
        return this.clienteService.buscaTodos();
    }
}