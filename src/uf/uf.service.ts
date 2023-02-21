import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UfErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Repository } from 'typeorm';
import { CriaUfDto } from './dtos';
import { UfEntity } from './entity';

@Injectable()
export class UfService {
  constructor(
    @InjectRepository(UfEntity)
    private readonly ufRepository: Repository<UfEntity>
  ) {}

  async criar(data: CriaUfDto) {
    if (
      await this.ufRepository.exist({
        where: {
          nome: data.nome,
        },
      })
    ) {
      throw new BadRequestException(UfErrorApiEnum.UfJaCadastrada);
    }

    const uf = this.ufRepository.create(data);
    return this.ufRepository.save(uf);
  }
}
