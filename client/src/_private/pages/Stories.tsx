import { useStories } from "@/api/queries";
import Recomendation from "@/components/skeltons/recomendation";
import { Storiessk } from "@/components/skeltons/stories";
import { SuggestionsSkeleton } from "@/components/skeltons/suggestions";
import { Button } from "@/components/ui/button";
import { useTag } from "@/context/TagProvider";
import type { Post } from "@/lib/types/types";

type StoriesProps = {
    posts: Post[];
};

const Stories = ({ posts }: StoriesProps) => {
    const { data: stories, isLoading } = useStories();
    const { activeTag, setActiveTag } = useTag();
    const uniqueTags = [...new Set(posts.map((p) => p.tag))];
    return (
        <aside>

            <aside className="home-creators">

                {/* Stories */}
                {isLoading ? (
                    <Storiessk />
                ) : (
                    <>
                        <h3 className="small-semibold mb-4">Stories</h3>

                        <div className="flex gap-4">
                            {stories?.map(function (e) {
                                return (
                                    <div key={e._id} className="flex flex-col items-center gap-2">
                                        <div className="h-14 w-14 rounded-full bg-primary-500 flex-center text-sm font-bold">
                                            {e.userId[0]}
                                        </div>
                                        <p className="tiny-medium text-light-4">
                                            {e.userId}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

            </aside>




            {/* SUGGESTIONS */}
            <SuggestionsSkeleton/>




            {/* Recommendations */}
            {uniqueTags.length > 0 ? (
                <div>
                    <h3 className="small-semibold mb-4">Recommendations</h3>

                    <div className="flex gap-3 flex-wrap">
                        {uniqueTags.map(function (tag) {
                            return (
                                <Button
                                    key={tag}
                                    onClick={() =>
                                        setActiveTag(activeTag === tag ? null : tag)
                                    }
                                    className={`px-4 py-2 rounded-full small-medium transition ${activeTag === tag
                                            ? "bg-primary-500"
                                            : "bg-dark-4 hover:bg-dark-3"
                                        }`}
                                >
                                    {tag}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ) : (<Recomendation />)}
        </aside>
    );
};

export default Stories;
