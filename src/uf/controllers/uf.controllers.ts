import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CriaUfDto } from 'src/uf/dtos';
import { UfService } from 'src/uf';

@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('ufs')
export class UfController {
  constructor(private readonly ufService: UfService) {}

  @Roles(Role.Admin)
  @Post()
  async criar(@Body() body: CriaUfDto) {
    return this.ufService.criar(body);
  }

  @Roles(Role.Admin)
  @Get()
  async buscaTodos() {
    return this.ufService.buscaTodos();
  }
}
