import type { FeedPost } from "@/lib/types/types";
import ProfilePostCard from "@/components/shared/profile/ProfilePostCard";
import DeletePostConfirm from "@/components/shared/profile/DeletePostConfirm";

type ProfilePostsProps = {
  posts: FeedPost[];
  postsLoading: boolean;
  pendingDeleteId: string | null;
  formatDate: (date: string) => string;
  onOpen: (post: FeedPost) => void;
  onLike: (postId: string, likedByUser?: boolean) => void;
  onShare: (postId: string) => void;
  onToggleDelete: (postId: string) => void;
  onConfirmDelete: (postId: string) => void;
  onCancelDelete: () => void;
  isDeleting: boolean;
  onSetProfilePicture?: (mediaUrl: string) => void;
  canDelete?: boolean;
};

const ProfilePosts = ({
  posts,
  postsLoading,
  pendingDeleteId,
  formatDate,
  onOpen,
  onLike,
  onShare,
  onToggleDelete,
  onConfirmDelete,
  onCancelDelete,
  isDeleting,
  onSetProfilePicture,
  canDelete = false,
}: ProfilePostsProps) => {
  return (
    <div className="bg-dark-2 border border-dark-4 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="base-semibold">Posts</h3>
        {postsLoading && (
          <span className="text-xs text-light-4">Loading...</span>
        )}
      </div>

      {posts.length ? (
        <div className="space-y-5">
          {posts.map((post) => (
            <div key={post.id}>
              <ProfilePostCard
                post={post}
                formatDate={formatDate}
                onOpen={onOpen}
                onLike={onLike}
                onShare={onShare}
                onToggleDelete={onToggleDelete}
                onSetProfilePicture={onSetProfilePicture}
                canDelete={canDelete}
              />
              <DeletePostConfirm
                isOpen={pendingDeleteId === post.id}
                onDelete={() => onConfirmDelete(post.id)}
                onCancel={onCancelDelete}
                isDeleting={isDeleting}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-light-4 text-sm">No posts yet</p>
      )}
    </div>
  );
};

export default ProfilePosts;
