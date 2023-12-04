/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PaisService } from './pais.service';
import { PaisEntity } from './pais.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';


describe('PaisService', () => {
  let service: PaisService;
  let repository: Repository<PaisEntity>;
  let paisList: PaisEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [PaisService, PaisEntity],
    }).compile();

    service = module.get<PaisService>(PaisService);
    repository = module.get<Repository<PaisEntity>>(
      getRepositoryToken(PaisEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    paisList = [];
    for (let i = 0; i < 5; i++) {
      const pais: PaisEntity = await repository.save({
        name: faker.location.city(),
        capital: faker.location.city(),
        region: faker.location.state(),
      });
      paisList.push(pais);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all paises', async () => {
    const pais: PaisEntity[] = await service.findAll();
    expect(pais).not.toBeNull();
    expect(pais).toHaveLength(paisList.length);
  });

  it('findOne should return a pais by id', async () => {
    const storedPais: PaisEntity = paisList[0];
    const pais: PaisEntity = await service.findOne(storedPais.id);
    expect(pais).not.toBeNull();
    expect(pais.name).toEqual(storedPais.name);
    expect(pais.capital).toEqual(storedPais.capital);
    expect(pais.region).toEqual(storedPais.region);
  });

 
});
