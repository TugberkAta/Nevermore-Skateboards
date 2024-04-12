import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import tabs from "@/common/utils/tabs";
type DesktopNavTabs = {
  activeTab: string | undefined;
  pathEnd: string;
  setActiveTab: Dispatch<SetStateAction<string | undefined>>;
};

export default function DesktopNavTabs({
  activeTab,
  setActiveTab,
  pathEnd,
}: DesktopNavTabs) {
  return (
    <div
      className="ml-20 hidden gap-5 text-sm font-semibold text-black lg:flex"
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
              className="absolute h-[0.10rem] w-full bg-black"
              transition={{ duration: 0.7, type: "spring" }}
            ></motion.div>
          )}
        </Link>
      ))}
    </div>
  );
}
