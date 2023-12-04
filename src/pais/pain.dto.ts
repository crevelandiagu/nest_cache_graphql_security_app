import { IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaisDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    capital: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    region: string;

}