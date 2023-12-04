/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CulturagastronomicaEntity} from "./culturagastronomica.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Cache } from 'cache-manager';

@Injectable()
export class CulturagastronomicaService {

    cacheKey: string = "culturasgastronomicas";
    constructor(
        @InjectRepository(CulturagastronomicaEntity)
        private readonly culturaGastronomicaRepository: Repository<CulturagastronomicaEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async findAll(): Promise<CulturagastronomicaEntity[]> {
        const cached: CulturagastronomicaEntity[] = await this.cacheManager.get<CulturagastronomicaEntity[]>(this.cacheKey);

        if(!cached){
            const culturasgastronomicas: CulturagastronomicaEntity[] = await this.culturaGastronomicaRepository.find({ relations: ["pais", "receta", "restaurante"] });
            await this.cacheManager.set(this.cacheKey, culturasgastronomicas);
            return culturasgastronomicas;
        }
        return cached;
    }

    async findOne(id: string): Promise<CulturagastronomicaEntity> {
        const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id}, relations: ["pais", "receta", "restaurante"] } );
        if (!culturaGastronomica)
            throw new BusinessLogicException("La cultura gastronómica con el id dado no existe", BusinessError.NOT_FOUND);

        return culturaGastronomica;
    }

    async create(culturaGastronomica: CulturagastronomicaEntity): Promise<CulturagastronomicaEntity> {
        return await this.culturaGastronomicaRepository.save(culturaGastronomica);
    }

    async update(id: string, culturaGastronomica: CulturagastronomicaEntity): Promise<CulturagastronomicaEntity> {
        const persistedCulturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where:{id}});
        if (!persistedCulturaGastronomica)
            throw new BusinessLogicException("La cultura gastronómica con el id dado no existe", BusinessError.NOT_FOUND);

        return await this.culturaGastronomicaRepository.save({...persistedCulturaGastronomica, ...culturaGastronomica});
    }

    async delete(id: string) {
        const culturaGastronomica: CulturagastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where:{id}});
        if (!culturaGastronomica)
            throw new BusinessLogicException("La cultura gastronómica con el id dado no existe", BusinessError.NOT_FOUND);

        await this.culturaGastronomicaRepository.remove(culturaGastronomica);
    }
}
