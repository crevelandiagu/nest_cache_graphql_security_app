/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { RestauranteService } from 'src/restaurante/restaurante.service';
import { RestauranteEntity } from 'src/restaurante/restaurante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEstrellamichelinController } from './restaurante-estrellamichelin.controller';
import { RestauranteEstrellamichelinService } from './restaurante-estrellamichelin.service';
import { EstrellamichelinEntity } from 'src/estrellamichelin/estrellamichelin.entity';

@Module({
  providers: [RestauranteService, RestauranteEstrellamichelinService],
  imports: [TypeOrmModule.forFeature([RestauranteEntity, EstrellamichelinEntity]), CacheModule.register()],
  controllers: [RestauranteEstrellamichelinController],
})
export class RestauranteEstrellamichelinModule {}
