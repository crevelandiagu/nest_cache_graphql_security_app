/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RecetaEntity } from './receta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Cache } from 'cache-manager';

@Injectable()
export class RecetaService {

    cacheKey: string = "recetas";

    constructor(
        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async findAll(): Promise<RecetaEntity[]> {
        const cached: RecetaEntity[] = await this.cacheManager.get<RecetaEntity[]>(this.cacheKey);

        if(!cached){
            const recetas: RecetaEntity[] = await this.recetaRepository.find({ relations: ["culturagastronomica", "productoculinario"] });
            await this.cacheManager.set(this.cacheKey, recetas);
            return recetas;
        }
        return cached;
    }

    async findOne(id: string): Promise<RecetaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id}, relations: ["culturagastronomica", "productoculinario"] } );
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND);
   
        return receta;
    }

    async create(receta: RecetaEntity): Promise<RecetaEntity> {
        return await this.recetaRepository.save(receta);
    }

    async update(id: string, receta: RecetaEntity): Promise<RecetaEntity> {
        const persistedReceta: RecetaEntity = await this.recetaRepository.findOne({where:{id}});
        if (!persistedReceta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND);
        
        return await this.recetaRepository.save({...persistedReceta, ...receta});
    }

    async delete(id: string) {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where:{id}});
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND);
     
        await this.recetaRepository.remove(receta);
    }
}
