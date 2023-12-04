/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { EstrellamichelinService } from './estrellamichelin.service';
import { EstrellamichelinDto } from './estrellamichelin.dto';
import { EstrellamichelinEntity } from './estrellamichelin.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { RolesGuard } from 'src/user/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/user/roles.enum';
import { Roles } from 'src/user/roles.decorator';

@Controller('estrellasmichelin')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstrellamichelinController {

    constructor(private readonly estrellamichelinService: EstrellamichelinService) {

    }

    @Get()
    @Roles(Role.ADMIN, Role.READONLY)
    async findAll() {
        return this.estrellamichelinService.findAll();
    }

    @Get(':estrellamichelinId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findOne(@Param('estrellamichelinId') estrellamichelinId: string) {
       return this.estrellamichelinService.findOne(estrellamichelinId);

    }

    @Post()
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async create(@Body() estrellamichelinDto: EstrellamichelinDto) {
        const estrellamichellin: EstrellamichelinEntity = plainToInstance(EstrellamichelinEntity, estrellamichelinDto);
        return this.estrellamichelinService.create(estrellamichellin);
    }

    @Put(':estrellamichelinId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async update(@Param('estrellamichelinId') estrellamichelinId: string, @Body() estrellamichelinDto: EstrellamichelinDto) {
        const estrellamichellin: EstrellamichelinEntity = plainToInstance(EstrellamichelinEntity, estrellamichelinDto);
        return this.estrellamichelinService.update(estrellamichelinId, estrellamichellin);
    }

    @Delete(':estrellamichelinId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async delete(@Param('estrellamichelinId') estrellamichelinId: string) {
        return this.estrellamichelinService.delete(estrellamichelinId);
    }
}
