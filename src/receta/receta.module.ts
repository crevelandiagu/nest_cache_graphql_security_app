/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { RecetaController } from './receta.controller';
import { RecetaService } from './receta.service';
import { RecetaEntity } from './receta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaResolver } from './receta.resolver';

@Module({
  
  providers: [RecetaService, RecetaResolver],
  imports: [TypeOrmModule.forFeature([RecetaEntity]), CacheModule.register()],
  controllers: [RecetaController]
})
export class RecetaModule {}
