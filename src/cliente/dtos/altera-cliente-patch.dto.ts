import { PartialType } from '@nestjs/mapped-types';
import { CriarClienteDTO } from './criar-cliente.dto';

export class AlteraClientePatchDTO extends PartialType(CriarClienteDTO) {}
