/* eslint-disable prettier/prettier */
import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {CiudadEntity} from "../ciudad/ciudad.entity";
import {CulturagastronomicaEntity} from "../culturagastronomica/culturagastronomica.entity";
import { RestauranteEntity } from "../restaurante/restaurante.entity";
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class PaisEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    capital: string;

    @Field()
    @Column()
    region: string;

    @Field(type => [CiudadEntity])
    @OneToMany(() => CiudadEntity, ciudad => ciudad.pais)
    ciudad: CiudadEntity[];

    @Field(type => [CulturagastronomicaEntity])
    @OneToMany(() => CulturagastronomicaEntity, culturagastronomica => culturagastronomica.pais)
    culturagastronomica: CulturagastronomicaEntity[];

    @Field(type => [RestauranteEntity])
    @ManyToMany(() => RestauranteEntity, restaurante => restaurante.pais)
        //@JoinTable()
    restaurante: RestauranteEntity[];

}
