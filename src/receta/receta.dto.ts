/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RecetaDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @Field()
    @IsUrl()
    @IsNotEmpty()
    imagen: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    procesoPreparacion: string;

    @Field()
    @IsUrl()
    @IsNotEmpty()
    video: string;
}