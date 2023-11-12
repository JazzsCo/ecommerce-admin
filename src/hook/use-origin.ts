"use client";

import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "");
};
