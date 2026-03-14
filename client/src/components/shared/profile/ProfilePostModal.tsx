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
import type { FeedPost, PostComment } from "@/lib/types/types";
import type { UseFormReturn } from "react-hook-form";
import DeletePostConfirm from "@/components/shared/profile/DeletePostConfirm";
import type { ProfileCommentFormValues } from "@/hooks/useProfileComments";

type ProfilePostModalProps = {
  post: FeedPost | null;
  onClose: () => void;
  formatDate: (date: string) => string;
  comments?: PostComment[];
  form: UseFormReturn<ProfileCommentFormValues>;
  onSubmit: (values: ProfileCommentFormValues) => void;
  pendingDeleteId: string | null;
  onToggleDelete: (postId: string) => void;
  onConfirmDelete: (postId: string) => void;
  onCancelDelete: () => void;
  isDeleting: boolean;
  canDelete?: boolean;
};

const ProfilePostModal = ({
  post,
  onClose,
  formatDate,
  comments,
  form,
  onSubmit,
  pendingDeleteId,
  onToggleDelete,
  onConfirmDelete,
  onCancelDelete,
  isDeleting,
  canDelete = false,
}: ProfilePostModalProps) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      <div className="flex-1 flex items-center justify-center relative">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-white text-2xl"
        >
          x
        </button>
        {post.media?.[0]?.url ? (
          <img
            src={post.media[0].url}
            className="max-h-[100vh] max-w-[100vw] object-contain"
          />
        ) : (
          <div className="text-light-3">No image</div>
        )}
      </div>

      <div className="hidden md:flex w-[380px] bg-dark-2 border-l border-dark-4 p-6 flex-col">
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            {post.username?.[0] || "U"}
          </div>
          <div>
            <p>{post.username}</p>
            <p className="text-sm text-gray-400">
              {formatDate(post.created_at)}
            </p>
          </div>
        </div>

        <p className="mb-4 break-words">{post.content}</p>

        <div className="flex gap-2 mb-4">
          <Button className="shad-button_primary w-full">
            <img src={icons.like} alt="" />
            {post.likes_count}
          </Button>
          <Button className="shad-button_primary w-full">
            <img src={icons.comment} alt="" />
            {post.comments_count}
          </Button>
        </div>
        {canDelete && (
          <>
            <div className="mb-4">
              <Button
                onClick={() => onToggleDelete(post.id)}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Delete Post
              </Button>
            </div>
            <DeletePostConfirm
              isOpen={pendingDeleteId === post.id}
              onDelete={() => onConfirmDelete(post.id)}
              onCancel={onCancelDelete}
              isDeleting={isDeleting}
            />
          </>
        )}

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
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4 mt-4">
          {comments?.length ? (
            comments.map((c) => (
              <div key={c.id} className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs">
                    {c.username?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{c.username}</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(c.created_at)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-light-2 ml-10 mt-1 break-words">
                  {c.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostModal;
