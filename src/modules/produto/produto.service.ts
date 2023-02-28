import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoErrorApiEnum } from 'src/common/enums/error-api.enum';
import { Like, Repository } from 'typeorm';
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

  async verificaSeExiteId(id: number) {
    if (
      !(await this.produtoRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(ProdutoErrorApiEnum.NaoEncotrado);
    }
  }

  async buscaPorId(id: number) {
    await this.verificaSeExiteId(id);

    return this.produtoRepository.findOneBy({
      id,
    });
  }

  async show(nome: string) {
    const busca = await this.produtoRepository.find({
      where: [{ nome: Like(`%${nome}%`) }],
    });

    if (busca.length == 0)
      throw new NotFoundException(ProdutoErrorApiEnum.NaoEncotrado);
    return busca;
  }
}
