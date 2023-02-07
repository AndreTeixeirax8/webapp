import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { count } from 'console';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>
        ){}

        /*
   async create(data:CreateUserDTO){
        /** o numero determina quanto de processamento o servidor vai usar , 
        quanto maior mais lento e um hash mais forte  
        data.password = await bcrypt.hash(data.password,2)


       return await this.userRepository.create(data);
    }
        */
    async create(data: CreateUserDTO) {
        if (
          await this.userRepository.exist({
            where: {
              email: data.email,
            },
          })
        ) {
          throw new BadRequestException('Este e-mail já está sendo usado.');
        }
    
        const salt = await bcrypt.genSalt();
    
        data.password = await bcrypt.hash(data.password, salt);
    
        const user = this.userRepository.create(data);
    
        return this.userRepository.save(user);
      }

    /*

    async list(){

        return this.prisma.user.findMany();
    }

    async show(id:number){

        await this.exists(id);

        return this.prisma.user.findUnique({
            where:{
                id,
            }
        })
    } 
*/


async list() {
    return this.userRepository.find();
  }

  async show(id: number) {
    await this.exists(id);

    return this.userRepository.findOneBy({
      id,
    });
  }
  /*

    async update(id:number,data:UpdatePutUserDTO){

        await this.exists(id);

        data.password = await bcrypt.hash(data.password,2)

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        });
    }
*/

async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.userRepository.update(id, {
      email,
      name,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.show(id);
  }

  /*
    async updatePartial(id:number,data:UpdatePatchUserDTO){

        await this.exists(id);

        data.password = await bcrypt.hash(data.password,2) //verificar  se não vai dar problema

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        });
    }
    */

    async updatePartial(
        id: number,
        { email, name, password, birthAt, role }: UpdatePatchUserDTO,
      ) {
        await this.exists(id);
    
        const data: any = {};
    
        if (birthAt) {
          data.birthAt = new Date(birthAt);
        }
    
        if (email) {
          data.email = email;
        }
    
        if (name) {
          data.name = name;
        }
    
        if (password) {
          const salt = await bcrypt.genSalt();
          data.password = await bcrypt.hash(password, salt);
        }
    
        if (role) {
          data.role = role;
        }
    
        await this.userRepository.update(id, data);
    
        return this.show(id);
      }

      /*
    async delete(id:number){

        await this.exists(id);

        return  this.prisma.user.delete({
            where:{
                id
            }
        });
    }*/
    async delete(id: number) {
        await this.exists(id);
    
        await this.userRepository.delete(id);
    
        return true;
      }
    
/*
    async exists(id: number){
        if(!(await this.prisma.user.count({
            where:{
                id
            }
        })))
        {
            throw new NotFoundException(`Usuario informado ${id} não existe`)
        }

    }*/

    async exists(id: number) {
        if (
          !(await this.userRepository.exist({
            where: {
              id,
            },
          }))
        ) {
          throw new NotFoundException(`O usuário ${id} não existe.`);
        }
      }
    
}