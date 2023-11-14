"use client";

import { useRouter } from "next/navigation";

import SizeForm from "@/components/form/size-form";

const SizeByIDPage = ({
  params,
}: {
  params: { storeId: string; categoryId: string };
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
    router.push("/" + params.storeId + "/sizes/create-new");
  }

  return (
    <div className="p-4 px-6">
      <SizeForm initialData={store} />
    </div>
  );
};

export default SizeByIDPage;
