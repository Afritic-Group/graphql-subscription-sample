export const PostSub = {
  subscribe(_, __, context) {
    return context.pubsub.subscribe("post");
  },
};
