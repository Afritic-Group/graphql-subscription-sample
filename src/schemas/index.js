import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolver.js";
import { typeDefs } from "./typeDefs.js";

export const schema = createSchema({
  typeDefs,
  resolvers,
});
