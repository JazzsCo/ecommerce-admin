"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { FC } from "react";
import {
  BillboardColumnProps,
  billboardColumn,
} from "../column/billboard-column";
import { DataTable } from "../ui/data-table";
import ApiAlert from "../api-alert";
import { SizeColumnProps, sizeColumn } from "../column/size-column";
import { ColorColumnProps, colorColumn } from "../column/color-column";

interface ColorClientProps {
  items: Billboard[];
}

const ColorClient: FC<ColorClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();

  const colorColumnData: ColorColumnProps[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading title="Color(0)" description="Manage yours color 🫤" />
        <Button
          type="button"
          onClick={() =>
            router.push("/" + params.storeId + "/colors/create-new")
          }
        >
          Create New
        </Button>
      </div>

      <Separator />

      <DataTable
        searchKey="name"
        columns={colorColumn}
        data={colorColumnData}
      />

      <Separator className="h-[0.5px]" />
      <>
        <Heading title="Api List" description="Manage yours api list" />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/colors"}
          role="user"
        />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/colors/<colorId>"}
          role="user"
        />
        <ApiAlert
          title="POST"
          description={origin + "/api/" + params.storeId + "/colors"}
          role="admin"
        />
        <ApiAlert
          title="POST"
          description={origin + "/api/" + params.storeId + "/colors/<colorId>"}
          role="admin"
        />
        <ApiAlert
          title="DELETE"
          description={origin + "/api/" + params.storeId + "/colors/<colorId>"}
          role="admin"
        />
      </>
    </div>
  );
};

export default ColorClient;
