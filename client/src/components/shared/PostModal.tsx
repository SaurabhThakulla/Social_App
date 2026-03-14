import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { icons } from "@/assets/icons/icons";
import CommentList from "@/components/shared/CommentList";
import type { FeedPost, PostComment } from "@/lib/types/types";
import type { UseFormReturn } from "react-hook-form";
import type { CommentFormValues } from "@/hooks/usePostComments";

type PostModalProps = {
  post: FeedPost | null;
  onClose: () => void;
  formatDate: (date: string) => string;
  comments?: PostComment[];
  form: UseFormReturn<CommentFormValues>;
  onSubmit: (values: CommentFormValues) => void;
};

const PostModal = ({
  post,
  onClose,
  formatDate,
  comments,
  form,
  onSubmit,
}: PostModalProps) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      <div className="flex-1 flex items-center justify-center relative">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-white text-2xl"
        >
          âœ•
        </button>
        <img
          src={post.media?.[0]?.url}
          className="max-h-[100vh] object-contain"
        />
      </div>
      <div className="hidden md:flex w-[380px] bg-dark-2 border-l border-dark-4 p-6 flex-col">
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center overflow-hidden">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={`${post.username} avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-light-2">{post.username[0]}</span>
            )}
          </div>
          <div>
            <p>{post.name || post.username}</p>
            <p className="text-sm text-gray-400">
              @{post.username} •{" "}
              {formatDate(post.created_at)}
            </p>
          </div>
        </div>
        <p className="mb-4 break-words">{post.content}</p>
        <div className="flex gap-2 mb-6">
          <Button className="shad-button_primary w-full">
            <img src={icons.like} alt="" />
            {post.likes_count}
          </Button>
          <Button className="shad-button_primary w-full">
            <img src={icons.comment} alt="" />
            {post.comments_count}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4">
          <CommentList comments={comments} formatDate={formatDate} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
            <Button type="submit" className="shad-button_primary w-full">
              Post Comment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostModal;
