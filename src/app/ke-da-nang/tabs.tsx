"use client";

import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "@/components/editor/extensions";
import { Tabs, TabsContent } from "@/components/ui/tabs";

interface ProductTabsProps {
  content: string;
}

export default function ProductTabs({ content }: ProductTabsProps) {
  const html = generateHTML(JSON.parse(content), extensions);

  return (
    <Tabs defaultValue="description" className="w-full">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
        Thông tin sản phẩm
      </h2>
      <TabsContent value="description" className="space-y-6 mt-6">
        {parse(html)}
      </TabsContent>
    </Tabs>
  );
}
