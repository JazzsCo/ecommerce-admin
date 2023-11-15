import prisma from "@/lib/prisma";

import BillboardClient from "@/components/client/billboard-client";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // const billboard = [
  //   {
  //     id: "string",
  //     name: "shirt",
  //     imageUrl: "string",
  //     storeId: "string",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: "string",
  //     name: "book",
  //     imageUrl: "string",
  //     storeId: "string",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: "string",
  //     name: "pen",
  //     imageUrl: "string",
  //     storeId: "string",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ];

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
