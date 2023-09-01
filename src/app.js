import express from "express";
import { createYoga, createPubSub } from "graphql-yoga";
import { schema } from "./schemas/index.js";

const pubsub = createPubSub();

const PORT = 4003;
const app = express();
const yoga = createYoga({
  schema,
  context: { pubsub },
});

app.use("/graphql", yoga);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
