"use client";

import Image from "next/image";
import { montserratMedium } from "../../../styles/fonts";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ShopCart from "../Shopcart/ShopCart";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import DesktopNavTabs from "./DesktopNavTabs";
import { MobileNavTabs } from "./MobileNavTabs";
import MobileFilterButton from "./MobileFilterButton";

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

  // To disable scrolling when the panel is opened
  useEffect(() => {
    if (activeHamburger) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [activeHamburger]);

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
    <nav className={`flex h-14 w-screen items-center `}>
      <div className="ml-8 mr-8 flex w-screen items-center justify-between">
        {/* This div is for mobile layout of the logo*/}
        <div className="box lg:hidden">
          <MobileFilterButton pathCategory={pathCategory}></MobileFilterButton>
        </div>
        <div className="flex items-center">
          <Link href="/" className="flex h-full items-center gap-4 ">
            <Image width={34} height={34} src="/raven.svg" alt="Raven Icon" />
            <p className={`${montserratMedium.className} `}>Nevermore</p>
          </Link>
          <DesktopNavTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pathEnd={pathEnd}
          />
        </div>
        <div className="flex gap-6 fill-black">
          {stripeApiKey && (
            <ShopCart
              shopCartArray={shopCartArray}
              setShopCartArray={setShopCartArray}
              stripeApiKey={stripeApiKey}
            ></ShopCart>
          )}
          <button
            className="block md:hidden"
            role="button"
            aria-label="hamburger-menu-button"
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
