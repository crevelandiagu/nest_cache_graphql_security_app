/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';

import { RestauranteModule } from './restaurante/restaurante.module';
import { CulturagastronomicaModule } from './culturagastronomica/culturagastronomica.module';
import { EstrellamichelinModule } from './estrellamichelin/estrellamichelin.module';
import { PaisModule } from './pais/pais.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { RecetaModule } from './receta/receta.module';
import { ProductoculinarioModule } from './productoculinario/productoculinario.module';

import { RestauranteEntity } from './restaurante/restaurante.entity';
import { RecetaEntity } from "./receta/receta.entity";
import { ProductoculinarioEntity } from "./productoculinario/productoculinario.entity";
import { PaisEntity  } from "./pais/pais.entity";
import { EstrellamichelinEntity } from "./estrellamichelin/estrellamichelin.entity";
import { CulturagastronomicaEntity } from "./culturagastronomica/culturagastronomica.entity";
import { CiudadEntity } from "./ciudad/ciudad.entity";

import { RecetaProductoculinarioModule } from './receta-productoculinario/receta-productoculinario.module';
import { PaisCiudadModule } from './pais-ciudad/pais-ciudad.module';
import { RestauranteEstrellamichelinModule } from './restaurante-estrellamichelin/restaurante-estrellamichelin.module';
import { CulturagastronomicaRecetaModule } from './culturagastronomica-receta/culturagastronomica-receta.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [RestauranteModule, CulturagastronomicaModule, EstrellamichelinModule, PaisModule, CiudadModule, RecetaModule, ProductoculinarioModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'culturagastronomica_db',
      entities: [RestauranteEntity, EstrellamichelinEntity, RecetaEntity, ProductoculinarioEntity, PaisEntity, CulturagastronomicaEntity, CiudadEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),

    RecetaProductoculinarioModule,          
    PaisCiudadModule,
    RestauranteEstrellamichelinModule,
    CulturagastronomicaRecetaModule,
    UserModule,
    AuthModule,

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
