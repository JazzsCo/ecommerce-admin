"use client";

import { ColumnDef } from "@tanstack/react-table";
import CategoryCellAction from "../celll-action/category-cell-action";

export type CategoryColumnProps = {
  id: string;
  name: string;
  billboardName: string;
  date: string;
};

export const categorieColumn: ColumnDef<CategoryColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardName",
    header: "Billboards",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryCellAction item={row.original} />,
  },
];
