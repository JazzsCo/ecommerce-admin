import prisma from "@/lib/prisma";

import CategoryClient from "@/components/client/category-client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const category = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("CATEGORY CLIENT", category);

  return <CategoryClient items={category} />;
};

export default CategoriesPage;
