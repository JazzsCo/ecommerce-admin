"use client";

import {
  Hand,
  Keyboard,
  MenuIcon,
  Palette,
  Settings,
  Shield,
  Webhook,
  Projector,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileSideBar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      icon: Shield,
      name: "Overview",
      href: "/" + params.storeId,
      active: pathname === "/" + params.storeId,
    },
    {
      icon: Webhook,
      name: "Billboards",
      href: "/" + params.storeId + "/billboards",
      active: pathname === "/" + params.storeId + "/billboards",
    },
    {
      icon: Hand,
      name: "Categories",
      href: "/" + params.storeId + "/categories",
      active: pathname === "/" + params.storeId + "/categories",
    },
    {
      icon: Keyboard,
      name: "Sizes",
      href: "/" + params.storeId + "/sizes",
      active: pathname === "/" + params.storeId + "/sizes",
    },
    {
      icon: Palette,
      name: "Colors",
      href: "/" + params.storeId + "/colors",
      active: pathname === "/" + params.storeId + "/colors",
    },
    {
      icon: Projector,
      name: "Products",
      href: "/" + params.storeId + "/products",
      active: pathname === "/" + params.storeId + "/products",
    },
    {
      icon: Settings,
      name: "Settings",
      href: "/" + params.storeId + "/settings",
      active: pathname === "/" + params.storeId + "/settings",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Logo</SheetTitle>
        </SheetHeader>
        <div className="p-2 mt-2 flex flex-col gap-y-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm -tracking-tighter font-semibold hover:opacity-70 group",
                route.active ? "opacity-70" : ""
              )}
            >
              <SheetClose asChild>
                <div className="flex items-center space-x-2">
                  <route.icon className="w-5 h-5" />
                  <h3>{route.name}</h3>
                </div>
              </SheetClose>
            </Link>
          ))}
        </div>
        {/* <SheetFooter>
          <div>Some thing to do.</div>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
