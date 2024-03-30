"use client";

import Image from "next/image";
import { inika, montserrat, montserratMedium } from "../../styles/fonts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ShopCart from "./Shopcart/ShopCart";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

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
  const pathCategory = pathname.split("/")[1];
  const pathEnd = pathname.split("/")[2];

  // State for updating the active tab
  const [activeTab, setActiveTab] = useState<string | undefined>(pathEnd);

  // State for updating the active tab
  const [activeHamburger, setActiveHamburger] = useState<boolean>(false);

  useEffect(() => {
    setActiveTab(pathEnd);
  }, [pathEnd]);

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
        <div className="box lg:hidden">
          <MobileFilterButton pathCategory={pathCategory}></MobileFilterButton>
        </div>
        <div className="flex items-center">
          <Link href="/" className="flex gap-4 h-full items-center ">
            <Image width={34} height={34} src="/raven.svg" alt="Raven Icon" />
            <p className={`${montserratMedium.className} `}>Nevermore</p>
          </Link>
          <DesktopNavTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pathEnd={pathEnd}
          />
        </div>
        <div className="fill-black flex gap-6">
          {stripeApiKey && (
            <ShopCart
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              stripeApiKey={stripeApiKey}
            ></ShopCart>
          )}
          <button
            className="block md:hidden"
            onClick={() => setActiveHamburger(!activeHamburger)}
          >
            <RxHamburgerMenu className="size-5"></RxHamburgerMenu>
          </button>
          {activeHamburger && (
            <MobileNavTabs
              setActiveHamburger={setActiveHamburger}
              activeHamburger={activeHamburger}
            ></MobileNavTabs>
          )}
        </div>
      </div>
    </nav>
  );
}

type MobileNavTabs = { pathCategory: string };

export function MobileFilterButton({ pathCategory }: MobileNavTabs) {
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("filterMobile"));
  }, [activeFilter]);

  return (
    <>
      {pathCategory === "catalog" ? (
        <button
          className="lg:hidden block"
          onClick={() => setActiveFilter(!activeFilter)}
        >
          <FaFilter className="size-5"></FaFilter>
        </button>
      ) : (
        <div className="size-5" />
      )}
    </>
  );
}

type DesktopNavTabs = {
  activeTab: string | undefined;
  pathEnd: string;
  setActiveTab: Dispatch<SetStateAction<string | undefined>>;
};

export function DesktopNavTabs({
  activeTab,
  setActiveTab,
  pathEnd,
}: DesktopNavTabs) {
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

type MobileNavTabsProps = {
  setActiveHamburger: Dispatch<SetStateAction<boolean>>;
  activeHamburger: boolean;
};

export function MobileNavTabs({
  setActiveHamburger,
  activeHamburger,
}: MobileNavTabsProps) {
  return (
    <div>
      <motion.div
        className={`absolute ${montserrat.className} flex-col z-40 text-2xl bg-white top-0 right-0 gap-4 pl-8 pt-20 h-screen w-60 flex lg:hidden`}
        animate={{ translateX: 0, opacity: 1 }}
        initial={{ translateX: 80, opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <button
          className="top-7 right-5 absolute"
          onClick={() => setActiveHamburger(!activeHamburger)}
        >
          <RxCross2></RxCross2>
        </button>
        {tabs.map((tab) => (
          <Link
            key={tab.id != undefined ? tab.id : "homepage"}
            href={tab.id != undefined ? "/catalog/" + tab.id : `/`}
            className="relative"
            onClick={() => setActiveHamburger(!activeHamburger)}
          >
            {tab.text}
          </Link>
        ))}
      </motion.div>
      <div className="absolute z-30 w-full h-full bg-black opacity-40 top-0 right-0"></div>
    </div>
  );
}
