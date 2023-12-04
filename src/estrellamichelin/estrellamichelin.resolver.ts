import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { EstrellamichelinEntity } from "./estrellamichelin.entity";
import { EstrellamichelinService } from "./estrellamichelin.service";
import { EstrellamichelinDto } from "./estrellamichelin.dto";
import { plainToInstance } from "class-transformer";

@Resolver()
export class EstrellamichelinResolver {
    constructor(private estrellamichelinService: EstrellamichelinService) {}

    @Query(() => [EstrellamichelinEntity])
    estrellasmichelin(): Promise<EstrellamichelinEntity[]> {
        return this.estrellamichelinService.findAll();
    }

    @Query(() => EstrellamichelinEntity)
    estrellamichelin(@Args('id') id: string): Promise<EstrellamichelinEntity> {
        return this.estrellamichelinService.findOne(id);
    }

    @Mutation(() => EstrellamichelinEntity)
    createEstrellamichelin(@Args('estrellamichelin') estrellamichelinDto: EstrellamichelinDto): Promise<EstrellamichelinEntity> {
        const estrellamichelin = plainToInstance(EstrellamichelinEntity, estrellamichelinDto);
        return this.estrellamichelinService.create(estrellamichelin);
    }

    @Mutation(() => EstrellamichelinEntity)
    updateEstrellamichelin(@Args('id') id: string, @Args('estrellamichelin') estrellamichelinDto: EstrellamichelinDto): Promise<EstrellamichelinEntity> {
        const estrellamichelin = plainToInstance(EstrellamichelinEntity, estrellamichelinDto);
        return this.estrellamichelinService.update(id, estrellamichelin);
    }

    @Mutation(() => String)
    deleteEstrellamichelin(@Args('id') id: string) {
        this.estrellamichelinService.delete(id);
        return id;
    }
}