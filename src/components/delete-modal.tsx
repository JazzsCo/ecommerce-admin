import { FC } from "react";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end space-x-2 mt-2">
        <Button type="button" variant="outline" size="lg" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={onDelete}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
