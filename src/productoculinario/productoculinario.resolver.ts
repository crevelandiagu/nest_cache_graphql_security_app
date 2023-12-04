import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { ProductoculinarioEntity } from "./productoculinario.entity";
import { ProductoculinarioService } from "./productoculinario.service";
import { ProductoculinarioDto } from "./productoculinario.dto";
import { plainToInstance } from "class-transformer";

@Resolver()
export class ProductoculinarioResolver {
    constructor(private productoculinarioService: ProductoculinarioService) {}

    @Query(() => [ProductoculinarioEntity])
    productosculinarios(): Promise<ProductoculinarioEntity[]> {
        return this.productoculinarioService.findAll();
    }

    @Query(() => ProductoculinarioEntity)
    productoculinario(@Args('id') id: string): Promise<ProductoculinarioEntity> {
        return this.productoculinarioService.findOne(id);
    }

    @Mutation(() => ProductoculinarioEntity)
    createProductoculinario(@Args('productoculinario') productoculinarioDto: ProductoculinarioDto): Promise<ProductoculinarioEntity> {
        const productoculinario = plainToInstance(ProductoculinarioEntity, productoculinarioDto);
        return this.productoculinarioService.create(productoculinario);
    }

    @Mutation(() => ProductoculinarioEntity)
    updateProductoculinario(@Args('id') id: string, @Args('productoculinario') productoculinarioDto: ProductoculinarioDto): Promise<ProductoculinarioEntity> {
        const productoculinario = plainToInstance(ProductoculinarioEntity, productoculinarioDto);
        return this.productoculinarioService.update(id, productoculinario);
    }

    @Mutation(() => String)
    deleteProductoculinario(@Args('id') id: string) {
        this.productoculinarioService.delete(id);
        return id;
    }
}