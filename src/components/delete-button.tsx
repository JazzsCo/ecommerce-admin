import { Button } from "@/components/ui/button";
import Modal from "./ui/modal";
import { FC, useState } from "react";

interface DeleteModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelte: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onDelte,
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
          onClick={onDelte}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
