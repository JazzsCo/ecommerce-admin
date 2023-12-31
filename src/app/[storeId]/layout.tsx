import React from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";
import MainNav from "@/components/main-nav";
import ThemeToggle from "@/components/theme-toggle";
import StoreSwitcher from "@/components/store-switcher";
import CurrentUserAvatar from "@/components/current-user-avatar";
import MobileSideBar from "@/components/mobile-side-bar";

export default async function OverViewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const store = await prisma.store.findMany({
    where: {
      userId: user?.id,
    },
  });

  const checkStoreId = store.find((item) => item.id === params.storeId);

  if (!checkStoreId) {
    redirect("/landing");
  }

  return (
    <main>
      <nav className="max-w-7xl m-auto">
        <div className="p-4 flex items-center">
          <StoreSwitcher items={store} />
          <div className="mx-4">
            <MainNav />
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="md:hidden  ml-auto">
              <MobileSideBar />
            </div>
            <ThemeToggle />
            <CurrentUserAvatar user={user} />
          </div>
        </div>
      </nav>
      <div className="border-b dark:border-b-slate-800" />
      <div className="max-w-7xl m-auto">{children}</div>
    </main>
  );
}
