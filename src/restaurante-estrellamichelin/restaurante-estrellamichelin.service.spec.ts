/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RestauranteEstrellamichelinService } from './restaurante-estrellamichelin.service';
import { CacheModule } from '@nestjs/common';

describe('RestauranteEstrellamichelinService', () => {
  let service: RestauranteEstrellamichelinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [RestauranteEstrellamichelinService],
    }).compile();

    service = module.get<RestauranteEstrellamichelinService>(
      RestauranteEstrellamichelinService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
