"use client";

import Image from "next/image";
import { inika } from "../../styles/fonts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ShopCart from "./Shopcart/ShopCart";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

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
        {/* This div is for mobile layout of the logo*/}
        <button className="lg:hidden">
          <FaFilter className="size-5"></FaFilter>
        </button>
        <div className="flex items-center">
          <Link href="/" className="flex gap-4 h-full items-center ">
            <Image width={34} height={34} src="/raven.svg" alt="Raven Icon" />
            <p className={`${inika.className}`}>Nevermore</p>
          </Link>
          <DesktopNavTabs />
        </div>
        <div className="fill-black flex gap-6">
          {stripeApiKey && (
            <ShopCart
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              stripeApiKey={stripeApiKey}
            ></ShopCart>
          )}
          <button className="block md:hidden">
            <RxHamburgerMenu className="size-5"></RxHamburgerMenu>
          </button>
        </div>
      </div>
    </nav>
  );
}

export function DesktopNavTabs() {
  // Get pathnames for conditionally updating active tab
  const pathname = usePathname();
  const pathEnd = pathname.split("/")[2];

  // State for updating the active tab
  const [activeTab, setActiveTab] = useState<string | undefined>(pathEnd);

  useEffect(() => {
    setActiveTab(pathEnd);
  }, [pathEnd]);

  return (
    <div
      className="ml-20 font-semibold gap-5 text-sm lg:flex text-black hidden"
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
  );
}
