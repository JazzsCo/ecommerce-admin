"use client";

import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard, Category } from "@prisma/client";
import { FC } from "react";
import {
  BillboardColumnProps,
  billboardColumn,
} from "../column/billboard-column";
import { DataTable } from "../ui/data-table";
import ApiAlert from "../api-alert";
import {
  CategoryColumnProps,
  categorieColumn,
} from "../column/category-column";
import { useOrigin } from "@/hook/use-origin";

interface CategoryClientProps {
  categoryColumnData: CategoryColumnProps[];
}

const CategoryClient: FC<CategoryClientProps> = ({ categoryColumnData }) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${categoryColumnData.length})`}
          description="Manage yours category 🫤"
        />
        <Button
          type="button"
          onClick={() =>
            router.push("/" + params.storeId + "/categories/create-new")
          }
        >
          Create New
        </Button>
      </div>

      <Separator />

      <DataTable
        searchKey="name"
        columns={categorieColumn}
        data={categoryColumnData}
      />

      <Separator />

      <>
        <Heading title="Api List" description="Manage yours api list" />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/categories"}
          role="user"
        />
        <ApiAlert
          title="GET"
          description={
            origin + "/api/" + params.storeId + "/categories/<categoryId>"
          }
          role="user"
        />
        <ApiAlert
          title="POST"
          description={origin + "/api/" + params.storeId + "/categories"}
          role="admin"
        />
        <ApiAlert
          title="PATCH"
          description={
            origin + "/api/" + params.storeId + "/categories/<categoryId>"
          }
          role="admin"
        />
        <ApiAlert
          title="DELETE"
          description={
            origin + "/api/" + params.storeId + "/categories/<categoryId>"
          }
          role="admin"
        />
      </>
    </div>
  );
};

export default CategoryClient;
