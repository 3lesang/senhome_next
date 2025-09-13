"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { getListProductPocket } from "@/pocketbase/product/list";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { ListResult } from "pocketbase";
import React from "react";
import { ProductCard } from "../card";
import { ProductFilters } from "../filter";
import { products } from "./product";

export const ListProductPage: React.FC = () => {
  const { data } = useQuery<ListResult<Product>>({
    queryKey: [PRODUCT_COLLECTION],
    queryFn: () => getListProductPocket(),
  });

  return (
    <div className="bg-background">
      <div className="container py-8 mx-auto">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  All Products
                </h1>
                <p className="text-muted-foreground">
                  Showing {data?.totalItems} of {products.length} products
                </p>
              </div>
              <ProductFilters />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Products */}
            {data?.totalItems === 0 ? (
              <div className="text-muted-foreground mb-4 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p>Try adjusting your filters or search terms</p>
                <Button onClick={() => {}}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
