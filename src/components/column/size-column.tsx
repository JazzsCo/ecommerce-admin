"use client";

import { ColumnDef } from "@tanstack/react-table";
import SizeCellAction from "../celll-action/size-cell-action";

export type SizeColumnProps = {
  id: string;
  name: string;
  price: string;
  date: string;
};

export const sizeColumn: ColumnDef<SizeColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <SizeCellAction item={row.original} />,
  },
];
