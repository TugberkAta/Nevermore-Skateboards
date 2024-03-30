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
  // Not proud of this
  const [tempCount, setTempCount] = useState(0);

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-4 w-11/12 items-center h-full  overflow-hidden">
        <div className="lg:flex hidden flex-col w-[13rem] items-center justify-center h-auto relative">
          <Link
            href={address}
            className="group flex justify-center w-full h-full"
          >
            <Image
              width={100}
              height={100}
              className={` w-auto h-full ${objectPosition}`}
              src={src}
              alt={alt}
            />
            <div className="w-full h-full bg-black opacity-5 transition-opacity top-0 absolute z-20"></div>
          </Link>
        </div>
        <div className="flex w-auto flex-col">
          <p className="text-sm mb-1 w-2/4">{brand}</p>
          <p
            className={`${montserrat.className} leading-5 font-extrabold  max-h-10 text-sm overflow-scroll`}
          >
            {title}
          </p>
          <p className="text-sm mt-1">Size: {size}</p>
          <div className="flex items-center w-fit gap-4 mt-4 ml-2">
            <IncrementItemButton
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              uuid={uuid}
              setTempCount={setTempCount}
              tempCount={tempCount}
            ></IncrementItemButton>
            <p className="text-center w-8">{count}</p>
            <DecrementItemButton
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              uuid={uuid}
              setTempCount={setTempCount}
              tempCount={tempCount}
            ></DecrementItemButton>
          </div>
        </div>
        <div className="flex  flex-col  w-40 items-center justify-between gap-8">
          <div className="flex flex-col items-end text-nowrap text-center">
            <p className={`${montserrat.className}`}>
              £{(price / 100) * count} STR
            </p>
            <p className=" text-xs mt-1">£{price / 100} STR</p>
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
