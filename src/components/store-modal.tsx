"use client";

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hook/use-store-modal";

const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Test"
      description="Test description to test"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>hello</div>
    </Modal>
  );
};

export default StoreModal;
