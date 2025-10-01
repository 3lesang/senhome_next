"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MENU_COLLECTION } from "@/pocketbase/consts";
import { getMenuPocket } from "@/pocketbase/menu";
import type { MenuType } from "@/types/menu";

function buildTree(
  items: MenuType[],
  parentId: string | null = null,
): MenuType[] {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      ...item,
      children: buildTree(items, item.id),
    }));
}

function MegaMenu({ item }: { item: MenuType }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-9 bg-transparent">
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid grid-cols-4 gap-6 p-6 w-[900px]">
          {/* Left column = parent info */}
          <div className="col-span-1 flex flex-col">
            <Link
              href={item.url || "#"}
              className="font-semibold text-base hover:underline mb-2"
            >
              {item.title}
            </Link>
          </div>

          {/* Child columns */}
          {item.children?.map((child) => (
            <div key={child.id} className="flex flex-col gap-2">
              <Link
                href={child.url || "#"}
                className="font-semibold text-sm text-foreground hover:underline"
              >
                {child.title}
              </Link>
              <ul className="flex flex-col gap-1">
                {child.children?.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={sub.url || "#"}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default function HeaderNavigationMenu() {
  const { data } = useQuery({
    queryKey: [MENU_COLLECTION, "header"],
    queryFn: () => getMenuPocket(`position="header"`),
  });

  const menuItems: MenuType[] = data?.items ?? [];
  const tree = buildTree(menuItems);

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {tree.map((item) =>
          item.children && item.children.length > 0 ? (
            <MegaMenu key={item.id} item={item} />
          ) : (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                asChild
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Link href={item.url || "#"}>{item.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
