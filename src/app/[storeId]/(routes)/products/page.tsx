import { format } from "date-fns";

import prisma from "@/lib/prisma";
import ProductClient from "@/components/client/product-client";
import { ProductColumnProps } from "@/components/column/product-column";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const product = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      size: true,
      color: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const productColumnData: ProductColumnProps[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    sizeName: item.size.name,
    colorName: item.color.name,
    categoryName: item.category.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return <ProductClient productColumnData={productColumnData} />;
};

export default CategoriesPage;
