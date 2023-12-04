/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CulturagastronomicaEntity} from "../culturagastronomica/culturagastronomica.entity";
import { RecetaEntity } from '../receta/receta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CulturaGastronomicaRecetaService {

    cacheKey: string = "culturagastronomicaRecetas";
    constructor(
        @InjectRepository(CulturagastronomicaEntity)
        private readonly culturaGastronomicaRepository: Repository<CulturagastronomicaEntity>,

        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async addRecetaCulturaGastronomica(culturaGastronomicaId: string, recetaId: string): Promise<CulturagastronomicaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}});
        if (!receta)
            throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND);

        const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaGastronomicaId}, relations: ["receta", "pais", "restaurante"]})

        if (!culturaGastronomica)
            throw new BusinessLogicException("La cultura gastrononimca con el id dado no existe", BusinessError.NOT_FOUND);

        culturaGastronomica.receta = [...culturaGastronomica.receta, receta];
        return await this.culturaGastronomicaRepository.save(culturaGastronomica);
    }

    async findRecetaByCulturaGastronomicaIdRecetaId(culturaGastronomicaId: string, recetaId: string): Promise<RecetaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}});
        if (!receta)
            throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)

        const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaGastronomicaId}, relations: ["receta", "pais", "restaurante"]});
        if (!culturaGastronomica)
            throw new BusinessLogicException("La cultura gastrononimca con el id dado no existe", BusinessError.NOT_FOUND)

        const culturaGastronomicaReceta: RecetaEntity = culturaGastronomica.receta.find(e => e.id === receta.id);

        if (!culturaGastronomicaReceta)
            throw new BusinessLogicException("La recete con el id dado no está asociada con la cultura gastronomica", BusinessError.PRECONDITION_FAILED)

        return culturaGastronomicaReceta;
    }

    async findRecetasByCulturaGastronomica(culturaGastronomicaId: string): Promise<RecetaEntity[]> {
        const cached: CulturagastronomicaEntity = await this.cacheManager.get<CulturagastronomicaEntity>(this.cacheKey);

        if(!cached){
            const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaGastronomicaId}, relations: ["receta", "pais", "restaurante"]});
            if (!culturaGastronomica)
                throw new BusinessLogicException("La cultura gastrononimca con el id dado no existe", BusinessError.NOT_FOUND)

            await this.cacheManager.set(this.cacheKey, culturaGastronomica);
            return culturaGastronomica.receta;
        }
        return cached.receta;
    }

    async associateRecetaCulturaGastronomica(culturaGastronomicaId: string, recetas: RecetaEntity[]): Promise<CulturagastronomicaEntity> {
        const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaGastronomicaId}, relations: ["receta", "pais", "restaurante"]});

        if (!culturaGastronomica)
            throw new BusinessLogicException("La cultura gastrononimca con el id dado no existe", BusinessError.NOT_FOUND)

        for (let i = 0; i < recetas.length; i++) {
            const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetas[i].id}});
            if (!receta)
                throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)
        }

        culturaGastronomica.receta = recetas;
        return await this.culturaGastronomicaRepository.save(culturaGastronomica);
    }

    async deleteRecetaCulturaGastronomica(culturaGastronomicaId: string, recetaId: string){
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}});
        if (!receta)
            throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)

        const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne(
            {where: {id: culturaGastronomicaId}, relations: ["receta", "pais", "restaurante"]});
        if (!culturaGastronomica)
            throw new BusinessLogicException("La cultura gastrononimca con el id dado no existe", BusinessError.NOT_FOUND)

        const culturaGastronomicaReceta: RecetaEntity = culturaGastronomica.receta.find(e => e.id === receta.id);

        if (!culturaGastronomicaReceta)
            throw new BusinessLogicException("La recete con el id dado no está asociada con la cultura gastronomica", BusinessError.PRECONDITION_FAILED)

        culturaGastronomica.receta = culturaGastronomica.receta.filter(e => e.id !== recetaId);
        await this.culturaGastronomicaRepository.save(culturaGastronomica);
    }
}
