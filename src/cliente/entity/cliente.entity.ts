import { CidadeEntity } from 'src/cidade/entity/cidade.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cliente')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ nullable: true })
  cidade: number;

  @Column({ nullable: true })
  unidadeFederal: number;

  @Column({ nullable: true })
  telefone: string;

  @Column()
  cpf: string;

  @Column()
  role: number;

  @ManyToOne(() => CidadeEntity, (cidades) => cidades.clientes)
  @JoinColumn({ name: 'cidade_id' })
  cidades: CidadeEntity;
}
