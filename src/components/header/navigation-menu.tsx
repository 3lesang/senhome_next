import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Package, Shield, Star, Truck, Zap } from "lucide-react";
import Link from "next/link";

const navigationItems = [
  {
    title: "Sản phẩm",
    href: "/products",
    description: "Browse our complete product catalog",
    items: [
      {
        title: "New Arrivals",
        href: "/new",
        description: "Latest products and collections",
        icon: Star,
      },
      {
        title: "Best Sellers",
        href: "/bestsellers",
        description: "Most popular items",
        icon: Zap,
      },
      {
        title: "Categories",
        href: "/categories",
        description: "Shop by category",
        icon: Package,
      },
    ],
  },
  {
    title: "Dịch vụ",
    href: "/services",
    description: "Our professional services",
    items: [
      {
        title: "Fast Shipping",
        href: "/shipping",
        description: "Free delivery on orders over $50",
        icon: Truck,
      },
      {
        title: "Warranty",
        href: "/warranty",
        description: "Comprehensive product protection",
        icon: Shield,
      },
    ],
  },
];

function HeaderNavigationMenu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger className="h-9 bg-transparent">
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <div className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href={item.href}
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {item.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="grid gap-2">
                  {item.items.map((subItem) => (
                    <NavigationMenuLink key={subItem.title} asChild>
                      <Link
                        href={subItem.href}
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        <div className="flex items-center gap-2">
                          <subItem.icon className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">
                            {subItem.title}
                          </div>
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <Link href="/about">Giới thiệu</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <Link href="/contact">Liện hệ</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default HeaderNavigationMenu;
