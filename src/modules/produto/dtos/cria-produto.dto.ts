import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CriaProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  custo_atual: number;

  @IsNumber()
  custo_anterior: number;

  @IsOptional()
  @IsDateString()
  data_ultima_compra: Date;

  @IsOptional()
  @IsDateString()
  data_ultima_venda: Date;

  @IsOptional()
  @IsDateString()
  data_validade: Date;

  @IsOptional()
  @IsDateString()
  dias_nova_compra: Date;

  @IsNumber()
  unidade_medida: number;

  @IsNumber()
  estoque: number;

  @IsNumber()
  valor_venda: number;

  @IsString()
  descricao: string;

  @IsNumber()
  categoria: number;

  @IsString()
  imagem: string;

  @IsNumber()
  fornecedor: number;

  @IsNumber()
  markup: number;

  @IsString()
  ativo: string;
}
