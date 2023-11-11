"use client";

import { FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hook/use-store-modal";

interface CheckUserStoreProps {
  storeId?: string;
}

const CheckUserStore: FC<CheckUserStoreProps> = ({ storeId }) => {
  const storeModal = useStoreModal();

  return (
    <div>
      {storeId ? (
        <div>
          <Link href={"/" + storeId}>
            <Button>Go to over view</Button>
          </Link>
        </div>
      ) : (
        <Button onClick={storeModal.onOpen}>Create Store</Button>
      )}
    </div>
  );
};

export default CheckUserStore;
