/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CulturagastronomicaService } from './culturagastronomica.service';
import { CulturagastronomicaEntity } from './culturagastronomica.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';

describe('CulturaGastronomicaService', () => {
  let service: CulturagastronomicaService;
  let repository: Repository<CulturagastronomicaEntity>;
  let culturaGastronomicaList: CulturagastronomicaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [CulturagastronomicaService, CulturagastronomicaEntity],
    }).compile();

    service = module.get<CulturagastronomicaService>(
        CulturagastronomicaService,
    );
    repository = module.get<Repository<CulturagastronomicaEntity>>(
        getRepositoryToken(CulturagastronomicaEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    culturaGastronomicaList = [];
    for (let i = 0; i < 5; i++) {
      const culturaGastronomica: CulturagastronomicaEntity =
          await repository.save({
            nombre: faker.lorem.word(),
            descripcion: faker.lorem.sentence(),
            rereceta: faker.lorem.word(),
          });
      culturaGastronomicaList.push(culturaGastronomica);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all city', async () => {
    const culturaGastronomica: CulturagastronomicaEntity[] =
        await service.findAll();
    expect(culturaGastronomica).not.toBeNull();
    expect(culturaGastronomica).toHaveLength(culturaGastronomicaList.length);
  });

  it('findOne should return a city by id', async () => {
    const storedCulturaGastronomica: CulturagastronomicaEntity =
        culturaGastronomicaList[0];
    const culturaGastronomica: CulturagastronomicaEntity =
        await service.findOne(storedCulturaGastronomica.id);
    expect(culturaGastronomica).not.toBeNull();
    expect(culturaGastronomica.nombre).toEqual(
        storedCulturaGastronomica.nombre,
    );
    expect(culturaGastronomica.descripcion).toEqual(
        storedCulturaGastronomica.descripcion,
    );
  });
});
