import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CidadeService } from '../cidade.service';
import { CriaCidadeDto } from '../dtos/cria-cidade.dto';

@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('cidades')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Roles(Role.Admin)
  @Post()
  async criar(@Body() body: CriaCidadeDto) {
    return this.cidadeService.criar(body);
  }

  @Roles(Role.Admin)
  @Get()
  async buscaTodos() {
    return this.cidadeService.buscaTodos();
  }

  @Get(':id')
  async buscaPorId(@ParamId() id: number) {
    return this.cidadeService.buscaPorId(id);
  }
}
