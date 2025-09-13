"use client";

import ProductImageGallery from "@/app/products/components/gallery";
import ProductInfo from "@/app/products/components/info";
import ProductTabs from "@/app/products/components/tab";
import { useCart } from "@/hooks/use-cart";
import { useProduct } from "@/hooks/use-product";
import { convertToFileUrl } from "@/lib/utils";
import {
  FILE_GRAPH_COLLECTION,
  PRODUCT_COLLECTION,
} from "@/pocketbase/constants";
import { getListFileProductPocket } from "@/pocketbase/file/product";
import { getOneProductPocket } from "@/pocketbase/product/one";
import { useQuery } from "@tanstack/react-query";

interface ProductDetailProps {
  productId: string;
  slug: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
  } = useProduct(productId);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // addToCart(product, quantity, selectedColor, selectedSize);
  };

  const { data: productData } = useQuery({
    queryKey: [PRODUCT_COLLECTION, productId],
    queryFn: () => getOneProductPocket(productId),
  });

  const { data: images } = useQuery({
    queryKey: [FILE_GRAPH_COLLECTION, productId],
    queryFn: () => getListFileProductPocket(productId),
    select(data) {
      return data.map((item) => convertToFileUrl(item.expand?.file) ?? "");
    },
  });

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <ProductImageGallery
              images={images ?? []}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              productName={""}
            />
          </div>
          <div>
            <ProductInfo
              // product={product}
              // selectedColor={selectedColor}
              // selectedSize={selectedSize}
              quantity={quantity}
              // onColorSelect={setSelectedColor}
              // onSizeSelect={setSelectedSize}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              product={undefined}
              selectedColor={""}
              selectedSize={""}
              onColorSelect={() => {}}
              onSizeSelect={() => {}}
            />
          </div>
        </div>
        <ProductTabs product={productData} />
      </div>
    </div>
  );
}
