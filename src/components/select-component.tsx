"use client";

import {
  Select as SelectDemeo,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Billboard, Category, Color, Size } from "@prisma/client";
import { FC } from "react";

interface SelectProps {
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: () => void;
  items: Billboard[] | Category[] | Size[] | Color[];
}

const Select: FC<SelectProps> = ({
  value,
  placeholder,
  disabled,
  onChange,
  items,
}) => {
  return (
    <SelectDemeo
      disabled={disabled}
      defaultValue={value}
      onValueChange={onChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectDemeo>
  );
};

export default Select;
