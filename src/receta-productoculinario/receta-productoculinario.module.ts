/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { RecetaService } from 'src/receta/receta.service';
import { RecetaEntity } from 'src/receta/receta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaProductoculinarioController } from './receta-productoculinario.controller';
import { ProductoculinarioEntity } from '../productoculinario/productoculinario.entity';
import { RecetaProductoculinarioService } from './receta-productoculinario.service';

@Module({
  providers: [RecetaService, RecetaProductoculinarioService],
  imports: [TypeOrmModule.forFeature([RecetaEntity, ProductoculinarioEntity]), CacheModule.register()],
  controllers: [RecetaProductoculinarioController],
})
export class RecetaProductoculinarioModule {}
