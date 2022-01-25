import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MovieWhereInput } from "./MovieWhereInput";
import { Type } from "class-transformer";
import { MovieOrderByInput } from "./MovieOrderByInput";

@ArgsType()
class MovieFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MovieWhereInput,
  })
  @Field(() => MovieWhereInput, { nullable: true })
  @Type(() => MovieWhereInput)
  where?: MovieWhereInput;

  @ApiProperty({
    required: false,
    type: MovieOrderByInput,
  })
  @Field(() => MovieOrderByInput, { nullable: true })
  @Type(() => MovieOrderByInput)
  orderBy?: MovieOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { MovieFindManyArgs };
