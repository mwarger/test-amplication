import { ArgsType, Field } from "@nestjs/graphql";
import { MovieWhereUniqueInput } from "./MovieWhereUniqueInput";
import { MovieUpdateInput } from "./MovieUpdateInput";

@ArgsType()
class UpdateMovieArgs {
  @Field(() => MovieWhereUniqueInput, { nullable: false })
  where!: MovieWhereUniqueInput;
  @Field(() => MovieUpdateInput, { nullable: false })
  data!: MovieUpdateInput;
}

export { UpdateMovieArgs };
