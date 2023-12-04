/* eslint-disable prettier/prettier */
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { ProductoculinarioEntity } from "../productoculinario/productoculinario.entity";
import { CulturagastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class RecetaEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    descripcion: string;

    @Field()
    @Column()
    imagen: string;

    @Field()
    @Column()
    procesoPreparacion: string;

    @Field()
    @Column()
    video: string;

    @Field(type => [ProductoculinarioEntity])
    @ManyToMany(() => ProductoculinarioEntity, productoculinario => productoculinario.receta)
    @JoinTable()
    productoculinario: ProductoculinarioEntity[];

    @Field(type => CulturagastronomicaEntity)
    @ManyToOne(() => CulturagastronomicaEntity, culturagastronomica => culturagastronomica.receta)
    culturagastronomica: CulturagastronomicaEntity;

}
