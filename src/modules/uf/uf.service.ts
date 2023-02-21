import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UfErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Repository } from 'typeorm';
import { AlteraUfPutDTO, CriaUfDto } from 'src/modules/uf/dtos';
import { UfEntity } from 'src/modules/uf/entity';

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

  async buscaPorId(id: number) {
    await this.verificaSeExiteId(id);

    return this.ufRepository.findOneBy({
      id,
    });
  }

  async alteraUmRegistro(id: number, alteraUfPutDTO: AlteraUfPutDTO) {
    await this.verificaSeExiteId(id);
    await this.ufRepository.update(id, alteraUfPutDTO);

    return this.buscaPorId(id);
  }

  async delete(id: number) {
    await this.verificaSeExiteId(id);

    await this.ufRepository.delete(id);

    return true;
  }
}
