import { usePosts, useProfile } from "@/api/queries";
import FeedLoader from "@/components/skeltons/feed";
import CreatePost from "@/components/shared/CreatePost";
import PostCard from "@/components/shared/PostCard";
import PostModal from "@/components/shared/PostModal";
import CropModal from "@/components/shared/CropModal";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useLikePost } from "@/hooks/useLikePost";
import { usePostComments } from "@/hooks/usePostComments";
import type { FeedPost } from "@/lib/types/types";
import { useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

const Home = () => {
  const userId = useAuthUserId();
  const { data: profile } = useProfile(userId ?? "");
  const { data: posts, isLoading } = usePosts(
    10,
    0,
    userId ?? undefined
  ) as unknown as UseQueryResult<FeedPost[]>;
  const [openPost, setOpenPost] = useState<FeedPost | null>(null);

  const { newPost, setNewPost, canPost, createPostMutation, imageCrop } =
    useCreatePost({ userId });

  const postsKey = ["posts", 10, 0, userId ?? null];
  const likeMutation = useLikePost(postsKey, userId ?? "");
  const { form, comments, onSubmit } = usePostComments(
    openPost?.id ?? null,
    userId
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.href}/post/${postId}`);
  };

  if (isLoading) return <FeedLoader />;

  return (
    <section className="home-container xl:w-[44vw] w-full">
      <CreatePost
        newPost={newPost}
        onNewPostChange={setNewPost}
        canPost={canPost}
        onSubmit={() => createPostMutation.mutate()}
        isPosting={createPostMutation.isPending}
        fileInputRef={imageCrop.fileInputRef}
        onSelectImage={imageCrop.handleSelectImage}
        newImageDataUrl={imageCrop.newImageDataUrl}
        newImageName={imageCrop.newImageName}
        imageError={imageCrop.imageError}
        onClearImage={imageCrop.clearSelectedImage}
        userAvatar={profile?.avatar ?? null}
        userName={profile?.name || profile?.username || "U"}
      />

      <div className="home-posts mx-auto">
        {(posts || []).map((post) => (
          <PostCard
            key={post.id}
            post={post}
            formatDate={formatDate}
            onOpen={setOpenPost}
            onLike={(postId, likedByUser) =>
              userId
                ? likeMutation.mutate({ postId, likedByUser })
                : undefined
            }
            onShare={handleShare}
          />
        ))}
        <PostModal
          post={openPost}
          onClose={() => setOpenPost(null)}
          formatDate={formatDate}
          comments={comments}
          form={form}
          onSubmit={onSubmit}
        />
      </div>

      <CropModal crop={imageCrop} />
    </section>
  );
};

export default Home;
