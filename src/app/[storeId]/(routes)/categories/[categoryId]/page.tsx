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

  const billboard = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 px-6">
      <CategoryForm initialData={category} billboards={billboard} />
    </div>
  );
};

export default CategoryByIDPage;
