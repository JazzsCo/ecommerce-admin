"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import ApiAlert from "@/components/api-alert";
import { useOrigin } from "@/hook/use-origin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ColorColumnProps, colorColumn } from "../column/color-column";

interface ColorClientProps {
  colorColumnData: ColorColumnProps[];
}

const ColorClient: FC<ColorClientProps> = ({ colorColumnData }) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Color (${colorColumnData.length})`}
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
