import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CriaProdutoDto } from '../dtos';
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
}
