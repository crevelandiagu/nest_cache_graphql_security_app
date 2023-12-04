/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstrellamichelinService } from './estrellamichelin.service';
import { EstrellamichelinEntity } from './estrellamichelin.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';

describe('EstrellaMichelinService', () => {
  let service: EstrellamichelinService;
  let repository: Repository<EstrellamichelinEntity>;
  let estrellaMichelinList: EstrellamichelinEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [EstrellamichelinService, EstrellamichelinEntity],
    }).compile();

    service = module.get<EstrellamichelinService>(EstrellamichelinService);
    repository = module.get<Repository<EstrellamichelinEntity>>(
      getRepositoryToken(EstrellamichelinEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estrellaMichelinList = [];
    for (let i = 0; i < 5; i++) {
      const estrellaMichelin: EstrellamichelinEntity = await repository.save({
        calificacion: faker.number.int(),
        fecha: faker.date.anytime().toString(),
      });
      estrellaMichelinList.push(estrellaMichelin);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a city by id', async () => {
    const storedEstrellaMichelin: EstrellamichelinEntity =
      estrellaMichelinList[0];
    const estrellaMichelin: EstrellamichelinEntity = await service.findOne(
      storedEstrellaMichelin.id,
    );
    expect(estrellaMichelin).not.toBeNull();
    expect(estrellaMichelin.calificacion).toEqual(
      storedEstrellaMichelin.calificacion,
    );
    expect(estrellaMichelin.fecha).toEqual(storedEstrellaMichelin.fecha);
  });

  it('create should return a new city', async () => {
    const estrellaMichelin: EstrellamichelinEntity = {
      id: '',
      calificacion: faker.number.int(),
      fecha: faker.date.anytime().toString(),
      restaurante: null,
    };

    const neweEstrellaMichelin: EstrellamichelinEntity = await service.create(
      estrellaMichelin,
    );
    expect(neweEstrellaMichelin).not.toBeNull();

    const storedEstrellaMichelin: EstrellamichelinEntity =
      await repository.findOne({
        where: { id: neweEstrellaMichelin.id },
      });
    expect(storedEstrellaMichelin).not.toBeNull();
    expect(storedEstrellaMichelin.calificacion).toEqual(
      neweEstrellaMichelin.calificacion,
    );
    expect(storedEstrellaMichelin.fecha).toEqual(neweEstrellaMichelin.fecha);
  });
});
