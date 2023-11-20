"use client";

import { ColumnDef } from "@tanstack/react-table";
import CategoryCellAction from "../celll-action/category-cell-action";

export type CategoryColumnProps = {
  id: string;
  name: string;
  categoryName: string;
  date: string;
};

export const categorieColumn: ColumnDef<CategoryColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
