import { ClienteEntity } from 'src/modules/cliente/entity/cliente.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cidade')
export class CidadeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  uf: number;

  @Column()
  codigo: number;

  /*
  @OneToMany(() => ClienteEntity, (cliente) => cliente.cidade)
  clientes: ClienteEntity[];*/

  @OneToMany(() => UserEntity, (usuario) => usuario.cidade)
  usuarios: UserEntity[];
}
