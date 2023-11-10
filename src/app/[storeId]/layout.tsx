import React from "react";

import StoreSwitcher from "@/components/store-switcher";
import ThemeToggle from "@/components/theme-toggle";
import CurrentUserAvatar from "@/components/current-user-avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import MainNav from "@/components/main-nav";

export default async function OverViewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <nav>
      <div className="border-b dark:border-b-slate-800 p-5 flex items-center">
        <StoreSwitcher />
        <div className="mx-2">
          <MainNav />
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <CurrentUserAvatar user={user} />
        </div>
      </div>
      {children}
    </nav>
  );
}
