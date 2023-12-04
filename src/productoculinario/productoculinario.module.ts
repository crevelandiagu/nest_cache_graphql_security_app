/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { ProductoculinarioController } from './productoculinario.controller';
import { ProductoculinarioService } from './productoculinario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoculinarioEntity } from './productoculinario.entity';
import { ProductoculinarioResolver } from './productoculinario.resolver';

@Module({
  
  providers: [ProductoculinarioService, ProductoculinarioResolver],
  imports: [TypeOrmModule.forFeature([ProductoculinarioEntity]), CacheModule.register()],
  controllers: [ProductoculinarioController]
})
export class ProductoculinarioModule {}
