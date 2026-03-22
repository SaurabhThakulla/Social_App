import { memo } from "react";
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

function PostCard({
  post,
  formatDate,
  onOpen,
  onLike,
  onShare,
}: PostCardProps) {
  const navigate = useNavigate();

  const image = post.media?.[0]?.url ?? null;

  const handleProfile = function () {
    if (!post.user_id) return;
    navigate(`/profile/${post.user_id}`);
  };

  const handleLike = function () {
    onLike(post.id, post.liked_by_user);
  };

  const handleShare = function () {
    onShare(post.id);
  };

  const userInitial = post.username?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="w-full mb-6 bg-dark-2 border border-dark-3 rounded-2xl p-5 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-3">

        <button
          onClick={handleProfile}
          className="w-11 h-11 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center font-semibold overflow-hidden"
        >
          {post.avatar ? (
            <img
              src={post.avatar}
              alt={`${post.username} avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-light-2">{userInitial}</span>
          )}
        </button>

        <button
          onClick={handleProfile}
          className="text-left"
        >
          <p className="base-semibold">
            {post.name || post.username}
          </p>

          <p className="text-xs text-gray-500">
            @{post.username} • {formatDate(post.created_at)}
          </p>
        </button>

      </div>

      {/* IMAGE */}
      {image && (
        <img
          src={image}
          alt="Post"
          onClick={() => onOpen(post)}
          className="w-full rounded-xl mb-4 cursor-pointer max-h-[500px] object-cover"
        />
      )}

      {/* CONTENT */}
      {post.content && (
        <p className="mb-4 break-words">{post.content}</p>
      )}

      {/* ACTIONS */}
      <div className="flex justify-between border-t pt-3">

        {/* LIKE */}
        <Button
          onClick={handleLike}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <span>{post.likes_count}</span>

          <img
            src={icons.like}
            className={`w-5 h-5 transition ${post.liked_by_user
                ? "brightness-0 saturate-100 invert-[41%] sepia-[92%] saturate-[2663%] hue-rotate-[214deg] brightness-[101%] contrast-[101%]"
                : "opacity-70"
              }`}
          />
        </Button>

        {/* COMMENT */}
        <Button
          onClick={() => onOpen(post)}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <span>{post.comments_count}</span>
          <img src={icons.comment} className="w-5 h-5" />
        </Button>

        {/* SHARE */}
        <Button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
        >
          <img src={icons.share} className="w-5 h-5" />
        </Button>

      </div>
    </div>
  );
}

export default memo(PostCard);