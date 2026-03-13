import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostMedia, createPost } from "@/api/api";
import { useImageCrop } from "@/hooks/useImageCrop";
import type { FeedPost } from "@/lib/types/types";

type UseCreatePostOptions = {
  userId: string | null;
};

export const useCreatePost = ({ userId }: UseCreatePostOptions) => {
  const [newPost, setNewPost] = useState("");
  const queryClient = useQueryClient();
  const imageCrop = useImageCrop();

  const createPostMutation = useMutation<FeedPost>({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const trimmed = newPost.trim();
      const post = await createPost(
        userId,
        trimmed.length ? trimmed : (null as unknown as string)
      );
      if (imageCrop.newImageDataUrl) {
        await addPostMedia(post.id, imageCrop.newImageDataUrl, "image");
      }
      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPost("");
      imageCrop.reset();
    },
  });

  const canPost =
    Boolean(userId) &&
    (newPost.trim().length > 0 || Boolean(imageCrop.newImageDataUrl));

  return {
    newPost,
    setNewPost,
    canPost,
    createPostMutation,
    imageCrop,
  };
};
