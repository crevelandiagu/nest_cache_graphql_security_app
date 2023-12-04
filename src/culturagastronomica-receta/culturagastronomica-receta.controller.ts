/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { RecetaDto } from 'src/receta/receta.dto';
import { RecetaEntity } from 'src/receta/receta.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/user/roles.guard';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/roles.enum';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturagastronomicaRecetaController {

    constructor(private readonly culturagastronomicaRecetaService: CulturaGastronomicaRecetaService) {

    }

    @Post(':culturagastronomicaId/recetas/:recetaId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async addRecetaCulturagastronomica(@Param('culturagastronomicaId') culturagastronomicaId: string, @Param('recetaId') recetaId: string) {
        return await this.culturagastronomicaRecetaService.addRecetaCulturaGastronomica(culturagastronomicaId, recetaId);
    }

    @Get(':culturagastronomicaId/recetas/:recetaId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findRecetaByCulturagastronomicaIdProductoCulinarioId(@Param('culturagastronomicaId') culturagastronomicaId: string, @Param('recetaId') recetaId: string) {
        return await this.culturagastronomicaRecetaService.findRecetaByCulturaGastronomicaIdRecetaId(culturagastronomicaId, recetaId);
    }

    @Get(':culturagastronomicaId/recetas')
    @Roles(Role.ADMIN, Role.READONLY)
    async findRecetaByCulturagastronomicaId(@Param('culturagastronomicaId') culturagastronomicaId: string) {
        return await this.culturagastronomicaRecetaService.findRecetasByCulturaGastronomica(culturagastronomicaId);

    }

    @Put(':culturagastronomicaId/recetas')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async associateRecetasCulturagastronomicaId(@Param('culturagastronomicaId') culturagastronomicaId: string, @Body() recetasDto: RecetaDto[]) {
        const recetas: RecetaEntity[] = plainToInstance(RecetaEntity, recetasDto);
        return await this.culturagastronomicaRecetaService.associateRecetaCulturaGastronomica(culturagastronomicaId, recetas);
    }

    @Delete(':culturagastronomicaId/recetas/:recetaId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async deleteRecetaCulturagastronomica(@Param('culturagastronomicaId') culturagastronomicaId: string, @Param('recetaId') recetaId: string) {
        return await this.culturagastronomicaRecetaService.deleteRecetaCulturaGastronomica(culturagastronomicaId, recetaId);
    }
}
