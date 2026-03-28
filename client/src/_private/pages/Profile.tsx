import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import { useProfilePosts } from "@/hooks/useProfilePosts";
import { useProfileEditor } from "@/hooks/useProfileEditor";
import { useProfileSyncs } from "@/hooks/useProfileSyncs";
import { useProfilePostActions } from "@/hooks/useProfilePostActions";
import { useProfileComments } from "@/hooks/useProfileComments";
import { useProfile, usePosts } from "@/api/queries";
import type { FeedPost } from "@/lib/types/types";
import ProfileHeader from "@/components/shared/profile/ProfileHeader";
import ProfileIntro from "@/components/shared/profile/ProfileIntro";
import ProfilePhotos from "@/components/shared/profile/ProfilePhotos";
import ProfilePosts from "@/components/shared/profile/ProfilePosts";
import ProfilePostModal from "@/components/shared/profile/ProfilePostModal";
import EditProfileModal from "@/components/shared/profile/EditProfileModal";
import SyncListModal from "@/components/shared/profile/SyncListModal";
const Profile = () => {
  const userId = useAuthUserId();
  const { userId: paramUserId } = useParams();
  const viewedUserId = paramUserId ?? userId ?? "";
  const { data: profile, isLoading } = useProfile(viewedUserId);
  const { data: posts } = usePosts(50, 0, userId ?? undefined);
  const { userPosts = [], photos, coverImage, avatar } = useProfilePosts({ posts, profile });
  const editor = useProfileEditor(userId, profile, avatar);
  const syncs = useProfileSyncs(userId, viewedUserId);
  const postActions = useProfilePostActions(userId);
  const [openPost, setOpenPost] = useState<FeedPost | null>(null);
  const { form, comments, onSubmit } = useProfileComments(
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

  if (isLoading || !profile) {
    return (
      <section className="profile-container">
        <p className="text-light-3">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="profile-container">
      <ProfileHeader
        profile={profile}
        coverImage={coverImage}
        avatar={avatar}
        onEditProfile={editor.openEditProfile}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
        <div className="md:col-span-1 space-y-6">
          <ProfileIntro profile={profile} />
          <ProfilePhotos photos={photos} />
        </div>

        <div className="md:col-span-2">
          <ProfilePosts
            posts={userPosts}
            postsLoading={false}
            pendingDeleteId={postActions.pendingDeleteId}
            formatDate={formatDate}
            onOpen={setOpenPost}
            onLike={(postId, likedByUser) =>
              postActions.likeMutation.mutate({ postId, likedByUser })
            }
            onShare={handleShare}
            onToggleDelete={(postId) =>
              postActions.setPendingDeleteId((current) =>
                current === postId ? null : postId
              )
            }
            onConfirmDelete={(postId) =>
              postActions.deleteMutation.mutate(postId)
            }
            onCancelDelete={() => postActions.setPendingDeleteId(null)}
            isDeleting={postActions.deleteMutation.isPending}
            onSetProfilePicture={() => { }}
            canDelete={true}
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
        pendingDeleteId={postActions.pendingDeleteId}
        onToggleDelete={(postId) =>
          postActions.setPendingDeleteId((current) =>
            current === postId ? null : postId
          )
        }
        onConfirmDelete={(postId) =>
          postActions.deleteMutation.mutate(postId)
        }
        onCancelDelete={() => postActions.setPendingDeleteId(null)}
        isDeleting={postActions.deleteMutation.isPending}
        canDelete={true}
      />

      <EditProfileModal
        isOpen={editor.isEditingProfile}
        name={editor.editName}
        username={editor.editUsername}
        bio={editor.editBio}
        avatarPreview={editor.editAvatar}
        avatarInputRef={editor.editAvatarInputRef}
        onAvatarSelect={editor.handleAvatarSelect}
        onAvatarClick={editor.triggerAvatarPicker}
        onClearAvatar={editor.clearAvatar}
        onNameChange={editor.setEditName}
        onUsernameChange={editor.setEditUsername}
        onBioChange={editor.setEditBio}
        onClose={editor.closeEditProfile}
        onSave={editor.saveProfile}
        isSaving={editor.isSaving}
        canSave={editor.canSave}
      />

      <SyncListModal
        isOpen={syncs.syncsOpen}
        users={syncs.syncs}
        isLoading={syncs.loading}
        canLoadMore={syncs.hasMore}
        onLoadMore={syncs.loadSyncs}
        onClose={() => syncs.setSyncsOpen(false)}
        onRemoveSync={(id) => syncs.unsyncMutation.mutate(id)}
      />
    </section>
  );
};

export default Profile;
