"use client";

import { ArrowRight, ChevronDown, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import { heroSlides } from "./hero-slides";

function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const count = heroSlides.length;

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => clearInterval(autoplay);
  }, [api]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
                <div className="absolute inset-0 z-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r",
                      slide.gradient,
                    )}
                  />
                  <div className="absolute inset-0 bg-background/60" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <Badge
                        variant="secondary"
                        className="text-sm font-medium"
                      >
                        {slide.badge}
                      </Badge>

                      <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                          {slide.subtitle}
                        </p>
                      </div>

                      <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        {slide.features.map((feature) => (
                          <div
                            key={feature.text}
                            className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2"
                          >
                            <feature.icon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="group">
                          {slide.primaryCta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="group bg-background/80 backdrop-blur-sm"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {slide.secondaryCta}
                        </Button>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="hidden md:block">
                      <Card className="bg-background/80 backdrop-blur-sm border-0 shadow-2xl">
                        <CardContent className="p-8">
                          <div className="space-y-6">
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                              <div className="text-center space-y-2">
                                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                                  <Star className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <p className="font-semibold">
                                  Trải nghiệm cao cấp
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                              {[
                                { value: "99%", label: "Hài lòng" },
                                { value: "24/7", label: "Hỗ trợ" },
                                { value: "1M+", label: "Khách hàng" },
                              ].map((stat) => (
                                <div key={stat.value}>
                                  <div className="text-2xl font-bold text-primary">
                                    {stat.value}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm border-0 shadow-lg" />
        <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm border-0 shadow-lg" />
      </Carousel>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {[...Array(count).keys()].map((item, index) => (
            <button
              type="button"
              key={item}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === current
                  ? "bg-primary scale-125"
                  : "bg-background/60 hover:bg-background/80",
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center space-y-2 text-muted-foreground">
        <span className="text-sm font-medium">Cuộn xuống</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

export default HeroCarousel;
