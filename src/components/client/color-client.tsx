"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard, Color } from "@prisma/client";
import { FC } from "react";
import {
  BillboardColumnProps,
  billboardColumn,
} from "../column/billboard-column";
import { DataTable } from "../ui/data-table";
import ApiAlert from "../api-alert";
import { SizeColumnProps, sizeColumn } from "../column/size-column";
import { ColorColumnProps, colorColumn } from "../column/color-column";
import { useOrigin } from "@/hook/use-origin";

interface ColorClientProps {
  items: Color[];
}

const ColorClient: FC<ColorClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const colorColumnData: ColorColumnProps[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Color (${items.length})`}
          description="Manage yours color 🫤"
        />
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

      <Separator />

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
          title="PATCH"
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
