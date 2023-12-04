import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EstrellamichelinDto {
  @Field()
  @IsInt()
  @Min(0)
  @Max(10)
  calificacion: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  fecha: string;
}
