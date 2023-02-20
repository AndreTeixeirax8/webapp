import { ClienteEntity } from 'src/cliente/entity/cliente.entity';
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

  @OneToMany(() => ClienteEntity, (cliente) => cliente.cidade)
  clientes: ClienteEntity[];
}
