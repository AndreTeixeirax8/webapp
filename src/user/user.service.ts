import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

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
        return this.prisma.user.findUnique({
            where:{
                id,
            }
        })
    } 
    
}