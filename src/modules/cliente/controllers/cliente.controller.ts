import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate/lib/decorator';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ClienteService } from '../cliente.service';
import { AlteraClientePatchDTO } from '../dtos/altera-cliente-patch.dto';
import { AlteraClientePutDTO } from '../dtos/altera-cliente-total-put.dto';
import { CriarClienteDTO } from '../dtos/criar-cliente.dto';

//@UserGuards(ThrottlerGuard({})) usar para proteger a aplicação cotnra DDOS
@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: CriarClienteDTO) {
    return this.clienteService.criar(body);
  }
  /*
  @Get('listagem/paginada')
  async buscaVariosPaginado(@Paginate() query: PaginateQuery) {
    return this.clienteService.buscaVariosPaginado(query);
  }*/

  @Roles(Role.Admin)
  @Get()
  async buscaTodos() {
    return this.clienteService.buscaTodos();
  }

  @Get(':nome')
  async buscaPorNome(@Param('nome') nome: string) {
    return this.clienteService.buscaPorNome(nome);
  }

  @Get(':id')
  async buscaPorId(@ParamId() id: number) {
    return this.clienteService.buscaPorId(id);
  }

  @Put(':id')
  async alteraUmRegistro(
    @Body() data: AlteraClientePutDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.clienteService.alteraUmRegistro(id, data);
  }

  @Patch(':id')
  async alteraUmRegistroParcial(
    @Body() data: AlteraClientePatchDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.clienteService.alteraUmRegistroParcial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.delete(id);
  }
}
