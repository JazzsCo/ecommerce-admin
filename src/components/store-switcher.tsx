"use client";

import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hook/use-store-modal";

interface StoreSwitcherProps {
  items: Store[];
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ items }) => {
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();

  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const currentStore = items.find((item) => item.id === params.storeId);

  const onStoreSelect = (store: Store) => {
    setOpen(false);
    router.push(`/${store.id}`);
  };

  const onCreateStore = () => {
    setOpen(false);
    storeModal.onOpen();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Selete a store"
          className="w-[180px] flex justify-between"
        >
          <StoreIcon className="w-4 h-4" />
          <h3>{currentStore?.name}</h3>
          <ChevronsUpDown className="w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search a store" />
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => onStoreSelect(item)}
                  className="flex items-center justify-between"
                >
                  <StoreIcon className="w-4 h-4" />
                  <h3>{item.name}</h3>
                  <Check
                    className={cn(
                      "w-4 h-4",
                      item.id === currentStore?.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty placeholder="No store found." />
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => onCreateStore()}
                className="flex items-center justify-between"
              >
                <PlusCircle className="w-4 h-4" />
                <h3>Create Store</h3>
                <div></div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
