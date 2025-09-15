"use client";

import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/providers/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HeaderSearchBar from "./search-bar";

const mobileNavItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function HeaderRight() {
  const { total } = useCart();
  return (
    <div className="flex items-center space-x-2">
      <HeaderSearchBar />
      {/* Mobile Search */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Account */}
      <Button variant="ghost" size="icon" className="hidden sm:flex">
        <User className="h-5 w-5" />
        <span className="sr-only">Account</span>
      </Button>

      {/* Cart */}
      <Link href="/cart">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {total > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {total}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </Link>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex items-center space-x-2 pb-4 border-b">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  B
                </span>
              </div>
              <span className="font-bold text-xl">Brand</span>
            </div>

            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              {mobileNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" className="justify-start">
                <User className="mr-2 h-4 w-4" />
                My Account
              </Button>
              <Button variant="outline" className="justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button variant="outline" className="justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default HeaderRight;
