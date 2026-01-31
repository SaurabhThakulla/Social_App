import { usePosts } from "@/api/queries/index";

const Home = () => {
  const { data: posts, isLoading } = usePosts();
  const result = usePosts();
  console.log(result);

  const formatDate = (date: string | number | Date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
  if (isLoading) {
    return <p className="text-center mt-6">Loading feed...</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="home-container">
        <div className="home-posts mx-auto text-center">
          <h2 className="h2-bold">No posts yet</h2>
          <p className="base-regular text-gray-500">
            Start sharing something
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="home-container">
      <div className="home-posts mx-auto">
        {/* Feed Header */}
        <h1 className="h2-bold w-full text-left">Feed</h1>

        {posts?.map((e) => {
          const { authorId, content, createdAt, metrics } = e;

          return (
            <div key={e.id}>
              <div className="flex items-center gap-3 mb-2">
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

              {/* Content */}
              <p className="base-regular mb-4">{content}</p>

              {/* Actions */}
              <div className="flex gap-6 text-sm text-gray-600">
                <button className="hover:text-black">
                  ❤️ {metrics?.likes || 0}
                </button>
                <button className="hover:text-black">
                  💬 {metrics?.comments || 0}
                </button>
                <button className="hover:text-black">
                  🔄 {metrics?.shares || 0}
                </button>
              </div>
            </div>       
          )

        })}

      </div>
    </section>
  );
};

export default Home;
