"use client";

import { useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const BillboardsPage = ({ params }: { params: { storeId: string } }) => {
  const router = useRouter();

  return (
    <div className="p-4 px-6 space-y-3">
      <div className="flex items-center justify-between">
        <Heading title="Billboard(0)" description="Manage yours billboard 🫤" />
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
    </div>
  );
};

export default BillboardsPage;
