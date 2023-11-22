import prisma from "@/lib/prisma";

import ColorClient from "@/components/client/color-client";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const color = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ColorClient items={color} />;
};

export default ColorsPage;
