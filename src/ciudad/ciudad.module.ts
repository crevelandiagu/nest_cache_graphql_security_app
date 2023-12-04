/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from './ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadController } from './ciudad.controller';
import { CiudadResolver } from './ciudad.resolver';

@Module({
    providers: [CiudadService, CiudadResolver],
    imports: [TypeOrmModule.forFeature([CiudadEntity]), CacheModule.register()],
    controllers: [CiudadController],
})
export class CiudadModule {}