import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrorApiEnum } from 'src/common/enums/error-api.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async criaUmUser(data: CreateUserDTO) {
    if (
      await this.userRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este e-mail já está sendo usado.');
    }

    if (
      await this.userRepository.exist({
        where: {
          cpf: data.cpf,
        },
      })
    ) {
      throw new BadRequestException(UserErrorApiEnum.CpfJaCadastrado);
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async BuscaTodos() {
    return this.userRepository.find();
  }

  async buscaPorId(id: number) {
    await this.exists(id);

    return this.userRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUserDTO
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.userRepository.update(id, {
      email,
      name,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.buscaPorId(id);
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDTO
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);

    return this.buscaPorId(id);
  }

  async delete(id: number) {
    await this.exists(id);

    await this.userRepository.delete(id);

    return true;
  }

  async exists(id: number) {
    if (
      !(await this.userRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }

  async verificaSeExisteCpf(cpf: string) {}
}
