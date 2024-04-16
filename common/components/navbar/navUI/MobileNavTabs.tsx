import { montserrat } from "@/common/styles/fonts";
import tabs from "@/common/utils/tabs";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";

type MobileNavTabsProps = {
  setActiveHamburger: Dispatch<SetStateAction<boolean>>;
  activeHamburger: boolean;
};

export function MobileNavTabs({
  setActiveHamburger,
  activeHamburger,
}: MobileNavTabsProps) {
  return (
    <>
      <motion.div
        className={`absolute ${montserrat.className} right-0 top-0 z-40 flex h-screen w-60 flex-col bg-white pl-8 pt-20 text-xl lg:hidden`}
        animate={{ translateX: 0, opacity: 1 }}
        initial={{ translateX: 80, opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <button
          className="absolute right-5 top-7"
          onClick={() => setActiveHamburger(!activeHamburger)}
        >
          <RxCross2></RxCross2>
        </button>
        {tabs.map((tab) => (
          <Link
            key={tab.id != undefined ? tab.id : "homepage"}
            href={tab.id != undefined ? "/catalog/" + tab.id : `/`}
            className="relative py-2"
            onClick={() => setActiveHamburger(!activeHamburger)}
          >
            {tab.text}
          </Link>
        ))}
      </motion.div>
      <div className="absolute right-0 top-0 z-30 h-full w-full bg-black opacity-40"></div>
    </>
  );
}
