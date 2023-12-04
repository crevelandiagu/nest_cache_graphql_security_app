/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class EstrellamichelinEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  calificacion: number;

  @Field()
  @Column()
  fecha: string;

  @Field(type => [RestauranteEntity])
  @ManyToOne(() => RestauranteEntity,
    restaurante => restaurante.estrellamichelin,
  )
  restaurante: RestauranteEntity[];
}
