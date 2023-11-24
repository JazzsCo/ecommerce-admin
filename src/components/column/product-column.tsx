"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductCellAction from "@/components/celll-action/product-cell-action";

export type ProductColumnProps = {
  id: string;
  name: string;
  price: string;
  sizeName: string;
  colorName: string;
  categoryName: string;
  isFeatured: boolean;
  isArchived: boolean;
  date: string;
};

export const productColumn: ColumnDef<ProductColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categoryName",
    header: "Categories",
  },
  {
    accessorKey: "sizeName",
    header: "Sizes",
  },
  {
    accessorKey: "colorName",
    header: "Colors",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductCellAction item={row.original} />,
  },
];
