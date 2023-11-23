import { format } from "date-fns";

import prisma from "@/lib/prisma";
import SizeClient from "@/components/client/size-client";
import { SizeColumnProps } from "@/components/column/size-column";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const sizeColumnData: SizeColumnProps[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.value,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return <SizeClient sizeColumnData={sizeColumnData} />;
};

export default SizesPage;
