import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
