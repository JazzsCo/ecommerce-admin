"use client";

import { useRouter } from "next/navigation";

import CategoryForm from "@/components/form/category-form";

const CategoryByIDPage = ({
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
    router.push("/" + params.storeId + "/categories/create-new");
  }

  return (
    <div className="p-4 px-6">
      <CategoryForm initialData={store} />
    </div>
  );
};

export default CategoryByIDPage;
