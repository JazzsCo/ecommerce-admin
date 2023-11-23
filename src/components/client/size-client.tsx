"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import ApiAlert from "@/components/api-alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { SizeColumnProps, sizeColumn } from "@/components/column/size-column";

interface SizeClientProps {
  sizeColumnData: SizeColumnProps[];
}

const SizeClient: FC<SizeClientProps> = ({ sizeColumnData }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Size (${sizeColumnData.length})`}
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
