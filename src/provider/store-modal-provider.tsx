"use client";

import React, { useEffect, useState } from "react";

import StoreModal from "@/components/store-modal";

const StoreModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <StoreModal />;
};

export default StoreModalProvider;
