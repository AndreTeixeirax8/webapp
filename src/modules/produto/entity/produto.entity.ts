import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produto')
export class ProdutoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  custo_atual: number;

  @Column('decimal', { precision: 10, scale: 2 })
  custo_anterior: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  data_ultima_compra: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  data_ultima_venda: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  data_validade: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  dias_nova_compra: Date;

  @Column()
  unidade_medida: number;

  @Column()
  estoque: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_venda: number;

  @Column()
  descricao: string;

  @Column()
  categoria: number;

  @Column()
  imagem: string;

  @Column()
  fornecedor: number;

  @Column()
  markup: number;

  @Column()
  ativo: string;
}
