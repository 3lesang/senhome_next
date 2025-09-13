"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ProductCard } from "@/app/products/components/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { getListProductPocket } from "@/pocketbase/product/list";

function FeaturedProducts() {
  const { data } = useQuery({
    queryKey: [PRODUCT_COLLECTION],
    queryFn: () => getListProductPocket(),
  });
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sản phẩm nổi bật
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá bộ sưu tập sản phẩm cao cấp được tuyển chọn kỹ lưỡng mà
            khách hàng yêu thích nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.items.map((product) => (
            <Link key={product.id} href={`/products/${product?.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
