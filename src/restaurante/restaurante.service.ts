/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RestauranteEntity } from './restaurante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Cache } from 'cache-manager';

@Injectable()
export class RestauranteService {

    cacheKey: string = "restaurantes";
    constructor(
        @InjectRepository(RestauranteEntity)
        private readonly restauranteRepository: Repository<RestauranteEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async findAll(): Promise<RestauranteEntity[]> {
        
        const cached: RestauranteEntity[] = await this.cacheManager.get<RestauranteEntity[]>(this.cacheKey);
      
       if(!cached){
           const restaurante: RestauranteEntity[] = await this.restauranteRepository.find({ relations: ["estrellamichelin", "culturagastronomica", "pais"] });
           await this.cacheManager.set(this.cacheKey, restaurante);
           return restaurante;
       }

       return cached;
    }

    async findOne(id: string): Promise<RestauranteEntity> {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id}, relations: ["estrellamichelin", "culturagastronomica", "pais"] } );

        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND);
   
        return restaurante;
    }

    async create(restaurante: RestauranteEntity): Promise<RestauranteEntity> {
        return await this.restauranteRepository.save(restaurante);
    }

    async update(id: string, restaurante: RestauranteEntity): Promise<RestauranteEntity> {
        const persistedRestaurante: RestauranteEntity = await this.restauranteRepository.findOne({where:{id}});
        if (!persistedRestaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND);
        
        return await this.restauranteRepository.save({...persistedRestaurante, ...restaurante});
    }

    async delete(id: string) {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where:{id}});
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND);
     
        await this.restauranteRepository.remove(restaurante);
    }
}
