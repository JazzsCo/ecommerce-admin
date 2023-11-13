import React from "react";

import prisma from "@/lib/prisma";
import SettingForm from "@/components/form/setting-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

export default async function SettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
      userId: user?.id,
    },
  });

  return (
    <div className="p-4 px-6">
      <SettingForm initialData={store} />
    </div>
  );
}
