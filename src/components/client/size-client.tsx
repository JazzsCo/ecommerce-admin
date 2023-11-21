"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard, Size } from "@prisma/client";
import { FC } from "react";
import {
  BillboardColumnProps,
  billboardColumn,
} from "../column/billboard-column";
import { DataTable } from "../ui/data-table";
import ApiAlert from "../api-alert";
import { SizeColumnProps, sizeColumn } from "../column/size-column";

interface SizeClientProps {
  items: Size[];
}

const SizeClient: FC<SizeClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();

  const sizeColumnData: SizeColumnProps[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.value,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Size (${items.length})`}
          description="Manage yours size 🫤"
        />
        <Button
          type="button"
          onClick={() =>
            router.push("/" + params.storeId + "/sizes/create-new")
          }
        >
          Create New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={sizeColumn} data={sizeColumnData} />

      <Separator />

      <>
        <Heading title="Api List" description="Manage yours api list" />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/sizes"}
          role="user"
        />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/sizes/<sizeId>"}
          role="user"
        />
        <ApiAlert
          title="POST"
          description={origin + "/api/" + params.storeId + "/sizes"}
          role="admin"
        />
        <ApiAlert
          title="PATCH"
          description={origin + "/api/" + params.storeId + "/sizes/<sizeId>"}
          role="admin"
        />
        <ApiAlert
          title="DELETE"
          description={origin + "/api/" + params.storeId + "/sizes/<sizeId>"}
          role="admin"
        />
      </>
    </div>
  );
};

export default SizeClient;
