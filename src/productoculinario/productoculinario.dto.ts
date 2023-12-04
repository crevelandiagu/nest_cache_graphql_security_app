import { IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductoculinarioDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    historia: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    categoria: string;

}