import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateMovieArgs } from "./CreateMovieArgs";
import { UpdateMovieArgs } from "./UpdateMovieArgs";
import { DeleteMovieArgs } from "./DeleteMovieArgs";
import { MovieFindManyArgs } from "./MovieFindManyArgs";
import { MovieFindUniqueArgs } from "./MovieFindUniqueArgs";
import { Movie } from "./Movie";
import { MovieService } from "../movie.service";

@graphql.Resolver(() => Movie)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class MovieResolverBase {
  constructor(
    protected readonly service: MovieService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Movie",
    action: "read",
    possession: "any",
  })
  async _moviesMeta(
    @graphql.Args() args: MovieFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Movie])
  @nestAccessControl.UseRoles({
    resource: "Movie",
    action: "read",
    possession: "any",
  })
  async movies(
    @graphql.Args() args: MovieFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Movie[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Movie",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Movie, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Movie",
    action: "read",
    possession: "own",
  })
  async movie(
    @graphql.Args() args: MovieFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Movie | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Movie",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Movie)
  @nestAccessControl.UseRoles({
    resource: "Movie",
    action: "create",
    possession: "any",
  })
  async createMovie(
    @graphql.Args() args: CreateMovieArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Movie> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Movie",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Movie"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Movie)
  @nestAccessControl.UseRoles({
    resource: "Movie",
    action: "update",
    possession: "any",
  })
  async updateMovie(
    @graphql.Args() args: UpdateMovieArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Movie | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Movie",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Movie"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Movie)
  @nestAccessControl.UseRoles({
    resource: "Movie",
    action: "delete",
    possession: "any",
  })
  async deleteMovie(
    @graphql.Args() args: DeleteMovieArgs
  ): Promise<Movie | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
