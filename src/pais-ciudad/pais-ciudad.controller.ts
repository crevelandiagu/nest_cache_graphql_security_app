/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaisCiudadService } from './pais-ciudad.service';
import { CiudadDto } from 'src/ciudad/ciudad.dto';
import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/user/roles.guard';
import { Role } from 'src/user/roles.enum';
import { Roles } from 'src/user/roles.decorator';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('paises')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BusinessErrorsInterceptor)
export class PaisCiudadController {

    constructor(private readonly paisCiudadService: PaisCiudadService) {

    }

    @Post(':paisId/ciudades/:ciudadId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async addCiudadPais(@Param('paisId') paisId: string, @Param('ciudadId') ciudadId: string) {
        return await this.paisCiudadService.addCiudadPais(paisId, ciudadId);
    }

    @Get(':paisId/ciudades/:ciudadId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findCiudadByPaisIdCiudadId(@Param('paisId') paisId: string, @Param('ciudadId') ciudadId: string) {
        return await this.paisCiudadService.findCiudadByPaisIdCiudadId(paisId, ciudadId);
    }

    @Get(':paisId/ciudades')
    @Roles(Role.ADMIN, Role.READONLY)
    async findciudadByPaisId(@Param('paisId') paisId: string) {
        return await this.paisCiudadService.findCiudadByPaisId(paisId);

    }

    @Put(':paisId/ciudades')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async associateCiudadesPais(@Param('paisId')paisId: string, @Body() ciudadesDto: CiudadDto[]) {
        const ciudades: CiudadEntity[] = plainToInstance(CiudadEntity, ciudadesDto);
        return await this.paisCiudadService.associateCiudadesPais(paisId, ciudades);
    }

    @Delete(':paisId/ciudades/:ciudadId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async deleteCiudadPais(@Param('paisId') paisId: string, @Param('ciudadId') ciudadId: string) {
        return await this.paisCiudadService.deleteCiudadPais(paisId, ciudadId);
    }



}
