import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UfErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Repository } from 'typeorm';
import { CriaUfDto } from 'src/uf/dtos';
import { UfEntity } from 'src/uf/entity';

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

  async buscaTodos() {
    return this.ufRepository.find();
  }

  async verificaSeExiteId(id: number) {
    if (
      !(await this.ufRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(UfErrorApiEnum.NaoEncotrado);
    }
  }
}
