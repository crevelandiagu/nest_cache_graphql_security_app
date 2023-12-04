/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestauranteEstrellamichelinService } from './restaurante-estrellamichelin.service';
import { EstrellamichelinDto } from 'src/estrellamichelin/estrellamichelin.dto';
import { EstrellamichelinEntity } from 'src/estrellamichelin/estrellamichelin.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/user/roles.guard';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/roles.enum';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('restaurantes')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BusinessErrorsInterceptor)
export class RestauranteEstrellamichelinController {

    constructor(private restauranteEstrellamichelinService: RestauranteEstrellamichelinService) {

    }

    @Post(':restauranteId/estrellasmichelin/:estrellamichelinId')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async addEstrellamichellinRestaurante(@Param('restauranteId') restauranteId: string, @Param('estrellamichelinId') estrellamichelinId: string) {
        return await this.restauranteEstrellamichelinService.addEstrellamichelinRestaurante(restauranteId, estrellamichelinId);
    }

    @Get(':restauranteId/estrellasmichelin/:estrellamichelinId')
    @Roles(Role.ADMIN, Role.READONLY)
    async findEstrellamichelinByRestauranteIdEstrellamichelinId(@Param('restauranteId') restauranteId: string, @Param('estrellamichelinId') estrellamichelinId: string) {
        return await this.restauranteEstrellamichelinService.findEstrellamichelinByRestauranteIdEstrellaId(restauranteId, estrellamichelinId);
    }

    @Get(':restauranteId/estrellasmichelin')
    @Roles(Role.ADMIN, Role.READONLY)
    async findEstrellasmichelinByRestauranteId(@Param('restauranteId') restauranteId: string){
        return await this.restauranteEstrellamichelinService.findEstrellasByRestauranteId(restauranteId);

    }

    @Put(':restauranteId/estrellasmichelin')
    @Roles(Role.ADMIN, Role.WRTITEONLY)
    async associateEstrellasmichelinRestaurante(@Param('restauranteId')restauranteId: string, @Body() estrellasmichellinDto: EstrellamichelinDto[]) {
        const estrellasmichelin: EstrellamichelinEntity[] =  plainToInstance(EstrellamichelinEntity, estrellasmichellinDto);
        return await this.restauranteEstrellamichelinService.associateEstrellasRestaurante(restauranteId, estrellasmichelin);
    }

    @Delete(':restauranteId/estrellasmichelin/:estrellamichelinId')
    @HttpCode(204)
    @Roles(Role.ADMIN, Role.DELETEONLY)
    async deleteEstrellamichellinRestaurante(@Param('restauranteId') restauranteId: string, @Param('estrellamichelinId') estrellamichelinId: string) {
        return await this.restauranteEstrellamichelinService.deleteEstrellaRestaurante(restauranteId, estrellamichelinId);
    }
}
