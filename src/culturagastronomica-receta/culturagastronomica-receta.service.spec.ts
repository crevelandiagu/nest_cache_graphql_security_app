/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { CacheModule } from '@nestjs/common';

describe('CulturaGastronomicaRecetaService', () => {
  let service: CulturaGastronomicaRecetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [CulturaGastronomicaRecetaService],
    }).compile();

    service = module.get<CulturaGastronomicaRecetaService>(
        CulturaGastronomicaRecetaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
