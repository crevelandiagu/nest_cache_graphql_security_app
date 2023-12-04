/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { RecetaProductoculinarioService } from './receta-productoculinario.service';
import { ProductoculinarioDto } from '../productoculinario/productoculinario.dto';
import { ProductoculinarioEntity } from '../productoculinario/productoculinario.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../user/roles.guard';
import { Role } from '../user/roles.enum';
import { Roles } from '../user/roles.decorator';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('recetas')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BusinessErrorsInterceptor)
export class RecetaProductoculinarioController {

    constructor(private readonly recetaProductoculinarioService: RecetaProductoculinarioService) {

    }

    @Post(':recetaId/productosculinarios/:productoculinarioId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async addProductoculinarioReceta(@Param('recetaId') recetaId: string, @Param('productoculinarioId') productoculinarioId: string) {
        return await this.recetaProductoculinarioService.addProductoculinarioReceta(recetaId, productoculinarioId);
    }

    @Get(':recetaId/productosculinarios/:productoculinarioId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findProductoCulinarioByRecetaIdProductoCulinarioId(@Param('recetaId') recetaId: string, @Param('productoculinarioId') productoculinarioId: string) {
        return await this.recetaProductoculinarioService.findProductoCulinarioByRecetaIdProductoId(recetaId, productoculinarioId);
    }

    @Get(':recetaId/productosculinarios')
    @Roles(Role.ADMIN, Role.READONLY)
    async findProductoCulinarioByRecetaId(@Param('recetaId') recetaId: string) {
        return await this.recetaProductoculinarioService.findProductosculinariosByRecetaId(recetaId);
    }

    @Put(':recetaId/productosculinarios')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async associateProductosculinariosReceta(@Param('recetaId') recetaId: string, @Body()productosculinariosDto: ProductoculinarioDto[]){
        const productosculinarios: ProductoculinarioEntity[] = plainToInstance(ProductoculinarioEntity, productosculinariosDto);
        return await this.recetaProductoculinarioService.associateProductoculinarioReceta(recetaId, productosculinarios);
    }

    @Delete(':recetaId/productosculinarios/:productoculinarioId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async deleteProductoculinarioReceta(@Param('recetaId') recetaId: string, @Param('productoculinarioId') productoculinarioId: string) {
        return await this.recetaProductoculinarioService.deleteProductoculinarioReceta(recetaId, productoculinarioId)
    }
}
