/* eslint-disable prettier/prettier */
import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {EstrellamichelinEntity} from "../estrellamichelin/estrellamichelin.entity";
import { CulturagastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import {PaisEntity} from "../pais/pais.entity";
import { Field, ObjectType } from '@nestjs/graphql';
import {ProductoculinarioEntity} from "../productoculinario/productoculinario.entity";

@ObjectType()
@Entity()
export class RestauranteEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field(type => [PaisEntity])
    @ManyToMany(() => PaisEntity, pais => pais.restaurante)
    @JoinTable()
    pais: PaisEntity[];

    @Field()
    @Column()
    ciudad: string;

    @Field(type => [EstrellamichelinEntity])
    @OneToMany(() => EstrellamichelinEntity, estrellamichelin => estrellamichelin.restaurante)
    estrellamichelin: EstrellamichelinEntity[];

    @Field(type => [CulturagastronomicaEntity])
    @ManyToMany(() => CulturagastronomicaEntity, culturagastronomica => culturagastronomica.restaurante)
    @JoinTable()
    culturagastronomica: CulturagastronomicaEntity[];
}