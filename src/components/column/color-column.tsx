"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColorCellAction from "../celll-action/color-cell-action";

export type ColorColumnProps = {
  id: string;
  name: string;
  value: string;
  date: string;
};

export const colorColumn: ColumnDef<ColorColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Price",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColorCellAction item={row.original} />,
  },
];
