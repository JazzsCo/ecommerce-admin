import React from "react";

export default function OverViewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <div>
      OverViewLayout {params.storeId}
      {children}
    </div>
  );
}
