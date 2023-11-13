"use client";

import { FC } from "react";
import { BillboardColumnProps } from "./column/billboard-column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

interface CellActionProps {
  items: BillboardColumnProps;
}

const CellAction: FC<CellActionProps> = ({ items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-6 h-5">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => {}} className="flex items-center">
            <Copy className="w-4 h-4 mr-3" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} className="flex items-center">
            <Edit className="w-4 h-4 mr-3" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} className="flex items-center">
            <Trash className="w-4 h-4 mr-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
