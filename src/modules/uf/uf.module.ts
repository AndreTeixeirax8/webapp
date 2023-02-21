import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { UfController } from './controllers';
import { UfEntity } from './entity';
import { UfService } from './uf.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([UfEntity]),
  ],
  controllers: [UfController],
  providers: [UfService],
  exports: [
    UfService,
  ] /**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */,
})
export class UfModule {}
