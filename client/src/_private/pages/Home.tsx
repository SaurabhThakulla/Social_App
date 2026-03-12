/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePosts } from "@/api/queries";
import { createPost, likePost, addComment } from "@/api/api";
import FeedLoader from "@/components/skeltons/feed";
import { Button } from "@/components/ui/button";
import { useTag } from "@/context/TagProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
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

const USER_ID = "d8cfadee-a435-4fba-8686-a8183fa26862";

const Home = () => {
  const { data: posts, isLoading } = usePosts();
  const { activeTag } = useTag();

  const [openPost, setOpen] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState("");

  const queryClient = useQueryClient();

  const form = useForm({ defaultValues: { comment: "" } });

  const createPostMutation = useMutation({
    mutationFn: () => createPost(USER_ID, newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPost("");
    },
  });

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId, USER_ID),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any[] | undefined) => {
        if (!old) return old;

        return old.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        );
      });

      return { previousPosts };
    },

    onError: (_err, _postId, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
  });

  const commentMutation = useMutation({
    mutationFn: ({ postId, comment }: any) =>
      addComment(postId, USER_ID, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onSubmit = (values: any) => {
    if (!openPost) return;

    commentMutation.mutate({
      postId: openPost.id,
      comment: values.comment,
    });

    form.reset();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  if (isLoading) return <FeedLoader />;

  return (
    <section className="home-container xl:w-[44vw] w-full">
      {/* CREATE POST */}
      <div className="bg-dark-2 border border-dark-4 rounded-2xl p-5 mb-6 shadow-sm w-full">
        <div className="flex gap-3">
          {/* avatar */}
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center font-semibold text-white">
            U
          </div>
          <div className="flex-1">
            <Input
              placeholder="What's happening?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-3 bg-dark-3 border-dark-4 focus-visible:ring-0"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">
                Share something with the community
              </p>
              <Button
                disabled={!newPost.trim()}
                onClick={() => createPostMutation.mutate()}
                className="shad-button_primary px-6"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-posts mx-auto">
        {(posts || []).map((post: Post) => {
          const image = post.media?.[0]?.url;
          return (
            <div
              key={post.id}
              className="w-full mb-6 bg-dark-2 border border-dark-4 rounded-2xl p-5"
            >
              {/* HEADER */}
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
              {/* IMAGE */}
              {image && (
                <img
                  src={image}
                  className="w-full rounded-xl mb-3 cursor-pointer h-[500px] object-cover"
                  onClick={() => setOpen(post)}
                />
              )}
              {/* CONTENT */}
              <p className="mb-4 break-words">{post.content}</p>
              {/* ACTIONS */}
              <div className="flex justify-between border-t pt-3">
                <Button
                  onClick={() => likeMutation.mutate(post.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
                >
                  <span>{post.likes_count}</span>
                  <img src={icons.like} className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => setOpen(post)}
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-dark-3"
                >
                  💬 {post.comments_count}
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
        })}
        {/* MODAL */}
        {openPost && (
          <div className="fixed inset-0 bg-black z-50 flex">
            <div className="flex-1 flex items-center justify-center relative">
              <button
                onClick={() => setOpen(null)}
                className="absolute top-5 left-5 text-white text-2xl"
              >
                ✕
              </button>
              <img
                src={openPost.media?.[0]?.url}
                className="max-h-[100vh] object-contain"
              />
            </div>
            {/* RIGHT PANEL */}
            <div className="hidden md:flex w-[380px] bg-dark-2 border-l border-dark-4 p-6 flex-col">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  {openPost.username[0]}
                </div>
                <div>
                  <p>{openPost.username}</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(openPost.created_at)}
                  </p>
                </div>
              </div>
              <p className="mb-4 break-words">{openPost.content}</p>
              <div className="flex gap-2 mb-6">
                <Button className="shad-button_primary w-full">
                  {icons.like} {openPost.likes_count}
                </Button>
                <Button className="shad-button_primary w-full">
                  💬 {openPost.comments_count}
                </Button>
              </div>
              {/* COMMENT FORM */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Comment</FormLabel>
                        <FormControl>
                          <Input placeholder="Write comment..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="shad-button_primary w-full"
                  >
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