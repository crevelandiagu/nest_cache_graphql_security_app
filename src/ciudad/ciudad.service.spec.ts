/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from './ciudad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { PaisEntity } from '../pais/pais.entity';
import { CacheModule } from '@nestjs/common';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<CiudadEntity>;
  let ciudadList: CiudadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [CiudadService, CiudadEntity],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<CiudadEntity>>(
        getRepositoryToken(CiudadEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    ciudadList = [];
    for (let i = 0; i < 5; i++) {
      const city: CiudadEntity = await repository.save({
        name: faker.location.city(),
        description: faker.lorem.sentence(),
      });
      ciudadList.push(city);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all city', async () => {
    const ciudad: CiudadEntity[] = await service.findAll();
    expect(ciudad).not.toBeNull();
    expect(ciudad).toHaveLength(ciudadList.length);
  });

  it('findOne should return a city by id', async () => {
    const storedCiudad: CiudadEntity = ciudadList[0];
    const ciudad: CiudadEntity = await service.findOne(storedCiudad.id);
    expect(ciudad).not.toBeNull();
    expect(ciudad.name).toEqual(storedCiudad.name);
    expect(ciudad.description).toEqual(storedCiudad.description);
  });

  it('create should return a new city', async () => {
    const ciudad: CiudadEntity = {
      id: '',
      name: faker.location.city(),
      description: faker.lorem.sentence(),
      pais: new PaisEntity(),
    };

    const newCiudad: CiudadEntity = await service.create(ciudad);
    expect(newCiudad).not.toBeNull();

    const storedCiudad: CiudadEntity = await repository.findOne({
      where: { id: newCiudad.id },
    });
    expect(storedCiudad).not.toBeNull();
    expect(storedCiudad.name).toEqual(newCiudad.name);
    expect(storedCiudad.description).toEqual(newCiudad.description);
  });
});