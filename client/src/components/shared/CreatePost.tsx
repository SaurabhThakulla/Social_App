import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { icons } from "@/assets/icons/icons";
import type { ChangeEvent, RefObject } from "react";

type CreatePostProps = {
  newPost: string;
  onNewPostChange: (value: string) => void;
  canPost: boolean;
  onSubmit: () => void;
  isPosting: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  onSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  newImageDataUrl: string;
  newImageName: string;
  imageError: string | null;
  onClearImage: () => void;
};

const CreatePost = ({
  newPost,
  onNewPostChange,
  canPost,
  onSubmit,
  isPosting,
  fileInputRef,
  onSelectImage,
  newImageDataUrl,
  newImageName,
  imageError,
  onClearImage,
}: CreatePostProps) => {
  return (
    <div className="bg-dark-2 border border-dark-4 rounded-2xl p-5 mb-6 shadow-sm w-full">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center font-semibold text-white">
          U
        </div>
        <div className="flex-1">
          <Input
            placeholder="What's happening?"
            value={newPost}
            onChange={(e) => onNewPostChange(e.target.value)}
            className="mb-3 bg-dark-3 border-dark-4 focus-visible:ring-0"
          />
          <div className="flex items-center gap-3 mb-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onSelectImage}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-3 border border-dark-4 text-light-2 hover:bg-dark-2 transition"
            >
              <img src={icons.galleryAdd} className="w-5 h-5" />
              <span className="text-sm">Photo</span>
            </button>

            {newImageDataUrl && (
              <div className="flex items-center gap-2 text-xs text-light-3">
                <img
                  src={newImageDataUrl}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="max-w-[140px] truncate">
                  {newImageName || "image"}
                </span>
                <button
                  type="button"
                  onClick={onClearImage}
                  className="text-light-4 hover:text-light-1 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          {imageError && (
            <p className="text-xs text-red-400 mb-2">{imageError}</p>
          )}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
              Share something with the community
            </p>
            <Button
              disabled={!canPost || isPosting}
              onClick={onSubmit}
              className="shad-button_primary px-6"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
