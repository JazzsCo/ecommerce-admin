"use client";

import { useRouter } from "next/navigation";

import ColorForm from "@/components/form/color-form";

const ColorByIDPage = ({
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
    router.push("/" + params.storeId + "/colors/create-new");
  }

  return (
    <div className="p-4 px-6">
      <ColorForm initialData={store} />
    </div>
  );
};

export default ColorByIDPage;
