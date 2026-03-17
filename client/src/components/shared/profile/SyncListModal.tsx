import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types/types";

type SyncListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  isLoading: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
  canRemove?: boolean;
  onRemoveSync?: (userId: string) => void;
  removingId?: string | null;
};

const SyncListModal = ({
  isOpen,
  onClose,
  users,
  isLoading,
  canLoadMore,
  onLoadMore,
  canRemove,
  onRemoveSync,
  removingId,
}: SyncListModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-dark-2 border border-dark-4 rounded-2xl w-[92vw] max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="base-semibold">Syncs</h3>
          <Button
            type="button"
            variant="ghost"
            className="text-light-2"
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        {isLoading && users.length === 0 ? (
          <p className="text-sm text-light-4">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-light-4">No syncs yet</p>
        ) : (
          <div className="max-h-[55vh] overflow-y-auto custom-scrollbar flex flex-col gap-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-dark-4 overflow-hidden flex items-center justify-center text-xs">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-light-2">
                      {user.username?.[0] || "U"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-light-2">{user.username}</p>
                {canRemove && onRemoveSync ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="ml-auto text-red-400 hover:text-red-300"
                    disabled={isLoading || removingId === user.id}
                    onClick={() => onRemoveSync(user.id)}
                  >
                    {removingId === user.id ? "Removing..." : "Remove"}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          {canLoadMore && (
            <Button
              type="button"
              className="shad-button_primary w-full"
              disabled={isLoading}
              onClick={onLoadMore}
            >
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncListModal;



