"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "../celll-action/billboard-cell-action";

export type BillboardColumnProps = {
  id: string;
  name: string;
  date: string;
};

export const billboardColumn: ColumnDef<BillboardColumnProps>[] = [
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
    cell: ({ row }) => <BillboardCellAction item={row.original} />,
  },
];
