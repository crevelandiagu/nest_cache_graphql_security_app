/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisDto } from './pain.dto';
import { PaisEntity } from './pais.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/user/roles.guard';
import { Role } from 'src/user/roles.enum';
import { Roles } from 'src/user/roles.decorator';

@Controller('paises')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaisController {

    constructor(private readonly paisService: PaisService) {

    }

    @Get()
    @Roles(Role.ADMIN, Role.READONLY)
    async findAll(){
        return await this.paisService.findAll();
    }

    @Get(':paisId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findOne(@Param('paisId') paisId: string) {
        return await this.paisService.findOne(paisId);
    }

    @Post()
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async create(@Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.create(pais);

    }

    @Put(':paisId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async update(@Param('paisId') paisId: string , @Body() paisDto: PaisDto ) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.update(paisId, pais);

    }

    @Delete(':paisId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async delete(@Param('paisId') paisId: string) {
        return await this.paisService.delete(paisId);
    }

}


