"use client";

import { montserrat } from "@/common/styles/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type PreviewSearchItemsProps = {
  alt: string;
  src: string;
  title: string;
  price: number;
  address: string;
  brand: string;
  uuid: string;
};

export default function PreviewSearchItems({
  alt,
  src,
  title,
  price,
  address,
  brand,
  uuid,
}: PreviewSearchItemsProps) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className=" w-11/12 items-center justify-center"
    >
      <Link
        href={address}
        className="  w-full flex-col items-center justify-center overflow-hidden pb-2 "
      >
        <div className="grid grid-cols-5 items-center gap-4 overflow-hidden scrollbar-hide">
          <div className="col-span-2 w-full">
            <div className="relative h-20 w-full flex-col items-center justify-center">
              <div>
                <Image
                  fill
                  className={`h-auto w-full object-contain`}
                  src={src}
                  alt={alt}
                />
                <div className="absolute top-0 z-20 h-full w-full bg-black opacity-5 transition-opacity"></div>
              </div>
            </div>
          </div>
          <div className="col-span-2  flex w-full flex-col">
            <p className=" w-2/4 text-sm">{brand}</p>
            <p
              className={`${montserrat.className} h-10 overflow-scroll text-sm font-extrabold leading-5 scrollbar-hide`}
            >
              {title}
            </p>
          </div>
          <p className={`${montserrat.className}`}>£{price / 100}</p>
        </div>
      </Link>
    </motion.div>
  );
}
