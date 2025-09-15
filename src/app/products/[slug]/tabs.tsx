"use client";

import Editor from "@/components/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  content: string;
}

export default function ProductTabs({ content }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="description">Mô tả</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="space-y-6 mt-6">
        <Editor content={content} />
      </TabsContent>

      <TabsContent value="reviews" className="space-y-6 mt-6"></TabsContent>
    </Tabs>
  );
}
