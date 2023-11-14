import SizeClient from "@/components/client/size-client";

const SizesPage = ({ params }: { params: { storeId: string } }) => {
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

  return <SizeClient items={billboard} />;
};

export default SizesPage;
