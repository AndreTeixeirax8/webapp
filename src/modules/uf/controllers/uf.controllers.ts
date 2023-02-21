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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { AlteraUfPutDTO, CriaUfDto } from 'src/modules/uf/dtos';
import { UfService } from 'src/modules/uf';
import { ParamId } from 'src/decorators/param-id.decorator';

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

  @Get(':id')
  async buscaPorId(@ParamId() id: number) {
    return this.ufService.buscaPorId(id);
  }

  @Put(':id')
  async alteraUmRegistro(
    @Body() data: AlteraUfPutDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.ufService.alteraUmRegistro(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.ufService.delete(id);
  }
}
