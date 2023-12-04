/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { EstrellamichelinService } from './estrellamichelin.service';
import { EstrellamichelinEntity } from './estrellamichelin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstrellamichelinController } from './estrellamichelin.controller';
import { EstrellamichelinResolver } from './estrellamichelin.resolver';
@Module({
  providers: [EstrellamichelinService, EstrellamichelinResolver],
  imports: [TypeOrmModule.forFeature([EstrellamichelinEntity]), CacheModule.register()],
  controllers: [EstrellamichelinController],
})
export class EstrellamichelinModule {}
