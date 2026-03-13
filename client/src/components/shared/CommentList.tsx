import type { PostComment } from "@/lib/types/types";

type CommentListProps = {
  comments?: PostComment[];
  formatDate: (date: string) => string;
};

const CommentList = ({ comments, formatDate }: CommentListProps) => {
  if (!comments?.length) {
    return <p className="text-sm text-gray-400">No comments yet</p>;
  }

  return (
    <>
      {comments.map((c) => (
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
      ))}
    </>
  );
};

export default CommentList;
