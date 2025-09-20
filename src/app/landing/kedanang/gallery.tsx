"use client";

import Image from "next/image";
import { useEffect, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, isValidUrl } from "@/lib/utils";
import type { FileType } from "@/types/file";
import LightBox from "./lightbox";

interface ProductGalleryProps {
  data: FileType[];
  ref?: React.Ref<CarouselApi>;
}

interface ProductGalleryThumbnailProps {
  data: FileType[];
  onChange?: (index: number) => void;
  current?: number;
  setApi: (api: CarouselApi) => void;
}

function ProductGalleryThumbnail({
  data,
  onChange,
  current: currentProps = 0,
  setApi,
}: ProductGalleryThumbnailProps) {
  const [current, setCurrent] = useState(currentProps);

  const handleClick = (index: number) => {
    setCurrent(index);
    onChange?.(index);
  };

  useEffect(() => {
    setCurrent(currentProps);
  }, [currentProps]);

  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent className="p-2">
        {data?.map((item, index) => (
          <CarouselItem key={item.id} className="basis-1/6 md:basis-1/6">
            <Button
              variant="outline"
              className={cn(
                "p-0 size-20 overflow-hidden transition-all duration-200 select-none",
                current === index && "ring-2 ring-primary",
              )}
              onClick={() => handleClick(index)}
            >
              {isValidUrl(item.url) && (
                <Image
                  height={50}
                  width={50}
                  src={item.url}
                  alt="image"
                  className="w-full h-full object-contain aspect-square"
                />
              )}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default function ProductGallery({ data, ref }: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [openLightBox, setOpenLightBox] = useState(false);
  const [current, setCurrent] = useState(0);

  useImperativeHandle(ref, () => api, [api]);

  const handleThumbnailChange = (index: number) => {
    api?.scrollTo(index);
  };

  const handleImageClick = () => {
    setOpenLightBox(true);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      thumbnailApi?.scrollTo(api.selectedScrollSnap());
    });
  }, [api, thumbnailApi]);

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {data?.map((item) => (
            <CarouselItem key={item.id}>
              {isValidUrl(item.url) && (
                <Image
                  height={1000}
                  width={1000}
                  src={item.url}
                  alt="image"
                  className="w-full h-full object-contain aspect-square rounded-lg"
                  onClick={handleImageClick}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />

        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {current} / {data.length}
        </div>
      </Carousel>
      <ProductGalleryThumbnail
        data={data}
        onChange={handleThumbnailChange}
        current={api?.selectedScrollSnap()}
        setApi={setThumbnailApi}
      />
      <LightBox
        open={openLightBox}
        onOpenChange={setOpenLightBox}
        data={data}
        current={current - 1}
      />
    </div>
  );
}
