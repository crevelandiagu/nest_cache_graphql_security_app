/* eslint-disable prettier/prettier */
import {CacheModule, Module} from '@nestjs/common';
import { PaisService } from 'src/pais/pais.service';
import { PaisEntity } from 'src/pais/pais.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisCiudadController } from './pais-ciudad.controller';
import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { PaisCiudadService } from './pais-ciudad.service';

@Module({
  providers: [PaisService, PaisCiudadService],
  imports: [TypeOrmModule.forFeature([PaisEntity, CiudadEntity]), CacheModule.register()],
  controllers: [PaisCiudadController],
})
export class PaisCiudadModule {}
