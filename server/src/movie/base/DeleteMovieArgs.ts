import { ArgsType, Field } from "@nestjs/graphql";
import { MovieWhereUniqueInput } from "./MovieWhereUniqueInput";

@ArgsType()
class DeleteMovieArgs {
  @Field(() => MovieWhereUniqueInput, { nullable: false })
  where!: MovieWhereUniqueInput;
}

export { DeleteMovieArgs };
