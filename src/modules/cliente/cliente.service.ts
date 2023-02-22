import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ClienteEntity } from './entity/cliente.entity';
import { CriarClienteDTO } from './dtos/criar-cliente.dto';
import { ClienteErrorApiEnum } from 'src/common/enums/error-api.enum';
import { AlteraClientePutDTO } from './dtos/altera-cliente-total-put.dto';
import { AlteraClientePatchDTO } from './dtos/altera-cliente-patch.dto';
import { PaginateQuery } from 'nestjs-paginate';
import { paginate, Paginated } from 'nestjs-paginate/lib/paginate';
import { FilterOperator } from 'nestjs-paginate/lib/operator';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>
  ) {}

  async criar(data: CriarClienteDTO) {
    if (
      await this.clienteRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException(ClienteErrorApiEnum.EmailJaCadastrado);
    }
    if (
      await this.clienteRepository.exist({
        where: {
          cpf: data.cpf,
        },
      })
    ) {
      throw new BadRequestException(ClienteErrorApiEnum.CpfJaCadastrado);
    }
    const user = this.clienteRepository.create(data);
    return this.clienteRepository.save(user);
  }

  async buscaTodos() {
    return this.clienteRepository.find();
  }

  async buscaPorNome(nome: string) {
    const busca = await this.clienteRepository.find({
      where: [{ name: Like(`%${nome}%`) }],
    });

    if (busca.length == 0)
      throw new NotFoundException(ClienteErrorApiEnum.NaoEncotrado);
    return busca;
  }

  async buscaPorId(id: number) {
    await this.verificaSeExiteId(id);

    return this.clienteRepository.findOneBy({
      id,
    });
  }

  async verificaSeExiteId(id: number) {
    if (
      !(await this.clienteRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }

  async alteraUmRegistro(id: number, alteraClientePutDTO: AlteraClientePutDTO) {
    await this.verificaSeExiteId(id);
    await this.clienteRepository.update(id, alteraClientePutDTO);

    return this.buscaPorId(id);
  }

  async alteraUmRegistroParcial(
    id: number,
    alteraClientePatchDTO: AlteraClientePatchDTO
  ) {
    await this.verificaSeExiteId(id);
    await this.clienteRepository.update(id, alteraClientePatchDTO);

    return this.buscaPorId(id);
  }

  async delete(id: number) {
    await this.verificaSeExiteId(id);

    await this.clienteRepository.delete(id);

    return true;
  }

  /* async buscaVariosPaginado(
    query: PaginateQuery
  ): Promise<Paginated<ClienteEntity>> {
    return paginate(query, this.clienteRepository, {
      select: [
        'id',
        'name',
        'email',
        'cpf',
        'telefone',
        'unidadeFederal',
        'ufs.nome',
        'cidade',
        'cidades.nome',
      ],
      relations: ['cidades', 'ufs'],
      sortableColumns: ['id', 'name'],
      searchableColumns: ['id'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 10,
      filterableColumns: {
        id: [FilterOperator.EQ, FilterOperator.IN],
      },
    });
  }*/
}
