/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ProductoculinarioEntity} from "./productoculinario.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductoculinarioService {

    cacheKey: string = "productosculinarios";
    constructor(
        @InjectRepository(ProductoculinarioEntity)
        private readonly productoCulinarioRepository: Repository<ProductoculinarioEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async findAll(): Promise<ProductoculinarioEntity[]> {
        const cached: ProductoculinarioEntity[] = await this.cacheManager.get<ProductoculinarioEntity[]>(this.cacheKey);
      
        if(!cached){
           const productosculinarios: ProductoculinarioEntity[] = await this.productoCulinarioRepository.find({ relations: ["receta"] });
           await this.cacheManager.set(this.cacheKey, productosculinarios);
           return productosculinarios;
        }

       return cached;
    }

    async findOne(id: string): Promise<ProductoculinarioEntity> {
        const productoCulinario: ProductoculinarioEntity = await this.productoCulinarioRepository.findOne({where: {id}, relations: ["receta"] } );
        if (!productoCulinario)
          throw new BusinessLogicException("El producto culinario con el id dado no existe", BusinessError.NOT_FOUND);
   
        return productoCulinario;
    }

    async create(productoCulinario: ProductoculinarioEntity): Promise<ProductoculinarioEntity> {
        return await this.productoCulinarioRepository.save(productoCulinario);
    }

    async update(id: string, productoCulinario: ProductoculinarioEntity): Promise<ProductoculinarioEntity> {
        const persistedProductoCulinario: ProductoculinarioEntity = await this.productoCulinarioRepository.findOne({where:{id}});
        if (!persistedProductoCulinario)
          throw new BusinessLogicException("El producto culinario con el id dado no existe", BusinessError.NOT_FOUND);
        
        return await this.productoCulinarioRepository.save({...persistedProductoCulinario, ...productoCulinario});
    }

    async delete(id: string) {
        const productoCulinario: ProductoculinarioEntity = await this.productoCulinarioRepository.findOne({where:{id}});
        if (!productoCulinario)
          throw new BusinessLogicException("El producto culinario con el id dado no existe", BusinessError.NOT_FOUND);
     
        await this.productoCulinarioRepository.remove(productoCulinario);
    }
}
