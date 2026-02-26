import { usePosts } from "@/api/queries/index";
import FeedLoader from "@/components/skeltons/feed";
import { Button } from "@/components/ui/button";
import { useTag } from "@/context/TagProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { icons } from "@/assets/icons/icons";


const Home = () => {
  const { data: posts, isLoading } = usePosts();
  const { activeTag } = useTag();
  const [openPost, setOpen] = useState<any | null>(null);

  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = (values: any) => {
    console.log(values);
    form.reset();
  };

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
    <section className="home-container xl:w-[44vw] w-[100%]">
      <div className="home-posts mx-auto">
        {orderedPosts.map((e) => {
          const { authorId, content, createdAt, metrics, image } = e;
          return (
            <div key={e.id} className="w-full mb-6 bg-dark-2 border border-dark-4 rounded-2xl p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2 p-2 cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
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
                  onClick={() => setOpen(e)}
                />
              )}

              {/* Content */}
              <p className="base-regular mb-4">{content}</p>
              {/* Actions */}
              <div className="border-t border-dark-4 mt-4 pt-2">
                <div className="flex justify-between items-center text-sm text-light-2">

                  <Button
                    className="flex-1 flex items-center justify-center gap-2 
                 bg-transparent hover:bg-dark-3 
                 py-2 rounded-lg transition-all duration-200">
                    <span className="text-lg">{metrics.likes}</span>
                    <img src={icons.like} alt="" className="w-5 h-5"/>
                  </Button>

                  <Button
                    className="flex-1 flex items-center justify-center gap-2 
                 bg-transparent hover:bg-dark-3 
                 py-2 rounded-lg transition-all duration-200">
                    <span className="text-lg">💬{metrics.comments}</span> 
                  </Button>

                  <Button
                    className="flex-1 flex items-center justify-center gap-2 
                 bg-transparent hover:bg-dark-3 
                 py-2 rounded-lg transition-all duration-200" onClick={()=>{alert("This button functionality will be added soon")}}>
                    <span className="text-lg">{metrics.shares}</span>
                    <img src={icons.share} alt="" className="w-5 h-5" />
                  </Button>

                </div>
              </div>
            </div>
          );
        })}
        {openPost && (
        <div className="fixed inset-0 bg-black z-50 flex">

          {/* LEFT SIDE - Image */}
          <div className="flex-1 flex items-center justify-center relative">

            {/* Close Button */}
            <button
              onClick={() => setOpen(null)}
              className="absolute top-5 left-5 text-white text-2xl"
            >
              ✕
            </button>

            <img
                src={openPost.image}
              className="max-h-[100vh] max-w-[100vw] object-contain"
            />
          </div>

          {/* RIGHT SIDE - Info Panel */}
            <div className="hidden md:flex w-[380px] bg-dark-2 border-l border-dark-4 p-6 flex-col">
              <div className="flex gap-6">
                <h3 className="base-semibold flex w-14 h-14 justify-center text-center items-center mb-2 bg-primary-500 rounded-full">
                {"U"}
              </h3>
                <h3 className="base-semibold flex w-14 h-14 justify-center text-center items-center mb-2">
                  {openPost.authorId}
                </h3>
              </div>

            <p className="text-light-3 mb-4">
                {openPost.content}
            </p>

            <div className="flex  justify-between gap-1 mt-6 text-light-3">
                <Button className="shad-button_primary px-6 py-2 rounded-lg w-full">{icons.like}{openPost.metrics?.likes || 0}</Button>
                <Button className="shad-button_primary px-6 py-2 rounded-lg w-full">💬 {openPost.metrics?.comments || 0}</Button>
                <Button className="shad-button_primary px-6 py-2 rounded-lg w-full">{icons.share} {openPost.metrics?.shares || 0}</Button>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Comment</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write a comment..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="shad-button_primary w-full">
                    Post Comment
                  </Button>

                </form>
              </Form>
          </div>

        </div>
        )}
      </div>
    </section>
  );
};

export default Home;
