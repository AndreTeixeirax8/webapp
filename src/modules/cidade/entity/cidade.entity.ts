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

  @OneToMany(() => UserEntity, (usuario) => usuario.cidade)
  usuarios: UserEntity[];
}
