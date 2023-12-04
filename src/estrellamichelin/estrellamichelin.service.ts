/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EstrellamichelinEntity } from './estrellamichelin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Cache } from 'cache-manager';

@Injectable()
export class EstrellamichelinService {

    cacheKey: string = "estrellasmichelin";
    constructor(
        @InjectRepository(EstrellamichelinEntity)
        private readonly estrellaMichelinRepository: Repository<EstrellamichelinEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async findAll(): Promise<EstrellamichelinEntity[]> {
        
        const cached: EstrellamichelinEntity[] = await this.cacheManager.get<EstrellamichelinEntity[]>(this.cacheKey);
      
        if(!cached){
           const estrellamichelin: EstrellamichelinEntity[] = await this.estrellaMichelinRepository.find({ relations: ["restaurante"] });
           await this.cacheManager.set(this.cacheKey, estrellamichelin);
           return estrellamichelin;
        }

       return cached;
    }

    async findOne(id: string): Promise<EstrellamichelinEntity> {
        const estrellamichelin: EstrellamichelinEntity = await this.estrellaMichelinRepository.findOne({where: {id}, relations: ["restaurante"] } );
        if (!estrellamichelin){
          throw new BusinessLogicException("La estrella dada no existe", BusinessError.NOT_FOUND);
        }
        //console.log(`variable ${estrellamichelin.calificacion}`)
        return estrellamichelin;
    }

    async create(estrellaMichelin: EstrellamichelinEntity): Promise<EstrellamichelinEntity> {
        return await this.estrellaMichelinRepository.save(estrellaMichelin);
    }

    async update(id: string, estrellaMichelin: EstrellamichelinEntity): Promise<EstrellamichelinEntity> {
        const persistedEstrellaMichelin: EstrellamichelinEntity = await this.estrellaMichelinRepository.findOne({where:{id}});
        if (!persistedEstrellaMichelin)
          throw new BusinessLogicException("La estrella dada no existe", BusinessError.NOT_FOUND);
        
        return await this.estrellaMichelinRepository.save({...persistedEstrellaMichelin, ...estrellaMichelin});
    }

    async delete(id: string) {
        const estrellaMichelin: EstrellamichelinEntity = await this.estrellaMichelinRepository.findOne({where:{id}});
        if (!estrellaMichelin)
          throw new BusinessLogicException("La estrella dada no existe", BusinessError.NOT_FOUND);
     
        await this.estrellaMichelinRepository.remove(estrellaMichelin);
    }

    
}
