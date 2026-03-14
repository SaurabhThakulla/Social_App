import { useProfile, usePosts } from "@/api/queries";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import { useLikePost } from "@/hooks/useLikePost";
import { useProfilePosts } from "@/hooks/useProfilePosts";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useProfileComments } from "@/hooks/useProfileComments";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import ProfileHeader from "@/components/shared/profile/ProfileHeader";
import ProfileIntro from "@/components/shared/profile/ProfileIntro";
import ProfilePhotos from "@/components/shared/profile/ProfilePhotos";
import ProfilePosts from "@/components/shared/profile/ProfilePosts";
import ProfilePostModal from "@/components/shared/profile/ProfilePostModal";
import EditProfileModal from "@/components/shared/profile/EditProfileModal";
import type { FeedPost } from "@/lib/types/types";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Profile = () => {
  const userId = useAuthUserId();
  const params = useParams();
  const viewedUserId = params.userId ?? userId ?? "";
  const isOwnProfile = Boolean(userId && viewedUserId === userId);
  const {
    data: profile,
    isLoading: profileLoading,
    isError,
    error,
  } = useProfile(viewedUserId);
  const { data: posts, isLoading: postsLoading } = usePosts(
    50,
    0,
    userId ?? undefined
  ) as unknown as UseQueryResult<FeedPost[]>;

  const [openPost, setOpenPost] = useState<FeedPost | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [avatarOverride, setAvatarOverride] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState<string | null>(null);
  const editAvatarInputRef = useRef<HTMLInputElement>(null);

  const postsKey = ["posts", 50, 0, userId ?? null];
  const likeMutation = useLikePost(postsKey, userId ?? "");
  const updateProfileMutation = useUpdateProfile();
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

  const openEditProfile = (autoPickAvatar = false) => {
    if (!profile) return;
    setEditName(profile.name ?? "");
    setEditUsername(profile.username ?? "");
    setEditBio(profile.bio ?? "");
    setEditAvatar(avatarOverride || avatar || null);
    setIsEditingProfile(true);

    if (autoPickAvatar) {
      setTimeout(() => {
        editAvatarInputRef.current?.click();
      }, 0);
    }
  };

  const closeEditProfile = () => setIsEditingProfile(false);

  const handleEditAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      setEditAvatar(result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleEditAvatarClick = () => {
    editAvatarInputRef.current?.click();
  };

  const handleClearAvatar = () => {
    setEditAvatar(null);
  };

  const handleSaveProfile = () => {
    if (!userId) return;
    updateProfileMutation.mutate(
      {
        userId,
        name: editName.trim(),
        username: editUsername.trim(),
        bio: editBio.trim(),
        avatar: editAvatar,
      },
      {
        onSuccess: (updated) => {
          setAvatarOverride(updated.avatar ?? null);
          setIsEditingProfile(false);
        },
      }
    );
  };

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
        avatar={avatarOverride || avatar}
        onEditProfile={isOwnProfile ? () => openEditProfile(false) : undefined}
        onAvatarClick={isOwnProfile ? () => openEditProfile(true) : undefined}
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
            onSetProfilePicture={isOwnProfile ? (mediaUrl) => {
              if (!userId) return;
              updateProfileMutation.mutate(
                { userId, avatar: mediaUrl },
                {
                  onSuccess: (updated) => {
                    setAvatarOverride(updated.avatar ?? mediaUrl);
                  },
                }
              );
            } : undefined}
            canDelete={isOwnProfile}
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
        canDelete={isOwnProfile}
      />

      <EditProfileModal
        isOpen={isEditingProfile}
        isSaving={updateProfileMutation.isPending}
        name={editName}
        username={editUsername}
        bio={editBio}
        avatarPreview={editAvatar}
        avatarInputRef={editAvatarInputRef}
        onAvatarSelect={handleEditAvatarSelect}
        onAvatarClick={handleEditAvatarClick}
        onClearAvatar={handleClearAvatar}
        onNameChange={setEditName}
        onUsernameChange={setEditUsername}
        onBioChange={setEditBio}
        onClose={closeEditProfile}
        onSave={handleSaveProfile}
        canSave={
          editName.trim().length > 0 && editUsername.trim().length > 0
        }
      />
    </section>
  );
};

export default Profile;
