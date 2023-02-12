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
      throw new BadRequestException('Este e-mail já está sendo usado.');
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
    await this.verificaSeExite(id);

    return this.clienteRepository.findOneBy({
      id,
    });
  }

  async verificaSeExite(id: number) {
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
}
