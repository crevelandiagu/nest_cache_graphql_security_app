import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RestauranteDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
