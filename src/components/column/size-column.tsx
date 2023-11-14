"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../cell-action";

export type SizeColumnProps = {
  id: string;
  name: string;
  date: string;
};

export const sizeColumn: ColumnDef<SizeColumnProps>[] = [
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
    cell: ({ row }) => <CellAction items={row.original} />,
  },
];
