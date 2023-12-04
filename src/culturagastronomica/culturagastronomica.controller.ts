/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CulturagastronomicaService } from './culturagastronomica.service';
import { CulturagastronomicaDto } from './culturagastronomica.dto';
import { CulturagastronomicaEntity } from './culturagastronomica.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/user/roles.guard';
import { Role } from 'src/user/roles.enum';
import { Roles } from 'src/user/roles.decorator';

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturagastronomicaController {

    constructor(private readonly culturagastronomicaService: CulturagastronomicaService) {

    }

    @Get()
    @Roles(Role.ADMIN, Role.READONLY)
    async findAll() {
        return this.culturagastronomicaService.findAll();
    }

    @Get(':culturagastronomicaId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findOne(@Param('culturagastronomicaId') culturagastronomicaId: string) {
        return this.culturagastronomicaService.findOne(culturagastronomicaId);
    }

    @Post()
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async create(@Body() culturagastronomicaDto: CulturagastronomicaDto) {
        const culturagastronomica: CulturagastronomicaEntity = plainToInstance(CulturagastronomicaEntity, culturagastronomicaDto);
        return this.culturagastronomicaService.create(culturagastronomica);
    }

    @Put(':culturagastronomicaId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async update(@Param('culturagastronomicaId') culturagastronomicaId: string, @Body() culturagastronomicaDto: CulturagastronomicaDto) {
        const culturagastronomica: CulturagastronomicaEntity = plainToInstance(CulturagastronomicaEntity, culturagastronomicaDto);
        return this.culturagastronomicaService.update(culturagastronomicaId, culturagastronomica);
    }

    @Delete(':culturagastronomicaId')
    @Roles(Role.ADMIN, Role.DELETEONLY)
    @HttpCode(204)
    async delete(@Param('culturagastronomicaId') culturagastronomicaId: string) {
        return this.culturagastronomicaService.delete(culturagastronomicaId);
    }

}
