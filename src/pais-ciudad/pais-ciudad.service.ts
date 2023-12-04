/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { PaisEntity } from '../pais/pais.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PaisCiudadService {

    constructor(
        @InjectRepository(PaisEntity)
        private readonly paisRepository: Repository<PaisEntity>,
    
        @InjectRepository(CiudadEntity)
        private readonly ciudadRepository: Repository<CiudadEntity>
    ) {}

    async addCiudadPais(paisId: string, ciudadId: string): Promise<PaisEntity> {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudadId}});
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con el id dado no existe", BusinessError.NOT_FOUND);
      
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturagastronomica", "restaurante", "ciudad"]})
        if (!pais)
          throw new BusinessLogicException("El país con el id dado no existe", BusinessError.NOT_FOUND);
    
          console.log(typeof pais.ciudad);
          pais.ciudad = [...pais.ciudad, ciudad];
        return await this.paisRepository.save(pais);
      }
    
    async findCiudadByPaisIdCiudadId(paisId: string, ciudadId: string): Promise<CiudadEntity> {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudadId}});
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con el id dado no existe", BusinessError.NOT_FOUND)
       
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturagastronomica", "restaurante", "ciudad"]});
        if (!pais)
          throw new BusinessLogicException("El país con el id dado no existe", BusinessError.NOT_FOUND)
   
        const paisCiudad: CiudadEntity = pais.ciudad.find(e => e.id === ciudad.id);
   
        if (!paisCiudad)
          throw new BusinessLogicException("La ciudad con el id dado no está asociada con el país", BusinessError.PRECONDITION_FAILED)
   
        return paisCiudad;
    }
    
    async findCiudadByPaisId(paisId: string): Promise<CiudadEntity[]> {
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturagastronomica", "restaurante", "ciudad"]});
        if (!pais)
          throw new BusinessLogicException("El país con el id dado no existe", BusinessError.NOT_FOUND)
       
        return pais.ciudad;
    }
    
    async associateCiudadesPais(paisId: string, ciudades: CiudadEntity[]): Promise<PaisEntity> {
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturagastronomica", "restaurante", "ciudad"]});
    
        if (!pais)
          throw new BusinessLogicException("El país con el id dado no existe", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < ciudades.length; i++) {
          const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudades[i].id}});
          if (!ciudad)
            throw new BusinessLogicException("La ciudad con el id dado no existe", BusinessError.NOT_FOUND)
        }
    
        pais.ciudad = ciudades;
        return await this.paisRepository.save(pais);
      }
    
    async deleteCiudadPais(paisId: string, ciudadId: string){
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudadId}});
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con el id dado no existe", BusinessError.NOT_FOUND)
    
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturagastronomica", "restaurante", "ciudad"]});
        if (!pais)
          throw new BusinessLogicException("El país con el id dado no existe", BusinessError.NOT_FOUND)
    
        const paisCiudad: CiudadEntity = pais.ciudad.find(e => e.id === ciudad.id);
    
        if (!paisCiudad)
            throw new BusinessLogicException("La ciudad con el id dado no está asocida al país", BusinessError.PRECONDITION_FAILED)
 
        pais.ciudad = pais.ciudad.filter(e => e.id !== ciudadId);
        await this.paisRepository.save(pais);
    }
}
