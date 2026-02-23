import { usePosts } from "@/api/queries/index";
import FeedLoader from "@/components/skeltons/feed";
import { Button } from "@/components/ui/button";
import { useTag } from "@/context/TagProvider";


const Home = () => {
  const { data: posts, isLoading } = usePosts();
  const { activeTag } = useTag();

  const orderedPosts = activeTag
    ? [
      ...(posts || []).filter((p) => p.tag === activeTag),
      ...(posts || []).filter((p) => p.tag !== activeTag),
    ]
    : posts || [];

  const formatDate = (date: string | number | Date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
  if (isLoading) return <FeedLoader />;
  if (!posts?.length) return <p className="flex h-full w-full justify-center items-center">No posts found</p>;


  return (
    <section className="home-container">
      <div className="home-posts mx-auto">
        {orderedPosts.map((e) => {
          const { authorId, content, createdAt, metrics, image } = e;
          
          return (
            <div key={e.id} className="w-full mb-6 bg-dark-2 border border-dark-4 rounded-2xl p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2 p-2">
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                  {authorId?.[0] || "U"}
                </div>
                <div>
                  <p className="base-semibold">{authorId}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(createdAt)}
                  </p>
                </div>
              </div>

              {/* Image */}
              {image && (
                <img
                  src={image}
                  alt="post"
                  className="w-full h-90 object-cover rounded-xl mb-3"
                />
              )}

              {/* Content */}
              <p className="base-regular mb-4">{content}</p>
              {/* Actions */}
              <div className="flex justify-between items-center text-sm text-light-3 mt-4">
                <Button className="flex items-center gap-2 bg-transparent hover:bg-dark-3 px-4 py-2 rounded-lg transition">
                  ❤️ <span>{metrics?.likes || 0}</span>
                </Button>
                <Button className="flex items-center gap-2 bg-transparent hover:bg-dark-3 px-4 py-2 rounded-lg transition">
                  💬 <span>{metrics?.comments || 0}</span>
                </Button>
                <Button className="flex items-center gap-2 bg-transparent hover:bg-dark-3 px-4 py-2 rounded-lg transition">
                  🔄 <span>{metrics?.shares || 0}</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
