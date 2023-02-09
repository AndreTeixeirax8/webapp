import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClienteEntity } from "./entity/cliente.entity";
import {CriarClienteDTO} from "./dtos/criar-cliente.dto"

@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRepository:Repository<ClienteEntity>
        ){}

        async create(data: CriarClienteDTO) {
            if (
              await this.clienteRepository.exist({
                where: {
                  email: data.email,
                },
              })
            ) {
              throw new BadRequestException('Este e-mail já está sendo usado.');
            }
        
          //  const salt = await bcrypt.genSalt();
        
           // data.password = await bcrypt.hash(data.password, salt);
        
            const user = this.clienteRepository.create(data);
        
            return this.clienteRepository.save(user);
          }
}