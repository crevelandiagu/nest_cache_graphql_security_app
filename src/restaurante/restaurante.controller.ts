/* eslint-disable prettier/prettier */

import { Controller, UseInterceptors, Get, Param, Post, Body, Put, Delete, HttpCode, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { BusinessErrorsInterceptor } from "../shared/interceptors/business-errors.interceptor";
import { RestauranteDto } from "./restaurante.dto";
import { RestauranteEntity } from "./restaurante.entity";
import { RestauranteService } from "./restaurante.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/user/roles.guard";
import { Roles } from "src/user/roles.decorator";
import { Role } from "src/user/roles.enum";


@Controller('restaurantes')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestauranteController {

    constructor(private readonly restauranteService: RestauranteService) {

    }

    @Get()
    @Roles(Role.ADMIN, Role.READONLY)
    async findAll() {
        return await this.restauranteService.findAll();
    }

    @Get(':restauranteId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findOne(@Param('restauranteId') restauranteId: string) {
        return await this.restauranteService.findOne(restauranteId);
    }

    @Post()
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async create(@Body() restauranteDto: RestauranteDto) {
        const restaurante : RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.create(restaurante);
    }

    @Put(':restauranteId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async update(@Param('restauranteId')restauranteId: string, @Body() restauranteDto: RestauranteDto) {
        const restaurante : RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return await this.restauranteService.update(restauranteId,  restaurante);

    }

    @Delete(':restauranteId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async delete(@Param('restauranteId') restauranteId: string) {
        return await this.restauranteService.delete(restauranteId);
    }
    
}
