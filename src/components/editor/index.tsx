"use client";

import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/components/editor/extensions";

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

export default ({ content, onChange }: EditorProps) => {
  const editor: Editor | null = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "prose !max-w-none",
      },
    },
    content: content ? JSON.parse(content) : undefined,
    onUpdate: ({ editor }) => {
      onChange?.(JSON.stringify(editor.getJSON()));
    },
    immediatelyRender: false,
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};
