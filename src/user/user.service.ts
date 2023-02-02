import { Injectable, NotFoundException } from '@nestjs/common';
import { count } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}

   async create(data:CreateUserDTO){

       return await this.prisma.user.create({
            data,
        });
    }

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

    async update(id:number,data:UpdatePutUserDTO){

        await this.exists(id);

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        });
    }

    async updatePartial(id:number,data:UpdatePatchUserDTO){

        await this.exists(id);

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        });
    }

    async delete(id:number){

        await this.exists(id);

        return  this.prisma.user.delete({
            where:{
                id
            }
        });
    }

    async exists(id: number){
        if(!(await this.prisma.user.count({
            where:{
                id
            }
        })))
        {
            throw new NotFoundException(`Usuario informado ${id} não existe`)
        }

    }
    
}