/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaDto } from './receta.dto';
import { RecetaEntity } from './receta.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { Role } from '../user/roles.enum';
import { Roles } from '../user/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../user/roles.guard';

@Controller('recetas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecetaController {

    constructor(private readonly recetaService: RecetaService) {

    }

    @Get()
    @Roles(Role.ADMIN, Role.READONLY, Role.RECETAREADONLY)
    async findAll() {
        return await this.recetaService.findAll();
    }

    @Get(':recetaId')
    @Roles(Role.ADMIN, Role.READONLY, Role.RECETAREADONLY)
    async findOne(@Param('recetaId') recetaId: string) {
        return await this.recetaService.findOne(recetaId);
    }

    @Post()
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async create(@Body() recetaDto: RecetaDto) {
        const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
        return await this.recetaService.create(receta);
    }

    @Put(':recetaId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async update(@Param('recetaId') recetaId: string, @Body() recetaDto: RecetaDto) {
        const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
        return await this.recetaService.update(recetaId, receta);
    }

    @Delete(':recetaId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async delete(@Param('recetaId') recetaId: string) {
        return await this.recetaService.delete(recetaId);
    }




}
