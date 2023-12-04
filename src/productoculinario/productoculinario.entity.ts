/* eslint-disable prettier/prettier */
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from 'typeorm';
import { RecetaEntity } from "../receta/receta.entity";
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ProductoculinarioEntity {
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
    historia: string;

    @Field()
    @Column()
    categoria: string;

    @Field(type => [RecetaEntity])
    @ManyToMany(() => RecetaEntity, receta => receta.productoculinario)
    @JoinTable()
    receta: RecetaEntity[];

}
