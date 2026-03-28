import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { icons } from "@/assets/icons/icons";
import type { ChangeEvent, RefObject } from "react";

type EditProfileModalProps = {
  isOpen: boolean;
  isSaving: boolean;
  name: string;
  username: string;
  bio: string;
  avatarPreview: string | null;
  avatarInputRef: RefObject<HTMLInputElement | null>;
  onAvatarSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onAvatarClick: () => void;
  onClearAvatar: () => void;
  onNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  canSave: boolean;
};

const EditProfileModal = ({
  isOpen,
  isSaving,
  name,
  username,
  bio,
  avatarPreview,
  avatarInputRef,
  onAvatarSelect,
  onAvatarClick,
  onClearAvatar,
  onNameChange,
  onUsernameChange,
  onBioChange,
  onClose,
  onSave,
  canSave,
}: EditProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-dark-2 border border-dark-4 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="base-semibold">Edit Profile</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-light-4 hover:text-light-1"
          >
            x
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full border border-dark-4 overflow-hidden bg-dark-3">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-light-4 text-sm">
                No photo
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={onAvatarSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={onAvatarClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-3 border border-dark-4 text-light-2 hover:bg-dark-2 transition"
            >
              <img src={icons.fileUpload} className="w-4 h-4" />
              <span className="text-sm">Upload photo</span>
            </button>
            <button
              type="button"
              onClick={onClearAvatar}
              className="text-xs text-light-4 hover:text-light-1 text-left"
            >
              Remove photo
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-light-3">Name</label>
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="mt-2 bg-dark-3 border-dark-4 focus-visible:ring-0 text-light-1"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs text-light-3">Username</label>
            <Input
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              className="mt-2 bg-dark-3 border-dark-4 focus-visible:ring-0 text-light-1"
              placeholder="username"
            />
          </div>
          <div>
            <label className="text-xs text-light-3">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
              placeholder="Tell something about yourself"
              className="mt-2 w-full min-h-[96px] rounded-md border border-dark-4 bg-dark-3 px-3 py-2 text-sm text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-dark-3 border border-dark-4 hover:bg-dark-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={!canSave || isSaving}
            className="flex-1 shad-button_primary"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
