import { IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CulturagastronomicaDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

}