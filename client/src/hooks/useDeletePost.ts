import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/api";

type UseDeletePostOptions = {
  userId: string | null;
  onDeleted?: (postId: string) => void;
};

export const useDeletePost = ({ userId, onDeleted }: UseDeletePostOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => {
      if (!userId) throw new Error("User not authenticated");
      return deletePost(postId, userId);
    },
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onDeleted?.(postId);
    },
  });
};
