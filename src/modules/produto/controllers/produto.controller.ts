import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CriaProdutoDto } from '../dtos';
import { AlteraProdutoPutDTO } from '../dtos/altera-produto-total-put.dto';
import { ProdutoService } from '../produto.service';

@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Roles(Role.Admin)
  @Post()
  async criar(@Body() body: CriaProdutoDto) {
    return this.produtoService.criar(body);
  }

  @Roles(Role.Admin)
  @Get()
  async buscaTodos() {
    return this.produtoService.buscaTodos();
  }

  @Get(':nome')
  async show(@Param('nome') nome: string) {
    return this.produtoService.show(nome);
  }

  @Get(':id')
  async buscaPorId(@ParamId() id: number) {
    return this.produtoService.buscaPorId(id);
  }

  @Put(':id')
  async alteraUmRegistro(
    @Body() data: AlteraProdutoPutDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.produtoService.alteraUmRegistro(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
