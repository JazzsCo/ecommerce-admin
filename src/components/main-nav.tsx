"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      name: "Overview",
      href: "/" + params.storeId,
      active: pathname === "/" + params.storeId,
    },
    {
      name: "Billboards",
      href: "/" + params.storeId + "/billboards",
      active: pathname === "/" + params.storeId + "/billboards",
    },
    {
      name: "Categories",
      href: "/" + params.storeId + "/categories",
      active: pathname === "/" + params.storeId + "/categories",
    },
    {
      name: "Sizes",
      href: "/" + params.storeId + "/sizes",
      active: pathname === "/" + params.storeId + "/sizes",
    },
    {
      name: "Settings",
      href: "/" + params.storeId + "/settings",
      active: pathname === "/" + params.storeId + "/settings",
    },
  ];

  return (
    <div className="flex items-center space-x-2 lg:space-x-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm -tracking-tighter font-semibold hover:opacity-70",
            route.active ? "opacity-70" : ""
          )}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
