import { IsInt, IsOptional, IsString } from 'class-validator';

export class CriaCidadeDto {
  @IsString()
  nome: string;

  @IsInt()
  uf: number;

  @IsInt()
  @IsOptional()
  codigo: number;
}
