"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../cell-action";

export type ColorColumnProps = {
  id: string;
  name: string;
  date: string;
};

export const colorColumn: ColumnDef<ColorColumnProps>[] = [
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
