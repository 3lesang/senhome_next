import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { isValidUrl } from "@/lib/utils";
import type { FileType } from "@/types/file";

interface LightBoxProps {
  data: FileType[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  current?: number;
}

export default function LightBox({
  data,
  open,
  onOpenChange,
  current: currentProps = 0,
}: LightBoxProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(currentProps);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [open]);

  useEffect(() => {
    setCurrent(currentProps);
  }, [currentProps]);

  const handleClose = () => {
    onOpenChange?.(false);
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[99]">
      <Carousel
        className="h-full relative"
        setApi={setApi}
        opts={{
          startIndex: currentProps,
        }}
      >
        <CarouselContent className="h-screen">
          {data?.map((item) => (
            <CarouselItem key={item.id}>
              <div className="h-full w-full">
                {isValidUrl(item.url) && (
                  <Image
                    height={1000}
                    width={1000}
                    src={item.url}
                    alt="image"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="absolute top-1 left-1 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
        {current} / {data.length}
      </div>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="absolute right-1 top-1 rounded-full size-8"
        onClick={handleClose}
      >
        <XIcon />
      </Button>
    </div>,
    document.body,
  );
}
