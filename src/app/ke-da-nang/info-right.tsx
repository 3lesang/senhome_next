import { useAtom } from "jotai";
import { Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatVND } from "@/lib/utils";
import type { AttributeOptionType, VariantType } from "@/types/product";
import { addOrderItemAtom, openFormAtom } from "./atom";

interface ProductInfoRightProps {
  data: {
    id: string;
    name: string;
    category: string;
    price: number;
    discount: number;
    attrs: AttributeOptionType[];
    variants: VariantType[];
    countReview: number;
    rating: number;
    thumbnail: string;
  };
  onVariantChange?: (id: string) => void;
}

export default function ProductInfoRight({
  data,
  onVariantChange,
}: ProductInfoRightProps) {
  const [, addOrderItem] = useAtom(addOrderItemAtom);
  const [_, setOpen] = useAtom(openFormAtom);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [variant, setVariant] = useState<VariantType>();

  const {
    id,
    name,
    category,
    price: productPrice,
    discount: productDiscount,
    rating,
    countReview,
  } = data;

  const lowestVariant = data.variants?.[0];
  const highestVariant = data.variants?.[data.variants.length - 1];

  const price = variant?.price ?? productPrice;
  const discount = variant?.discount ?? productDiscount;

  const checkVariant = data.variants.length && !variant?.id;

  const priceVariantText = `${formatVND(lowestVariant?.price)} - ${formatVND(highestVariant?.price)}`;
  const discountPriceVariantText = `${formatVND(lowestVariant.price * (1 - lowestVariant.discount / 100))} - ${formatVND(highestVariant.price * (1 - highestVariant.discount / 100))}`;

  const priceText = checkVariant ? priceVariantText : formatVND(price);

  const discountPriceText = checkVariant
    ? discountPriceVariantText
    : formatVND(price * (1 - discount / 100));

  const handleOptionClick = (attrId: string, optId: string) => {
    const newOptions = { ...options, [attrId]: optId };
    const optionsValues = Object.values(newOptions);

    const isSameArray = (a: string[], b: string[]) =>
      a.length === b.length && a.every((val) => b.includes(val));

    const found = data.variants.find((item) =>
      isSameArray(item.options, optionsValues),
    );

    if (found?.id) {
      onVariantChange?.(found.id);
    }

    setVariant(found);

    setOptions(newOptions);
  };

  const handleClick = () => {
    const attrMap = Object.entries(options).map(([attrId, optId]) => {
      const attr = data.attrs.find((i) => i.id === attrId);
      const opt = attr?.opts.find((i) => i.id === optId);
      return {
        attr: {
          id: attr?.id ?? "",
          name: attr?.name ?? "",
        },
        opt: {
          id: opt?.id ?? "",
          name: opt?.name ?? "",
        },
      };
    });

    addOrderItem([
      {
        id: variant?.id ?? id,
        name,
        price,
        discount: discount,
        quantity,
        thumbnail: data.thumbnail,
        variantId: variant?.id ?? "",
        productId: id,
        variants: attrMap,
      },
    ]);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{category}</Badge>
          {Number(discount) > 0 && (
            <Badge variant="destructive">Giảm {Number(discount)}%</Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-muted-foreground text-lg">{}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5).keys()].map((item, i) => (
            <Star
              key={item}
              className={cn(
                "w-5 h-5",
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-muted-foreground/30",
              )}
            />
          ))}
        </div>
        <span className="font-medium">{rating}</span>
        <span className="text-muted-foreground">({countReview} đánh giá)</span>
      </div>

      <div>
        <p className="text-3xl font-bold">{discountPriceText}</p>
        {(discount > 0 || checkVariant) && (
          <p className="text-xl text-muted-foreground line-through">
            {priceText}
          </p>
        )}
      </div>

      <Separator />

      {data.attrs.map((attr) => (
        <div key={attr.id}>
          <h3 className="font-semibold mb-3">{attr.name}</h3>
          <div className="flex gap-2 flex-wrap">
            {attr.opts.map((opt) => (
              <Button
                key={opt.id}
                variant={options[attr.id] === opt.id ? "default" : "outline"}
                className="h-auto py-2"
                onClick={() => handleOptionClick(attr.id, opt.id)}
              >
                {opt.name}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h3 className="font-semibold mb-3">Số lượng</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="w-16 text-center font-medium py-2">{quantity}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button className="w-full" size="lg" onClick={handleClick}>
        Mua ngay
      </Button>
    </div>
  );
}
