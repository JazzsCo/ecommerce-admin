import prisma from "@/lib/prisma";
import ProductForm from "@/components/form/product-form";

const ProductByIDPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
      storeId: params.storeId,
    },
  });

  const size = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const color = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const category = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 px-6">
      <ProductForm
        initialData={product}
        sizes={size}
        colors={color}
        categories={category}
      />
    </div>
  );
};

export default ProductByIDPage;
