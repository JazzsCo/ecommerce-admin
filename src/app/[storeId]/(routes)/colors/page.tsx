import { format } from "date-fns";

import prisma from "@/lib/prisma";
import ColorClient from "@/components/client/color-client";
import { ColorColumnProps } from "@/components/column/color-column";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const color = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const colorColumnData: ColorColumnProps[] = color.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return <ColorClient colorColumnData={colorColumnData} />;
};

export default ColorsPage;
