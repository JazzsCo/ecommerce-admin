"use client";

import { useRouter } from "next/navigation";

import BillboardForm from "@/components/form/billboard-form";

const BillboardByIDPage = ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const store = {
    id: "dsds",
    name: "Shoe store",
    userId: "sdksdsl",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const router = useRouter();

  if (!false) {
    router.push("/" + params.storeId + "/billboards/create-new");
  }

  return (
    <div className="p-4 px-6">
      <BillboardForm initialData={store} />
    </div>
  );
};

export default BillboardByIDPage;
