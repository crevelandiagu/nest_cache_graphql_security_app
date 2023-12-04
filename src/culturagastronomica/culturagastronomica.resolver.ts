import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { CulturagastronomicaEntity } from "./culturagastronomica.entity";
import { CulturagastronomicaService } from "./culturagastronomica.service";
import { CulturagastronomicaDto } from "./culturagastronomica.dto";
import { plainToInstance } from "class-transformer";

@Resolver()
export class CulturagastronomicaResolver {
    constructor(private culturaGastronomicaService: CulturagastronomicaService) {}

    @Query(() => [CulturagastronomicaEntity])
    culturasGastronomicas(): Promise<CulturagastronomicaEntity[]> {
        return this.culturaGastronomicaService.findAll();
    }

    @Query(() => CulturagastronomicaEntity)
    culturaGastronomica(@Args('id') id: string): Promise<CulturagastronomicaEntity> {
        return this.culturaGastronomicaService.findOne(id);
    }

    @Mutation(() => CulturagastronomicaEntity)
    createCulturaGastronomica(@Args('culturaGastronomica') culturagastronomicaDto: CulturagastronomicaDto): Promise<CulturagastronomicaEntity> {
        const culturaGastronomica = plainToInstance(CulturagastronomicaEntity, culturagastronomicaDto);
        return this.culturaGastronomicaService.create(culturaGastronomica);
    }

    @Mutation(() => CulturagastronomicaEntity)
    updateCulturaGastronomica(@Args('id') id: string, @Args('culturaGastronomica') culturagastronomicaDto: CulturagastronomicaDto): Promise<CulturagastronomicaEntity> {
        const culturaGastronomica = plainToInstance(CulturagastronomicaEntity, culturagastronomicaDto);
        return this.culturaGastronomicaService.update(id, culturaGastronomica);
    }

    @Mutation(() => String)
    deleteCulturaGastronomica(@Args('id') id: string) {
        this.culturaGastronomicaService.delete(id);
        return id;
    }
}
