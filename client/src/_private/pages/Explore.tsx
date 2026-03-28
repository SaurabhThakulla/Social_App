import { usePosts } from "@/api/queries";
import { useState } from "react";
import PostModal from "@/components/shared/PostModal";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import { usePostComments } from "@/hooks/usePostComments";
import type { FeedPost } from "@/lib/types/types";

function Explore() {
    const { data: posts, isLoading } = usePosts();
    const userId = useAuthUserId();
    const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

    const { form, comments, onSubmit } = usePostComments(
        selectedPost?.id ?? null,
        userId
    );

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const mediaPosts =
        (posts ?? []).filter((post) =>
            Boolean(post.media?.[0]?.url)
        ) || [];

    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="explore-container">
            <div className="explore-inner_container">

                {/* Search */}
                <input
                    type="search"
                    placeholder="Search photos..."
                    className="explore-search w-1/2 rounded-full px-4 text-light-1 mr-auto"
                />

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">

                    {mediaPosts.map((post) => (
                        <div key={post.id} className="mb-4 break-inside-avoid">

                            <img
                                src={post.media?.[0]?.url as string}
                                alt="explore"
                                loading="lazy"
                                onClick={() => setSelectedPost(post)}
                                className="w-full aspect-square object-cover rounded-md hover:scale-105 transition duration-300 cursor-pointer"
                            />

                        </div>
                    ))}

                </div>

            </div>

            {/* Post Modal */}
            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    formatDate={formatDate}
                    comments={comments}
                    form={form}
                    onSubmit={onSubmit}
                />
            )}

        </div>
    );
}

export default Explore;
