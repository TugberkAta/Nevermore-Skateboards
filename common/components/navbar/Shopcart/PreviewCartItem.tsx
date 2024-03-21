import { montserrat } from "@/common/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import AddItemButton from "./AddItemButton";
import { motion } from "framer-motion";

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
}: PreviewCartItemProps) {
  // Not proud of this
  const [tempCount, setTempCount] = useState(0);

  const [shopCart, setShopCart] = useState<string[]>(() => {
    const storedCart = localStorage.getItem("shopCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Store the shopCart array as a string in localStorage
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
  }, [shopCart]);

  const handleAddCount = () => {
    const itemIndex = shopCart.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      return item.uuid === uuid;
    });

    // update the items count
    setShopCart((prevShopCart) =>
      prevShopCart.map((itemString, index) => {
        if (index === itemIndex) {
          const item = JSON.parse(itemString);
          item.count += 1;
          setTempCount(tempCount + 1);
          return JSON.stringify(item);
        }
        return itemString;
      })
    );
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid grid-cols-4 items-start overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full h-full col-span-1 relative">
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
        <div className="col-span-2 ml-6 h-5/6 ">
          <p className="text-sm mb-1">{brand}</p>
          <p
            className={`${montserrat.className} leading-5 h-4 overflow-hidden`}
          >
            {title}
          </p>
          <p className="text-sm mt-1">Size: {size}</p>
          <div className="flex items-center w-fit gap-4 mt-4 ml-2">
            <AddItemButton handleAddCount={handleAddCount}></AddItemButton>
            <p className="text-center w-8">{count + tempCount}</p>
            <button>
              <FaMinus></FaMinus>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-8">
          <div className="flex flex-col items-end text-center">
            <p className={`${montserrat.className}`}>
              £{(price / 100) * (count + tempCount)} STR
            </p>
            <p className=" text-xs mt-1">£{price / 100} STR</p>
          </div>
          <button type="button" className="p-1 pr-3 pl-3 bg-black">
            <p className="text-white">Remove</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
