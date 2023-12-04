/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RestauranteService } from './restaurante.service';
import { RestauranteEntity } from './restaurante.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';
import { RestauranteResolver } from './restaurante.resolver';

describe('RestauranteService', () => {
  let service: RestauranteService;
  let repository: Repository<RestauranteEntity>;
  let restauranteList: RestauranteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [RestauranteService],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    repository = module.get<Repository<RestauranteEntity>>(
      getRepositoryToken(RestauranteEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    restauranteList = [];
    for (let i = 0; i < 5; i++) {
      const restaurante: RestauranteEntity = await repository.save({
        name: faker.person.firstName(),
        pais: null,
        ciudad: faker.location.city(),
        estrellamichelin: null,
        culturagastronomica: null,
      });
      restauranteList.push(restaurante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all restaurante', async () => {
    const restaurante: RestauranteEntity[] = await service.findAll();
    expect(restaurante).not.toBeNull();
    expect(restaurante).toHaveLength(restauranteList.length);
  });

  it('findOne should return a restaurante by id', async () => {
    const storedRestaurante: RestauranteEntity = restauranteList[0];
    const restaurante: RestauranteEntity = await service.findOne(
      storedRestaurante.id,
    );
    expect(restaurante).not.toBeNull();
    expect(restaurante.name).toEqual(storedRestaurante.name);
    expect(restaurante.ciudad).toEqual(storedRestaurante.ciudad);
    //expect(restaurante.culturagastronomica).toEqual(storedRestaurante.culturagastronomica);
  });

  it('create should return a new restaurante', async () => {
    const restaurante: RestauranteEntity = {
      id: '',
      name: faker.person.firstName(),
      pais: null,
      ciudad: faker.location.city(),
      estrellamichelin: [],
      culturagastronomica: [],
    };

    const newRestaurante: RestauranteEntity = await service.create(restaurante);
    expect(newRestaurante).not.toBeNull();

    const storedRestaurante: RestauranteEntity = await repository.findOne({
      where: { id: newRestaurante.id },
    });
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante.name).toEqual(newRestaurante.name);
    expect(storedRestaurante.ciudad).toEqual(newRestaurante.ciudad);
  });
});
