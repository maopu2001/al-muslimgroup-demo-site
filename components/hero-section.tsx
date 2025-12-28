"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function HeroSection() {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div>
      <Carousel
        className="w-full mx-auto -translate-y-12"
        plugins={[plugin.current]}
        onMouseLeave={() => plugin.current.play()}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {[1, 2, 3].map((num) => (
            <CarouselItem key={num}>
              <div className="w-full h-lvh flex items-center justify-center bg-gray-200 object-cover relative">
                <Image
                  src={`/hero/hero${num}.jpg`}
                  alt={`Image ${num}`}
                  fill
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-15 size-10 hover:bg-accent/50 text-accent" />
        <CarouselNext className="-translate-x-15 size-10 hover:bg-accent/50 text-accent" />
      </Carousel>
    </div>
  );
}
