/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductoculinarioService } from './productoculinario.service';
import { ProductoculinarioDto } from './productoculinario.dto';
import { ProductoculinarioEntity } from './productoculinario.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../user/roles.guard';
import { Role } from '../user/roles.enum';
import { Roles } from '../user/roles.decorator';

@Controller('productosculinarios')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductoculinarioController {

    constructor (private readonly productoculinarioService: ProductoculinarioService) {

    }

    @Get()
    @Roles(Role.ADMIN, Role.READONLY)
    async findAll() {
        return await this.productoculinarioService.findAll();
    }

    @Get(':productoculinarioId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findOne(@Param('productoculinarioId') productoculinarioId: string) {
        return await this.productoculinarioService.findOne(productoculinarioId);
    }

    @Post()
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async create(@Body() productoculinarioDto: ProductoculinarioDto) {
        const productoculinario : ProductoculinarioEntity = plainToInstance(ProductoculinarioEntity, productoculinarioDto);
        return await this.productoculinarioService.create(productoculinario);
    }

    @Put(':productoculinarioId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async update(@Param('productoculinarioId') productoculinarioId: string, @Body() productoculinarioDto: ProductoculinarioDto){
        const productoculinario : ProductoculinarioEntity = plainToInstance(ProductoculinarioEntity, productoculinarioDto);
        return await this.productoculinarioService.update(productoculinarioId, productoculinario);
    }

    @Delete(':productoculinarioId')
    @Roles(Role.ADMIN, Role.DELETEONLY)
    @HttpCode(204)
    async delete(@Param('productoculinarioId')prodcuctoculinarioId: string) {
        return await this.productoculinarioService.delete(prodcuctoculinarioId);
    }



}
