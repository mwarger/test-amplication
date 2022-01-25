import { ArgsType, Field } from "@nestjs/graphql";
import { MovieWhereUniqueInput } from "./MovieWhereUniqueInput";

@ArgsType()
class MovieFindUniqueArgs {
  @Field(() => MovieWhereUniqueInput, { nullable: false })
  where!: MovieWhereUniqueInput;
}

export { MovieFindUniqueArgs };
