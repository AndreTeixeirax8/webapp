import { ClienteEntity } from 'src/modules/cliente/entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('uf')
export class UfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  /*
  @OneToMany(() => ClienteEntity, (cliente) => cliente.ufs)
  clientes: ClienteEntity[];*/

  @OneToMany(() => UserEntity, (usuario) => usuario.ufs)
  usuarios: UserEntity[];
}
