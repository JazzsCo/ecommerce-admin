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
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div
          className="p-2 w-7 h-7 rounded-full"
          style={{
            background: row.original.value,
          }}
        />

        <h3>{row.original.value}</h3>
      </div>
    ),
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
