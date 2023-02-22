import { CidadeEntity } from 'src/modules/cidade/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ default: 1 })
  role: number;

  @Column({ nullable: true })
  cidade: number;

  @Column({ nullable: true })
  unidadeFederal: number;

  @Column({ nullable: true })
  telefone: string;

  @Column()
  cpf: string;

  @ManyToOne(() => CidadeEntity, (cidade) => cidade.usuarios)
  @JoinColumn({ name: 'cidade', referencedColumnName: 'id' })
  cidades: CidadeEntity;
}
