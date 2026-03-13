import { Button } from "@/components/ui/button";

type DeletePostConfirmProps = {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
  isDeleting: boolean;
};

const DeletePostConfirm = ({
  isOpen,
  onDelete,
  onCancel,
  isDeleting,
}: DeletePostConfirmProps) => {
  if (!isOpen) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-600/40 bg-red-900/20 p-3 text-sm text-red-200">
      <span>really want to delte this postts</span>
      <div className="flex items-center gap-2">
        <Button
          onClick={onDelete}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
        <Button onClick={onCancel} className="bg-dark-3 hover:bg-dark-4">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeletePostConfirm;
