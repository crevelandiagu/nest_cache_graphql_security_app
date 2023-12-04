/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config'
import { RecetaService } from './receta.service';
import { RecetaEntity } from './receta.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CulturagastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { CacheModule } from '@nestjs/common';

describe('RecetaService', () => {
  let service: RecetaService;
  let repository: Repository<RecetaEntity>;
  let recetaList: RecetaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [RecetaService, RecetaEntity],
    }).compile();

    service = module.get<RecetaService>(RecetaService);
    repository = module.get<Repository<RecetaEntity>>(
      getRepositoryToken(RecetaEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    recetaList = [];
    for (let i = 0; i < 5; i++) {
      const receta: RecetaEntity = await repository.save({
        name: faker.location.city(),
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.url(),
        procesoPreparacion: faker.lorem.sentence(),
        video: faker.image.url(),
        productoculinario: [],
        culturagastronomica: null,
      });
      recetaList.push(receta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all recetas', async () => {
    const receta: RecetaEntity[] = await service.findAll();
    expect(receta).not.toBeNull();
    expect(receta).toHaveLength(recetaList.length);
  });

  it('findOne should return a receta by id', async () => {
    const storedReceta: RecetaEntity = recetaList[0];
    const receta: RecetaEntity = await service.findOne(storedReceta.id);
    expect(receta).not.toBeNull();
    expect(receta.name).toEqual(storedReceta.name);
    expect(receta.descripcion).toEqual(storedReceta.descripcion);
    expect(receta.imagen).toEqual(storedReceta.imagen);
    expect(receta.procesoPreparacion).toEqual(storedReceta.procesoPreparacion);
    expect(receta.video).toEqual(storedReceta.video);
  });

  it('create should return a new receta', async () => {
    const receta: RecetaEntity = {
      id: '',
      name: faker.location.city(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.url(),
      procesoPreparacion: faker.lorem.sentence(),
      video: faker.image.url(),
      productoculinario: [],
      culturagastronomica: new CulturagastronomicaEntity(),
    };

    const newReceta: RecetaEntity = await service.create(receta);
    expect(newReceta).not.toBeNull();

    const storedReceta: RecetaEntity = await repository.findOne({
      where: { id: newReceta.id },
    });
    expect(storedReceta).not.toBeNull();
    expect(receta.name).toEqual(storedReceta.name);
    expect(receta.descripcion).toEqual(storedReceta.descripcion);
    expect(receta.imagen).toEqual(storedReceta.imagen);
    expect(receta.procesoPreparacion).toEqual(storedReceta.procesoPreparacion);
    expect(receta.video).toEqual(storedReceta.video);
  });
});
