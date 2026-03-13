import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addComment, getComments } from "@/api/api";
import type { PostComment } from "@/lib/types/types";

export type CommentFormValues = {
  comment: string;
};

type CommentInput = {
  postId: string;
  comment: string;
};

export const usePostComments = (
  postId: string | null,
  userId: string | null
) => {
  const queryClient = useQueryClient();
  const form = useForm<CommentFormValues>({ defaultValues: { comment: "" } });

  const commentMutation = useMutation<PostComment, Error, CommentInput>({
    mutationFn: ({ postId: currentPostId, comment }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      return addComment(currentPostId, userId, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post-comments", postId],
        });
      }
    },
  });

  const commentsQuery = useQuery<PostComment[]>({
    queryKey: ["post-comments", postId],
    queryFn: () => getComments(postId as string),
    enabled: Boolean(postId),
  });

  const onSubmit = (values: CommentFormValues) => {
    if (!postId || !userId) return;
    commentMutation.mutate({ postId, comment: values.comment });
    form.reset();
  };

  return {
    form,
    comments: commentsQuery.data,
    commentsLoading: commentsQuery.isLoading,
    onSubmit,
  };
};
