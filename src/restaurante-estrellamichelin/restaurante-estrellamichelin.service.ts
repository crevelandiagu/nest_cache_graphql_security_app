/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstrellamichelinEntity } from '../estrellamichelin/estrellamichelin.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class RestauranteEstrellamichelinService {

    cacheKey: string = "restauranteestrellas";
    constructor(
        @InjectRepository(RestauranteEntity)
        private readonly restauranteRepository: Repository<RestauranteEntity>,
    
        @InjectRepository(EstrellamichelinEntity)
        private readonly estrellamichelinRepository: Repository<EstrellamichelinEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async addEstrellamichelinRestaurante(restauranteId: string, estrellamichelinId: string): Promise<RestauranteEntity> {
        const estrellamichelin: EstrellamichelinEntity = await this.estrellamichelinRepository.findOne({where: {id: estrellamichelinId}});
        if (!estrellamichelin)
          throw new BusinessLogicException("La estrella con el id dado no existe", BusinessError.NOT_FOUND);
      
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["culturagastronomica", "pais", "estrellamichelin"]})
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND);
    
        restaurante.estrellamichelin = [...restaurante.estrellamichelin, estrellamichelin];
        return await this.restauranteRepository.save(restaurante);
      }
    
    async findEstrellamichelinByRestauranteIdEstrellaId(restauranteId: string, estrellamichelinId: string): Promise<EstrellamichelinEntity> {
        const estrellamichelin: EstrellamichelinEntity = await this.estrellamichelinRepository.findOne({where: {id: estrellamichelinId}});
        if (!estrellamichelin)
          throw new BusinessLogicException("La estella con el id dado no existe", BusinessError.NOT_FOUND)
       
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["culturagastronomica", "pais", "estrellamichelin"]});
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND)
   
        const restauranteEstrella: EstrellamichelinEntity = restaurante.estrellamichelin.find(e => e.id === estrellamichelin.id);
   
        if (!restauranteEstrella)
          throw new BusinessLogicException("La estrella con el id dado no está asociada con el restaurante dado", BusinessError.PRECONDITION_FAILED)
   
        return restauranteEstrella;
    }
    
    async findEstrellasByRestauranteId(restauranteId: string): Promise<EstrellamichelinEntity[]> {
      const cached: RestauranteEntity = await this.cacheManager.get<RestauranteEntity>(this.cacheKey);
      
      if(!cached){
      
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["culturagastronomica", "pais", "estrellamichelin"]});
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND)
       
        return restaurante.estrellamichelin;
      }
      return cached.estrellamichelin;
    }
    
    async associateEstrellasRestaurante(restauranteId: string, estrellasmichelin: EstrellamichelinEntity[]): Promise<RestauranteEntity> {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["culturagastronomica", "pais", "estrellamichelin"]});
    
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < estrellasmichelin.length; i++) {
          const estrellamichelin: EstrellamichelinEntity = await this.estrellamichelinRepository.findOne({where: {id: estrellasmichelin[i].id}});
          if (!estrellamichelin)
            throw new BusinessLogicException("La estrella con el id dado no existe", BusinessError.NOT_FOUND)
        }
    
        restaurante.estrellamichelin = estrellasmichelin;
        return await this.restauranteRepository.save(restaurante);
      }
    
    async deleteEstrellaRestaurante(restauranteId: string, estrellamichelinId: string){
        const estrellamichelin: EstrellamichelinEntity = await this.estrellamichelinRepository.findOne({where: {id: estrellamichelinId}});
        if (!estrellamichelin)
          throw new BusinessLogicException("La estrella con el id dado no existe", BusinessError.NOT_FOUND)
    
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["culturagastronomica", "pais", "estrellamichelin"]});
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id dado no existe", BusinessError.NOT_FOUND)
    
        const restauranteEstrella: EstrellamichelinEntity = restaurante.estrellamichelin.find(e => e.id === estrellamichelinId);
    
        if (!restauranteEstrella)
            throw new BusinessLogicException("La estrella con el id dado no está asociada con este restaurante", BusinessError.PRECONDITION_FAILED)
 
        restaurante.estrellamichelin = restaurante.estrellamichelin.filter(e => e.id !== estrellamichelinId);
        await this.restauranteRepository.save(restaurante);
    }
}
