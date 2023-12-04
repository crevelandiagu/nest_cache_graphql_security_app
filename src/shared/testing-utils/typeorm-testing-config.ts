import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from '../../ciudad/ciudad.entity';
import { CulturagastronomicaEntity } from '../../culturagastronomica/culturagastronomica.entity';
import { EstrellamichelinEntity } from '../../estrellamichelin/estrellamichelin.entity';
import { PaisEntity } from '../../pais/pais.entity';
import { ProductoculinarioEntity } from '../../productoculinario/productoculinario.entity';
import { RecetaEntity } from '../../receta/receta.entity';
import { RestauranteEntity } from '../../restaurante/restaurante.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      CiudadEntity,
      CulturagastronomicaEntity,
      EstrellamichelinEntity,
      PaisEntity,
      ProductoculinarioEntity,
      RecetaEntity,
      RestauranteEntity,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    CiudadEntity,
    CulturagastronomicaEntity,
    EstrellamichelinEntity,
    PaisEntity,
    ProductoculinarioEntity,
    RecetaEntity,
    RestauranteEntity,
  ]),
];
