/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';

import { CulturagastronomicaService } from './culturagastronomica.service';
import { CulturagastronomicaEntity } from './culturagastronomica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturagastronomicaController } from './culturagastronomica.controller';
import { CulturagastronomicaResolver } from './culturagastronomica.resolver';

@Module({
  providers: [CulturagastronomicaService, CulturagastronomicaResolver],
  imports: [TypeOrmModule.forFeature([CulturagastronomicaEntity]), CacheModule.register()],
  controllers: [CulturagastronomicaController],
})
export class CulturagastronomicaModule {}
