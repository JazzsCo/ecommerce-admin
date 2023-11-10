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
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
    },
    {
      name: "Billboard",
      href: `/${params.storeId}/billboard`,
      active: pathname === `/${params.storeId}/billboard`,
    },
    {
      name: "Settings",
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className="flex items-center space-x-2">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm tracking-tight hover:text-slate-700 dark:hover:text-slate-300 hover:font-semibold",
            route.active
              ? "text-slate-700 dark:text-slate-300 font-semibold"
              : "text-black/70 dark:text-white/60"
          )}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
