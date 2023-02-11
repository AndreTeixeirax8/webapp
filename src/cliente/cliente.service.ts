import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { ClienteEntity } from "./entity/cliente.entity";
import {CriarClienteDTO} from "./dtos/criar-cliente.dto"
import { BuscarClientePorNomeDTO } from "./dtos/busca-cliente-por-nome.dto";

@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRepository:Repository<ClienteEntity>
        ){}

        async criar(data: CriarClienteDTO) {
            if (
              await this.clienteRepository.exist({
                where: {
                  email: data.email,
                },
              })
            ) {
              throw new BadRequestException('Este e-mail já está sendo usado.');
            }
        
       
            const user = this.clienteRepository.create(data);
        
            return this.clienteRepository.save(user);
          }

          async buscaTodos() {
            return this.clienteRepository.find();
          }

          async show(nome: string) {
            
            return this.clienteRepository.find({
              where:[{name: Like(`%${nome}%`)}]
            });
          }


}