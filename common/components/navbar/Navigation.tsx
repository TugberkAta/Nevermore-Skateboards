"use client";

import Image from "next/image";
import { inika } from "../../styles/fonts";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ShopCart from "./Shopcart/ShopCart";
import Link from "next/link";

// Array of every tab to be shown in the nav bar
const tabs = [
  { id: undefined, text: "Homepage" },
  { id: "Skateboards", text: "Skateboards" },
  { id: "Rollerblades", text: "Roller Blades" },
  { id: "Snowboards", text: "Snowboards" },
  { id: "Shoes", text: "Shoes" },
];

type NavigationProps = {
  stripeApiKey: string | undefined;
};

export default function Navigation({ stripeApiKey }: NavigationProps) {
  // Get pathnames for conditionally updating active tab
  const pathname = usePathname();
  const pathEnd = pathname.split("/")[2];

  // State for updating the active tab
  const [activeTab, setActiveTab] = useState<string | undefined>(pathEnd);

  const [shopCartArray, setShopCartArray] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("shopCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } else null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setShopCartArray(JSON.parse(localStorage.getItem("shopCart") || "[]"));
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  return (
    <nav className={`w-screen h-14 flex items-center `}>
      <div className="ml-8 mr-8 flex items-center justify-between w-screen">
        <div className="flex items-center">
          <Link href="/" className="flex gap-4 h-full items-center ">
            <Image width={34} height={34} src="/raven.svg" alt="Raven Icon" />
            <p className={`${inika.className}`}>Nevermore</p>
          </Link>
          <div
            className="ml-20 font-semibold gap-5 text-sm flex text-black"
            onMouseLeave={() => setActiveTab(pathEnd)}
          >
            {tabs.map((tab) => (
              <Link
                key={tab.id != undefined ? tab.id : "homepage"}
                href={tab.id != undefined ? "/catalog/" + tab.id : `/`}
                onMouseEnter={() => setActiveTab(tab.id)}
                className="relative"
              >
                {tab.text}
                {activeTab === tab.id && (
                  /*This component uses layoutId to animate between positions*/
                  <motion.div
                    layoutId="underline"
                    className="absolute bg-black w-full h-[0.10rem]"
                    transition={{ duration: 0.7, type: "spring" }}
                  ></motion.div>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="fill-black flex gap-4">
          <Link href="">
            <IoMdSearch className="size-5"></IoMdSearch>
          </Link>
          {stripeApiKey && (
            <ShopCart
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              stripeApiKey={stripeApiKey}
            ></ShopCart>
          )}
          <h1
            className={`font-bold relative bottom-3 right-5 text-white bg-black rounded-full text-sm size-5 text-center`}
          >
            {0 + (shopCartArray?.length || 0)}
          </h1>
        </div>
      </div>
    </nav>
  );
}
