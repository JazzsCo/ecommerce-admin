"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import {
  ProductColumnProps,
  productColumn,
} from "@/components/column/product-column";
import ApiAlert from "@/components/api-alert";
import { useOrigin } from "@/hook/use-origin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductClientProps {
  productColumnData: ProductColumnProps[];
}

const ProductClient: FC<ProductClientProps> = ({ productColumnData }) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${productColumnData.length})`}
          description="Manage yours Product 🫤"
        />
        <Button
          type="button"
          onClick={() =>
            router.push("/" + params.storeId + "/products/create-new")
          }
        >
          Create New
        </Button>
      </div>

      <Separator />

      <DataTable
        searchKey="name"
        columns={productColumn}
        data={productColumnData}
      />

      <Separator />

      <>
        <Heading title="Api List" description="Manage yours api list" />
        <ApiAlert
          title="GET"
          description={origin + "/api/" + params.storeId + "/products"}
          role="user"
        />
        <ApiAlert
          title="GET"
          description={
            origin + "/api/" + params.storeId + "/products/<productId>"
          }
          role="user"
        />
        <ApiAlert
          title="POST"
          description={origin + "/api/" + params.storeId + "/products"}
          role="admin"
        />
        <ApiAlert
          title="PATCH"
          description={
            origin + "/api/" + params.storeId + "/products/<productId>"
          }
          role="admin"
        />
        <ApiAlert
          title="DELETE"
          description={
            origin + "/api/" + params.storeId + "/products/<productId>"
          }
          role="admin"
        />
      </>
    </div>
  );
};

export default ProductClient;
