import { CidadeEntity } from 'src/modules/cidade/entity/cidade.entity';
import { UfEntity } from 'src/modules/uf/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => CidadeEntity, (cidade) => cidade.clientes)
  @JoinColumn({ name: 'cidade', referencedColumnName: 'id' })
  cidades: CidadeEntity;

  @ManyToOne(() => UfEntity, (ufs) => ufs.clientes)
  @JoinColumn({ name: 'unidadeFederal', referencedColumnName: 'id' })
  ufs: CidadeEntity;
}
