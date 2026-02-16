import { usePosts } from "@/api/queries";

function Explore() {
    const { data: posts, isLoading } = usePosts();

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

                {/* Masonry Grid */}
                <div className="w-full columns-2 sm:columns-3 lg:columns-4 gap-4">
                    {posts?.map((post) => (
                        <div key={post.id} className="mb-4 break-inside-avoid">
                            <img
                                src={post.image}
                                alt="explore"
                                loading="lazy"
                                className="w-full rounded-xl object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Explore;