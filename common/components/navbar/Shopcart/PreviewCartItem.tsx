import { montserrat } from "@/common/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import RemoveItemButton from "./RemoveItem";
import DecrementItemButton from "./DecrementItemButton";
import IncrementItemButton from "./IncrementItemButton";

type PreviewCartItemProps = {
  alt: string;
  objectPosition?: string;
  src: string;
  title: string;
  price: number;
  address: string;
  size: string;
  brand: string;
  count: number;
  uuid: string;
  shopCartArray: string[];
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
};

export function PreviewCartItem({
  alt,
  objectPosition,
  src,
  title,
  price,
  address,
  size,
  brand,
  count,
  uuid,
  shopCartArray,
  setShopCartArray,
}: PreviewCartItemProps) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex h-full w-11/12 items-center gap-4  overflow-hidden">
        <div className="relative hidden h-5/6 flex-col items-center justify-center md:flex">
          <Link href={address} className="w-24">
            <Image
              fill
              className={`h-auto w-full object-contain`}
              src={src}
              alt={alt}
            />
            <div className="absolute top-0 z-20 h-full w-full bg-black opacity-5 transition-opacity"></div>
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <p className="mb-1 w-2/4 text-sm">{brand}</p>
          <p
            className={`${montserrat.className} h-5 overflow-scroll text-sm font-extrabold leading-5`}
          >
            {title}
          </p>
          <p className="mt-1 text-sm">Size: {size}</p>
          <div className="ml-2 mt-4 flex w-fit items-center gap-4">
            <IncrementItemButton
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              uuid={uuid}
            ></IncrementItemButton>
            <p className="w-8 text-center">{count}</p>
            <DecrementItemButton
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              uuid={uuid}
            ></DecrementItemButton>
          </div>
        </div>
        <div className="flex  w-fit  flex-col items-center justify-between gap-8">
          <div className="flex flex-col items-end text-nowrap text-center">
            <p className={`${montserrat.className}`}>
              £{(price / 100) * count} STR
            </p>
            <p className=" mt-1 text-xs">£{price / 100} STR</p>
          </div>
          <RemoveItemButton
            shopCartArray={shopCartArray}
            setShopCartArray={setShopCartArray}
            uuid={uuid}
          ></RemoveItemButton>
        </div>
      </div>
    </motion.div>
  );
}
