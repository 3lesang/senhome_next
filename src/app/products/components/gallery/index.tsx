import Image from "next/image";
import { useEffect, useState } from "react";
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

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
  productName: string;
}

export default function ProductImageGallery({
  images,
  selectedImage,
  onImageSelect,
  productName,
}: ProductImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex + 1);
      onImageSelect(newIndex);
    });
  }, [api, onImageSelect]);

  // Sync external selectedImage changes with carousel
  useEffect(() => {
    if (api && selectedImage !== api.selectedScrollSnap()) {
      api.scrollTo(selectedImage);
    }
  }, [selectedImage, api]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Carousel setApi={setApi} className="w-full rounded-lg">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image}>
                <div className="relative aspect-square bg-muted group rounded-lg">
                  {isValidUrl(image) && (
                    <Image
                      height={100}
                      width={100}
                      src={image}
                      alt={productName}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {current} / {images.length}
            </div>
          )}
        </Carousel>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="w-full">
          <Carousel
            opts={{
              align: "start",
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="p-2">
              {images.map((image, index) => (
                <CarouselItem key={image} className="basis-1/6 md:basis-1/6">
                  <Button
                    variant="outline"
                    className={cn(
                      "p-0 size-20 overflow-hidden transition-all duration-200",
                      selectedImage === index
                        ? "ring-2 ring-primary ring-offset-2 scale-105"
                        : "hover:scale-105 hover:ring-1 hover:ring-primary/50",
                    )}
                    onClick={() => onImageSelect(index)}
                  >
                    <Image
                      src={image}
                      alt={productName}
                      className="w-full h-full object-contain aspect-square"
                    />
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 4 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
}
