import prisma from "@/lib/prisma";

import SizeForm from "@/components/form/size-form";

const SizeByIDPage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="p-4 px-6">
      <SizeForm initialData={size} />
    </div>
  );
};

export default SizeByIDPage;
