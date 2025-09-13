import Editor from "@/components/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/product";

interface ProductTabsProps {
  product?: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="description">Mô tả</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="space-y-6 mt-6">
        <Editor content={JSON.stringify(product?.content)} />
      </TabsContent>

      <TabsContent value="reviews" className="space-y-6 mt-6"></TabsContent>
    </Tabs>
  );
}
