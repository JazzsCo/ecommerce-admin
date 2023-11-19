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
import { useOrigin } from "@/hook/use-origin";

interface BillboardClientProps {
  items: Billboard[];
}

const BillboardClient: FC<BillboardClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const billboardColumnData: BillboardColumnProps[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    date: format(item.createdAt, "MMM do, y"),
  }));

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${items.length})`}
          description="Manage yours billboard 🫤"
        />
        <Button
          type="button"
          onClick={() =>
            router.push("/" + params.storeId + "/billboards/create-new")
          }
        >
          Create New
        </Button>
      </div>

      <Separator />

      <DataTable
        searchKey="name"
        columns={billboardColumn}
        data={billboardColumnData}
      />

      <Separator />

      <>
        <Heading title="Api List" description="Manage yours api list" />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/billboards"}
          role="user"
        />
        <ApiAlert
          title="GET"
          description={
            origin + "/api/" + params.storeId + "/billboards/<billboardId>"
          }
          role="user"
        />
        <ApiAlert
          title="POST"
          description={origin + "/api/" + params.storeId + "/billboards"}
          role="admin"
        />
        <ApiAlert
          title="PATCH"
          description={
            origin + "/api/" + params.storeId + "/billboards/<billboardId>"
          }
          role="admin"
        />
        <ApiAlert
          title="DELETE"
          description={
            origin + "/api/" + params.storeId + "/billboards/<billboardId>"
          }
          role="admin"
        />
      </>
    </div>
  );
};

export default BillboardClient;
