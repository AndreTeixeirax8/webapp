import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CriaCidadeDto } from 'src/cidade/dtos/cria-cidade.dto';
import { CidadeErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Repository } from 'typeorm';
import { CidadeEntity } from './entity/cidade.entity';

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
}
