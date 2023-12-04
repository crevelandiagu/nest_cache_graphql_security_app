/* eslint-disable prettier/prettier */
import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { RecetaEntity } from "../receta/receta.entity";
import { PaisEntity } from "../pais/pais.entity";
import { RestauranteEntity } from "../restaurante/restaurante.entity";
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CulturagastronomicaEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => PaisEntity)
  @ManyToOne(() => PaisEntity, (pais) => pais.culturagastronomica)
  pais: PaisEntity;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  descripcion: string;

  @Field(type => [RecetaEntity])
  @OneToMany(() => RecetaEntity, (receta) => receta.culturagastronomica)
  receta: RecetaEntity[];

  @Field(type => [RestauranteEntity])
  @ManyToMany(() => RestauranteEntity,
      (restaurante) => restaurante.culturagastronomica,
  )
      //@JoinTable()
  restaurante: RestauranteEntity[];
}
