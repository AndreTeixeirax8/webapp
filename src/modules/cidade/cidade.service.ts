import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CidadeErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Repository } from 'typeorm';
import { CriaCidadeDto, AlteraCidadePutDTO } from 'src/modules/cidade/dtos';
import { CidadeEntity } from 'src/modules/cidade/entity';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(CidadeEntity)
    private readonly cidadeRepository: Repository<CidadeEntity>
  ) {}

  async criar(data: CriaCidadeDto) {
    if (
      await this.cidadeRepository.exist({
        where: {
          nome: data.nome,
        },
      })
    ) {
      throw new BadRequestException(CidadeErrorApiEnum.CidadeJaCadastrada);
    }

    const cidade = this.cidadeRepository.create(data);
    return this.cidadeRepository.save(cidade);
  }

  async buscaTodos() {
    return this.cidadeRepository.find();
  }

  async verificaSeExiteId(id: number) {
    if (
      !(await this.cidadeRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(CidadeErrorApiEnum.NaoEncotrado);
    }
  }

  async buscaPorId(id: number) {
    await this.verificaSeExiteId(id);

    return this.cidadeRepository.findOneBy({
      id,
    });
  }

  async alteraUmRegistro(id: number, alteraCidadePutDTO: AlteraCidadePutDTO) {
    await this.verificaSeExiteId(id);
    await this.cidadeRepository.update(id, alteraCidadePutDTO);

    return this.buscaPorId(id);
  }

  async delete(id: number) {
    await this.verificaSeExiteId(id);

    await this.cidadeRepository.delete(id);

    return true;
  }
}
