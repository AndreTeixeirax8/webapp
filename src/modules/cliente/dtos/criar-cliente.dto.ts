import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CriarClienteDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  //@IsDateString()
  birthAt: Date;

  @IsInt()
  cidade: number;

  @IsInt()
  unidadeFederal: number;

  @IsString()
  telefone: string;

  @IsString()
  cpf: string;

  @IsInt()
  role: number;
}
