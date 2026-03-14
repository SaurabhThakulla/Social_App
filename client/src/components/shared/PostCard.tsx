import { Button } from "@/components/ui/button";
import { icons } from "@/assets/icons/icons";
import type { FeedPost } from "@/lib/types/types";
import { useNavigate } from "react-router-dom";

type PostCardProps = {
  post: FeedPost;
  formatDate: (date: string) => string;
  onOpen: (post: FeedPost) => void;
  onLike: (postId: string, likedByUser?: boolean) => void;
  onShare: (postId: string) => void;
};

const PostCard = ({
  post,
  formatDate,
  onOpen,
  onLike,
  onShare,
}: PostCardProps) => {
  const image = post.media?.[0]?.url;
  const navigate = useNavigate();

  const handleOpenProfile = () => {
    if (!post.user_id) return;
    navigate(`/profile/${post.user_id}`);
  };

  return (
    <div className="w-full mb-6 bg-dark-2 border border-dark-3 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-11 h-11 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center font-semibold overflow-hidden cursor-pointer"
          onClick={handleOpenProfile}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? handleOpenProfile() : undefined)}
        >
          {post.avatar ? (
            <img
              src={post.avatar}
              alt={`${post.username} avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-light-2">{post.username?.[0]}</span>
          )}
        </div>
        <div
          className="cursor-pointer"
          onClick={handleOpenProfile}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? handleOpenProfile() : undefined)}
        >
          <p className="base-semibold">{post.name || post.username}</p>
          <p className="text-xs text-gray-500">
            @{post.username} •{" "}
            {formatDate(post.created_at)}
          </p>
        </div>
      </div>
      {image && (
        <img
          src={image}
          className="w-full rounded-xl mb-3 cursor-pointer h-[500px] object-cover"
          onClick={() => onOpen(post)}
        />
      )}
      <p className="mb-4 break-words">{post.content}</p>
      <div className="flex justify-between border-t pt-3">
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
          ðŸ’¬ {post.comments_count}
        </Button>
        <Button
          onClick={() => onShare(post.id)}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <img src={icons.share} className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
