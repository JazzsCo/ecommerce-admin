import CategoryClient from "@/components/client/categorie-client";

const CategoriesPage = ({ params }: { params: { storeId: string } }) => {
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

  return <CategoryClient items={billboard} />;
};

export default CategoriesPage;
