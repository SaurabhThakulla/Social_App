import { Button } from "@/components/ui/button";
import { icons } from "@/assets/icons/icons";
import type { FeedPost } from "@/lib/types/types";

type ProfilePostCardProps = {
  post: FeedPost;
  formatDate: (date: string) => string;
  onOpen: (post: FeedPost) => void;
  onLike: (postId: string, likedByUser?: boolean) => void;
  onShare: (postId: string) => void;
  onToggleDelete: (postId: string) => void;
  onSetProfilePicture?: (mediaUrl: string) => void;
  canDelete?: boolean;
};

const ProfilePostCard = ({
  post,
  formatDate,
  onOpen,
  onLike,
  onShare,
  onToggleDelete,
  onSetProfilePicture,
  canDelete = false,
}: ProfilePostCardProps) => {
  const primaryMediaUrl = post.media?.[0]?.url;

  return (
    <div className="border border-dark-4 rounded-xl p-4 bg-dark-3/40 shadow-sm">
      <p className="text-xs text-light-4 mb-2">
        {formatDate(post.created_at)}
      </p>
      <p className="text-light-2 mb-3 break-words">{post.content}</p>
      {primaryMediaUrl && (
        <div className="relative">
          <img
            src={primaryMediaUrl}
            alt="post"
            className="w-full rounded-lg object-cover max-h-[420px] cursor-pointer"
            onClick={() => onOpen(post)}
          />
          {onSetProfilePicture && (
            <button
              type="button"
              onClick={() => onSetProfilePicture(primaryMediaUrl)}
              className="absolute top-2 right-2 bg-dark-2/80 border border-dark-4 rounded-full p-2 hover:bg-dark-2 transition"
              title="Set as profile picture"
              aria-label="Set as profile picture"
            >
              <img src={icons.fileUpload} className="w-4 h-4" alt="" />
            </button>
          )}
        </div>
      )}

      <div className="flex justify-between border-t border-dark-4 mt-4 pt-2">
        <Button
          onClick={() => onLike(post.id, post.liked_by_user)}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <span>{post.likes_count}</span>
          <img src={icons.like} className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => onOpen(post)}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <span>{post.comments_count}</span>
          <img src={icons.comment} className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => onShare(post.id)}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <img src={icons.share} className="w-5 h-5" />
        </Button>
        {canDelete && (
          <Button
            onClick={() => onToggleDelete(post.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3 text-red-300 hover:text-red-200"
          >
            <img src={icons.deleteIcon} className="w-5 h-5" alt="Delete" />
            <span>Delete</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePostCard;
