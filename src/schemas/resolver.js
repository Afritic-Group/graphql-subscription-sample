import { postData as posts } from "../postData.js";
import { PostSub, PostsSub } from "./subscription/index.js";

//Resolvers - This are the set of the function defined to get the desired output for the given API
export const resolvers = {
  Query: {
    getPosts() {
      return posts;
    },
    getPost(parent, args) {
      return posts.filter((post) => {
        const body = post.body.toLowerCase().includes(args.query.toLowerCase());
        const title = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return body || title;
      });
    },
  },

  Mutation: {
    createPost(parent, args, context) {
      const id = parseInt(args.id, 10);
      const postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        posts.push({
          ...args,
        });

        context.pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: { ...args },
          },
        });
        context.pubsub.publish("posts", {
          posts: {
            mutation: "CREATED",
            data: posts,
          },
        });
        return { ...args };
      }
      throw new Error("Post with same id already exist!");
    },
  },

  Subscription: {
    posts: PostsSub,
    post: PostSub,
  },
};
