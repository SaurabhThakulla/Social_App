import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "@/api/api";
import type { FeedPost } from "@/lib/types/types";

export type LikePostInput = {
  postId: string;
  likedByUser?: boolean;
};

type LikePostContext = {
  previousPosts?: FeedPost[];
};

export const useLikePost = (
  postsKey: (string | number | null)[],
  userId: string
) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, LikePostInput, LikePostContext>({
    mutationFn: ({ postId, likedByUser }) =>
      likedByUser ? unlikePost(postId, userId) : likePost(postId, userId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: postsKey });
      const previousPosts = queryClient.getQueryData<FeedPost[]>(postsKey);

      queryClient.setQueryData<FeedPost[] | undefined>(
        postsKey,
        (old) => {
          if (!old) return old;
          return old.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes_count: post.liked_by_user
                    ? post.likes_count - 1
                    : post.likes_count + 1,
                  liked_by_user: !post.liked_by_user,
                }
              : post
          );
        }
      );

      return { previousPosts };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postsKey, context.previousPosts);
      }
    },
  });
};
