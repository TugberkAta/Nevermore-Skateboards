"use client";

import React, { Suspense, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Item, ItemsWithCategory } from "@/common/lib/data";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { montserratMedium } from "@/common/styles/fonts";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { PreviewItem } from "../catalog/PreviewItem";

export function Carousel({
  latestItems,
}: {
  latestItems: ItemsWithCategory[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="hidden w-full flex-col items-center justify-center lg:flex">
      <p
        className={`mb-8 border-b-2 border-black text-3xl ${montserratMedium.className}`}
      >
        LATEST ARRIVALS
      </p>
      <div className="w-4/6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {latestItems.map((item) => {
              return (
                <div
                  key={item.title + "carousel"}
                  className="relative p-4 lg:flex-[0_0_45%] xl:flex-[0_0_40%] 2xl:flex-[0_0_30%]"
                >
                  <PreviewItem
                    alt={item.title}
                    srcArray={item.img_url_arr}
                    title={item.title}
                    price={item.price}
                    address={`/product/${item.category}/${item.uuid}`}
                    brand={item.brand}
                    disableSlide={true}
                  >
                    <p className="absolute bottom-0 right-4 z-20 rounded-sm bg-black px-2 font-mono text-white">
                      New Arrival
                    </p>
                  </PreviewItem>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-4">
            <button onClick={scrollPrev}>
              <IoIosArrowDropleft className="size-6"></IoIosArrowDropleft>
            </button>
            <button onClick={scrollNext}>
              <IoIosArrowDropright className="size-6"></IoIosArrowDropright>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
