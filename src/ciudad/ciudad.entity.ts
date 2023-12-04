/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import {PaisEntity} from "../pais/pais.entity";
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CiudadEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field(type => PaisEntity)
    @ManyToOne(() => PaisEntity, pais => pais.ciudad)
    @JoinColumn()
    pais: PaisEntity;

}
