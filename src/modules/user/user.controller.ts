import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
//@UserGuards(ThrottlerGuard({})) usar para proteger a aplicação cotnra DDOS
@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor) Ativa o Intercptor de forma local

  @Roles(Role.Admin) //aqui permite o acesso a penas a um admin
  @Post()
  async criaUmCliente(@Body() body: CreateUserDTO) {
    return this.userService.criaUmCliente(body);
  }

  @Roles(Role.Admin) //aqui permite o acesso a penas a um admin
  @Get()
  async buscaTodos() {
    return this.userService.BuscaTodos();
  }

  @Get(':id')
  async buscaPorId(@ParamId() id: number) {
    /** Aqui ultilizamos um decorator personalizado , podemos usar nos outros tambem */
    return this.userService.buscaPorId(id);
  }

  /**O PUT faz a alteração total dos dados ou seja se tem nome e endereço e você passar
   * apenas o nome ele vai pegar o endereço que já existe no banco e deixar em branco
   */
  @Put(':id')
  /**Os decorators aplicado podem ser varios , aqui estamos pegando o corpo da requisição
    e os paramtros nele  */
  async update(
    @Body() data: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.update(id, data);
  }

  /**O PATCH faz a alteração dos dados porem os que não forem passados ele preserva no banco
   * não são alterados , vai se alterar apenas os dados informados.
   */
  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
