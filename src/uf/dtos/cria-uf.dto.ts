import { IsString } from 'class-validator';

export class CriaUfDto {
  @IsString()
  nome: string;

  @IsString()
  sigla: string;
}
