/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoculinarioEntity } from '../productoculinario/productoculinario.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class RecetaProductoculinarioService {

    cacheKey: string = "recetasproductos";
    constructor(
        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>,
    
        @InjectRepository(ProductoculinarioEntity)
        private readonly productoculinarioRepository: Repository<ProductoculinarioEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async addProductoculinarioReceta(recetaId: string, productoculinarioId: string): Promise<RecetaEntity> {
        const productoculinario: ProductoculinarioEntity = await this.productoculinarioRepository.findOne({where: {id: productoculinarioId}});
        if (!productoculinario)
          throw new BusinessLogicException("El producto con el id dado no existe", BusinessError.NOT_FOUND);
      
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}, relations: ["culturagastronomica", "productoculinario"]})
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND);
    
        receta.productoculinario = [...receta.productoculinario, productoculinario];
        return await this.recetaRepository.save(receta);
      }
    
    async findProductoCulinarioByRecetaIdProductoId(recetaId: string, productoculinarioId: string): Promise<ProductoculinarioEntity> {
        const productoculinario: ProductoculinarioEntity = await this.productoculinarioRepository.findOne({where: {id: productoculinarioId}});
        if (!productoculinario)
          throw new BusinessLogicException("El producto con el id dado no existe", BusinessError.NOT_FOUND)
       
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}, relations: ["culturagastronomica", "productoculinario"]});
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)
   
        const recetaProducto: ProductoculinarioEntity = receta.productoculinario.find(e => e.id === productoculinario.id);
   
        if (!recetaProducto)
          throw new BusinessLogicException("El producto con el id dado no está asociado a la receta", BusinessError.PRECONDITION_FAILED)
   
        return recetaProducto;
    }
    
    async findProductosculinariosByRecetaId(recetaId: string): Promise<ProductoculinarioEntity[]> {
      const cached: RecetaEntity = await this.cacheManager.get<RecetaEntity>(this.cacheKey);
      
      if(!cached){
        
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}, relations: ["culturagastronomica", "productoculinario"]});
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)
        
        await this.cacheManager.set(this.cacheKey, receta);
        return receta.productoculinario;
      }
      return cached.productoculinario;
    }
    
    async associateProductoculinarioReceta(recetaId: string, productosculinarios: ProductoculinarioEntity[]): Promise<RecetaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}, relations: ["culturagastronomica", "productoculinario"]});
    
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < productosculinarios.length; i++) {
          const productoculinario: ProductoculinarioEntity = await this.productoculinarioRepository.findOne({where: {id: productosculinarios[i].id}});
          if (!productoculinario)
            throw new BusinessLogicException("El producto con el id dado no existe", BusinessError.NOT_FOUND)
        }
    
        receta.productoculinario = productosculinarios;
        return await this.recetaRepository.save(receta);
      }
    
    async deleteProductoculinarioReceta(recetaId: string, productoculinarioId: string){
        const productoculinario: ProductoculinarioEntity = await this.productoculinarioRepository.findOne({where: {id: productoculinarioId}});
        if (!productoculinario)
          throw new BusinessLogicException("el producto con el id dado no existe", BusinessError.NOT_FOUND)
    
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}, relations: ["culturagastronomica", "productoculinario"]});
        if (!receta)
          throw new BusinessLogicException("La receta con el id dado no existe", BusinessError.NOT_FOUND)
    
        const recetaProducto: ProductoculinarioEntity = receta.productoculinario.find(e => e.id === productoculinario.id);
    
        if (!recetaProducto)
            throw new BusinessLogicException("El producto con el id dado no está asociado a la receta", BusinessError.PRECONDITION_FAILED)
 
        receta.productoculinario = receta.productoculinario.filter(e => e.id !== productoculinarioId);
        await this.recetaRepository.save(receta);
    }
}
