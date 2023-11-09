"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hook/use-store-modal";

export default function LandingPage() {
  const storeModal = useStoreModal();

  return (
    <div>
      LandingPage
      <div>
        <Button onClick={storeModal.onOpen}>Create Store</Button>
      </div>
    </div>
  );
}
