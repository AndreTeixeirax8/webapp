import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Repository } from 'typeorm';
import { CriaProdutoDto } from './dtos';
import { ProdutoEntity } from './entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) {}

  async criar(data: CriaProdutoDto) {
    if (
      await this.produtoRepository.exist({
        where: {
          nome: data.nome,
        },
      })
    ) {
      throw new BadRequestException(ProdutoErrorApiEnum.ProdutoJaCadastrado);
    }

    const uf = this.produtoRepository.create(data);
    return this.produtoRepository.save(uf);
  }

  async buscaTodos() {
    return this.produtoRepository.find();
  }
}
