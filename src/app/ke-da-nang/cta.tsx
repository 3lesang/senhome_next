"use client";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { openVariantSelectAtom } from "./atom";

export default function CTAButton() {
  const [_, setOpen] = useAtom(openVariantSelectAtom);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div className="flex h-56 justify-center items-center">
      <Button type="button" onClick={handleClick}>
        Mua ngay
      </Button>
    </div>
  );
}
