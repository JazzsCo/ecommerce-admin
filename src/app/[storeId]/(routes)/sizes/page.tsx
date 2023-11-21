import prisma from "@/lib/prisma";
import SizeClient from "@/components/client/size-client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <SizeClient items={size} />;
};

export default SizesPage;
