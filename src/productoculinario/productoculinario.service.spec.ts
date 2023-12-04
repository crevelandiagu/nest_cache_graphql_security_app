/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoculinarioService } from './productoculinario.service';
import { ProductoculinarioEntity } from './productoculinario.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';

describe('ProductoCulinarioService', () => {
  let service: ProductoculinarioService;
  let repository: Repository<ProductoculinarioEntity>;
  let productoCulinarioList: ProductoculinarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [ProductoculinarioService, ProductoculinarioEntity],
    }).compile();

    service = module.get<ProductoculinarioService>(ProductoculinarioService);
    repository = module.get<Repository<ProductoculinarioEntity>>(
      getRepositoryToken(ProductoculinarioEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    productoCulinarioList = [];
    for (let i = 0; i < 5; i++) {
      const productoCulinario: ProductoculinarioEntity = await repository.save({
        name: faker.location.city(),
        descripcion: faker.lorem.sentence(),
        historia: faker.lorem.word(),
        categoria: faker.lorem.word(),
      });
      productoCulinarioList.push(productoCulinario);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all productos culinarios', async () => {
    const productoculinario: ProductoculinarioEntity[] =
      await service.findAll();
    expect(productoculinario).not.toBeNull();
    expect(productoculinario).toHaveLength(productoCulinarioList.length);
  });

  it('findOne should return a producto culinario by id', async () => {
    const storedproductoculinario: ProductoculinarioEntity =
      productoCulinarioList[0];
    const productoculinario: ProductoculinarioEntity = await service.findOne(
      storedproductoculinario.id,
    );
    expect(productoculinario).not.toBeNull();
    expect(productoculinario.name).toEqual(storedproductoculinario.name);
    expect(productoculinario.historia).toEqual(
      storedproductoculinario.historia,
    );
    expect(productoculinario.categoria).toEqual(
      storedproductoculinario.categoria,
    );
  });

  it('create should return a new producto culinario', async () => {
    const productoculinario: ProductoculinarioEntity = {
      id: '',
      name: faker.location.city(),
      descripcion: faker.lorem.sentence(),
      historia: faker.lorem.word(),
      categoria: faker.lorem.word(),
      receta: [],
    };

    const newproductoculinario: ProductoculinarioEntity = await service.create(
      productoculinario,
    );
    expect(newproductoculinario).not.toBeNull();

    const storedproductoculinario: ProductoculinarioEntity =
      await repository.findOne({
        where: { id: newproductoculinario.id },
      });
    expect(storedproductoculinario).not.toBeNull();
    expect(storedproductoculinario.name).toEqual(newproductoculinario.name);
    expect(storedproductoculinario.descripcion).toEqual(
      newproductoculinario.descripcion,
    );
    expect(storedproductoculinario.historia).toEqual(
      newproductoculinario.historia,
    );
    expect(storedproductoculinario.categoria).toEqual(
      newproductoculinario.categoria,
    );
  });
});
