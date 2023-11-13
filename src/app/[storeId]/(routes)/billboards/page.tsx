import BillboardClient from "@/components/client/billboard-client";

const BillboardsPage = ({ params }: { params: { storeId: string } }) => {
  const billboard = [
    {
      id: "string",
      name: "shirt",
      imageUrl: "string",
      storeId: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "string",
      name: "book",
      imageUrl: "string",
      storeId: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "string",
      name: "pen",
      imageUrl: "string",
      storeId: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return <BillboardClient items={billboard} />;
};

export default BillboardsPage;
