import React from "react";

import RootNav from "@/components/nav/root-nav";
import { Button } from "@/components/ui/button";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootNav />
      <Button>Create Store</Button>
      {children}
    </>
  );
}
