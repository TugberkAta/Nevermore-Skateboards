"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Item, ItemsWithCategory } from "@/common/lib/data";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { montserratMedium } from "@/common/styles/fonts";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

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
    <div className="hidden w-full flex-col items-center justify-center md:flex">
      <p
        className={`mb-8 border-b-2 border-black text-3xl ${montserratMedium.className}`}
      >
        LATEST ARRIVALS
      </p>
      <div className="w-4/6">
        <div className=" overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {latestItems.map((item) => {
              return (
                <Link
                  key={item.title + "carousel"}
                  className="relative flex flex-col items-center justify-center p-4 md:flex-[0_0_55%] lg:flex-[0_0_45%] xl:flex-[0_0_40%] 2xl:flex-[0_0_30%]"
                  href={`/product/${item.category}/${item.uuid}`}
                >
                  <div className="relative min-h-80 w-full">
                    <p className="absolute left-2 top-2 z-20 rounded-sm bg-black px-2 font-mono text-white">
                      New Arrival
                    </p>
                    <Image
                      className="className=w-full scale-90 object-contain"
                      fill
                      src={item.img_url}
                      alt={item.title}
                    ></Image>
                    <div className="absolute top-0 z-20 h-full w-full bg-orange-950 opacity-5 transition-opacity"></div>
                  </div>
                  <div className="flex w-full justify-between pb-4 pt-2">
                    <div className="flex flex-col ">
                      <p className="text-base font-semibold">{item.brand}</p>
                      <p
                        className={`h-4 overflow-hidden font-sans text-xs font-semibold`}
                      >
                        {item.title}
                      </p>
                    </div>
                    <p className="text-xs">£{item.price / 100}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex gap-4">
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
