import { memo } from "react";
import { Button } from "@/components/ui/button";
import { icons } from "@/assets/icons/icons";

interface Post {
    id: string;
    username: string;
    content: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    media?: { url: string; type: string }[];
}

interface Props {
    post: Post;
    like: (id: string) => void;
    open: (post: Post) => void;
    formatDate: (date: string) => string;
}

const PostCard = ({ post, like, open, formatDate }: Props) => {
    const image = post.media?.[0]?.url;

    return (
        <div className="w-full mb-6 bg-dark-2 border border-dark-4 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                    {post.username?.[0]}
                </div>

                <div>
                    <p className="base-semibold">{post.username}</p>
                    <p className="text-xs text-gray-500">
                        {formatDate(post.created_at)}
                    </p>
                </div>
            </div>

            {image && (
                <img
                    src={image}
                    className="w-full rounded-xl mb-3 cursor-pointer h-[500px] object-cover"
                    onClick={() => open(post)}
                />
            )}

            <p className="mb-4 break-words">{post.content}</p>

            <div className="flex justify-between border-t pt-3">

                <Button
                    onClick={() => like(post.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
                >
                    <span>{post.likes_count}</span>
                    <img src={icons.like} className="w-5 h-5" />
                </Button>

                <Button
                    onClick={() => open(post)}
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
                >
                    <span>{post.comments_count}</span>
                    <img src={icons.comment} className="w-5 h-5" />
                </Button>

                <Button
                    onClick={() =>
                        navigator.clipboard.writeText(
                            `${window.location.href}/post/${post.id}`
                        )
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
                >
                    <img src={icons.share} className="w-5 h-5" />
                </Button>

            </div>
        </div>
    );
};

export default memo(PostCard);
