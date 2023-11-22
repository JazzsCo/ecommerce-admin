import prisma from "@/lib/prisma";

import ColorForm from "@/components/form/color-form";

const ColorByIDPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="p-4 px-6">
      <ColorForm initialData={color} />
    </div>
  );
};

export default ColorByIDPage;
