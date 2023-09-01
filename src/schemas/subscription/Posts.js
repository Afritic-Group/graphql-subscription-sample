export const PostsSub = {
  subscribe(_, __, context) {
    return context.pubsub.subscribe("posts");
  },
};
