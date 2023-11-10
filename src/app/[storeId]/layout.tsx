import React from "react";
import prisma from "@/lib/prisma";

import StoreSwitcher from "@/components/store-switcher";
import ThemeToggle from "@/components/theme-toggle";
import CurrentUserAvatar from "@/components/current-user-avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import MainNav from "@/components/main-nav";
import { Store } from "@prisma/client";

export default async function OverViewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  // const store = await prisma.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //     userId: user?.id,
  //   },
  // });

  const store: Store[] = [
    {
      id: "dsds",
      name: "Shoe store",
      userId: "sdksdsl",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "dsdsd",
      name: "Shirt store",
      userId: "sdksdsl",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <nav>
      <div className="border-b dark:border-b-slate-800 p-4 flex items-center">
        <StoreSwitcher items={store} />
        <div className="mx-4">
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
