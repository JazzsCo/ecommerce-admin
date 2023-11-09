import React from "react";

import RootNav from "@/components/nav/root-nav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootNav />
      {children}
    </>
  );
}
