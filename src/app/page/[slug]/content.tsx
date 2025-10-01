"use client";

import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "@/components/editor/extensions";

interface ContentProps {
  data: string;
}

export default function Content({ data }: ContentProps) {
  const html = generateHTML(JSON.parse(data), extensions);
  return <div className="prose !max-w-none">{parse(html)}</div>;
}
