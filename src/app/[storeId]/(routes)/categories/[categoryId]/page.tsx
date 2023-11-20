import prisma from "@/lib/prisma";

import CategoryForm from "@/components/form/category-form";

const CategoryByIDPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="p-4 px-6">
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CategoryByIDPage;
