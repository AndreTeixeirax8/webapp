import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CidadeService } from './cidade.service';
import { CidadeController } from './controllers/cidade.controller';
import { CidadeEntity } from './entity/cidade.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([CidadeEntity]),
  ],
  controllers: [CidadeController],
  providers: [CidadeService],
  exports: [CidadeService],
})
export class CidadeModule {}
