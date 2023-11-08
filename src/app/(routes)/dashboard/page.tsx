import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/dist/components";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <LogoutLink>log Out</LogoutLink>
    </div>
  );
}
