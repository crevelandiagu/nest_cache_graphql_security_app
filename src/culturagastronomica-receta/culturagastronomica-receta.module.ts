/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { CulturagastronomicaEntity} from "../culturagastronomica/culturagastronomica.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturagastronomicaService} from "../culturagastronomica/culturagastronomica.service";
import { RecetaEntity } from 'src/receta/receta.entity';
import { CulturagastronomicaRecetaController } from './culturagastronomica-receta.controller';

@Module({
  providers: [CulturagastronomicaService, CulturaGastronomicaRecetaService],
  imports: [TypeOrmModule.forFeature([CulturagastronomicaEntity, RecetaEntity]), CacheModule.register()],
  controllers: [CulturagastronomicaRecetaController],
})
export class CulturagastronomicaRecetaModule {}
