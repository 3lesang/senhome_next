"use client";

import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "@/components/editor/extensions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  content: string;
}

export default function ProductTabs({ content }: ProductTabsProps) {
  const html = generateHTML(JSON.parse(content), extensions);

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="description">Mô tả</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="space-y-6 mt-6">
        <div className="prose !max-w-none">{parse(html)}</div>
      </TabsContent>

      <TabsContent value="reviews" className="space-y-6 mt-6"></TabsContent>
    </Tabs>
  );
}
