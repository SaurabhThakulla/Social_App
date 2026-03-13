import { useProfile, usePosts } from "@/api/queries";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import { useLikePost } from "@/hooks/useLikePost";
import { useProfilePosts } from "@/hooks/useProfilePosts";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useProfileComments } from "@/hooks/useProfileComments";
import ProfileHeader from "@/components/shared/profile/ProfileHeader";
import ProfileIntro from "@/components/shared/profile/ProfileIntro";
import ProfilePhotos from "@/components/shared/profile/ProfilePhotos";
import ProfilePosts from "@/components/shared/profile/ProfilePosts";
import ProfilePostModal from "@/components/shared/profile/ProfilePostModal";
import type { FeedPost } from "@/lib/types/types";
import { useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

const Profile = () => {
  const userId = useAuthUserId();
  const {
    data: profile,
    isLoading: profileLoading,
    isError,
    error,
  } = useProfile(userId ?? "");
  const { data: posts, isLoading: postsLoading } = usePosts(
    50,
    0,
    userId ?? undefined
  ) as unknown as UseQueryResult<FeedPost[]>;

  const [openPost, setOpenPost] = useState<FeedPost | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const postsKey = ["posts", 50, 0, userId ?? null];
  const likeMutation = useLikePost(postsKey, userId ?? "");
  const deleteMutation = useDeletePost({
    userId,
    onDeleted: (postId) => {
      setPendingDeleteId(null);
      if (openPost?.id === postId) {
        setOpenPost(null);
      }
    },
  });
  const { form, comments, onSubmit } = useProfileComments(
    openPost?.id ?? null,
    userId
  );

  const { userPosts, photos, coverImage, avatar } = useProfilePosts({
    posts,
    profile,
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.href}/post/${postId}`);
  };

  if (profileLoading) {
    return (
      <section className="profile-container">
        <p className="text-light-3">Loading profile...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="profile-container">
        <p className="text-light-3">
          Failed to load profile: {String(error)}
        </p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="profile-container">
        <p className="text-light-3">Profile not found</p>
      </section>
    );
  }

  return (
    <section className="profile-container">
      <ProfileHeader
        profile={profile}
        coverImage={coverImage}
        avatar={avatar}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
        <div className="md:col-span-1 space-y-6">
          <ProfileIntro profile={profile} />
          <ProfilePhotos photos={photos} />
        </div>

        <div className="md:col-span-2">
          <ProfilePosts
            posts={userPosts}
            postsLoading={postsLoading}
            pendingDeleteId={pendingDeleteId}
            formatDate={formatDate}
            onOpen={setOpenPost}
            onLike={(postId, likedByUser) =>
              userId
                ? likeMutation.mutate({ postId, likedByUser })
                : undefined
            }
            onShare={handleShare}
            onToggleDelete={(postId) =>
              setPendingDeleteId((current) =>
                current === postId ? null : postId
              )
            }
            onConfirmDelete={(postId) =>
              userId ? deleteMutation.mutate(postId) : undefined
            }
            onCancelDelete={() => setPendingDeleteId(null)}
            isDeleting={deleteMutation.isPending}
          />
        </div>
      </div>

      <ProfilePostModal
        post={openPost}
        onClose={() => setOpenPost(null)}
        formatDate={formatDate}
        comments={comments}
        form={form}
        onSubmit={onSubmit}
        pendingDeleteId={pendingDeleteId}
        onToggleDelete={(postId) =>
          setPendingDeleteId((current) =>
            current === postId ? null : postId
          )
        }
        onConfirmDelete={(postId) =>
          userId ? deleteMutation.mutate(postId) : undefined
        }
        onCancelDelete={() => setPendingDeleteId(null)}
        isDeleting={deleteMutation.isPending}
      />
    </section>
  );
};

export default Profile;
