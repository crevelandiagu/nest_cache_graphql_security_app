/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PaisCiudadService } from './pais-ciudad.service';

describe('PaisCiudadService', () => {
  let service: PaisCiudadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PaisCiudadService],
    }).compile();

    service = module.get<PaisCiudadService>(PaisCiudadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
