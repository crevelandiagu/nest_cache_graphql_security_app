/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RecetaProductoculinarioService } from './receta-productoculinario.service';
import { CacheModule } from '@nestjs/common';

describe('RecetaProductoculinarioService', () => {
  let service: RecetaProductoculinarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [RecetaProductoculinarioService],
    }).compile();

    service = module.get<RecetaProductoculinarioService>(
      RecetaProductoculinarioService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

