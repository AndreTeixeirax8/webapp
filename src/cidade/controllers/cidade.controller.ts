import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('cidades')
export class CidadeController {}
