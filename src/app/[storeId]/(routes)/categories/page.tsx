import { format } from "date-fns";

import prisma from "@/lib/prisma";
import CategoryClient from "@/components/client/category-client";
import { CategoryColumnProps } from "@/components/column/category-column";

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

  const categoryColumnData: CategoryColumnProps[] = category.map((item) => ({
    id: item.id,
    name: item.name,
    billboardName: item.billboard.name,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return <CategoryClient categoryColumnData={categoryColumnData} />;
};

export default CategoriesPage;
