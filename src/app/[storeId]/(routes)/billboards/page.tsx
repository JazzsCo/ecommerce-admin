import prisma from "@/lib/prisma";
import BillboardClient from "@/components/client/billboard-client";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BillboardClient items={billboard} />;
};

export default BillboardsPage;
