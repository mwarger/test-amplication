import { ArgsType, Field } from "@nestjs/graphql";
import { MovieCreateInput } from "./MovieCreateInput";

@ArgsType()
class CreateMovieArgs {
  @Field(() => MovieCreateInput, { nullable: false })
  data!: MovieCreateInput;
}

export { CreateMovieArgs };
