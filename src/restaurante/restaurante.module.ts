/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { RestauranteController } from './restaurante.controller';
import { RestauranteService } from './restaurante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteResolver } from './restaurante.resolver';

@Module({
  providers: [RestauranteService, RestauranteResolver],
  imports: [
    TypeOrmModule.forFeature([RestauranteEntity]),
    CacheModule.register(),
  ],
  controllers: [RestauranteController],
})
export class RestauranteModule {}
