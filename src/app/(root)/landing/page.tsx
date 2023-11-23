import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";
import CheckUserStore from "@/components/check-user-store";

export default async function LandingPage() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const store = await prisma.store.findFirst({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div>
      LandingPage
      <div>
        <CheckUserStore storeId={store?.id} />
      </div>
    </div>
  );
}
