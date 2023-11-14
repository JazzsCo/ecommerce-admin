import ColorClient from "@/components/client/color-client";

const ColorsPage = ({ params }: { params: { storeId: string } }) => {
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

  return <ColorClient items={billboard} />;
};

export default ColorsPage;
