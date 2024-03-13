"use client";

import Image from "next/image";
import { inika } from "../styles/fonts";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Array of every tab to be shown in the nav bar
const tabs = [
  { id: undefined, text: "Homepage" },
  { id: "Skateboards", text: "Skateboards" },
  { id: "RollerBlades", text: "Roller Blades" },
  { id: "Snowboards", text: "Snowboards" },
  { id: "Shoes", text: "Shoes" },
];

export default function Navigation() {
  // Get params for conditionally updating active tab
  const params = useParams<{ id: any }>();

  // State for updating the active tab
  const [activeTab, setActiveTab] = useState(params.id);

  return (
    <nav className={`w-screen h-14 flex items-center`}>
      <div className="ml-8 mr-8 flex items-center justify-between w-screen">
        <div className="flex items-center">
          <a href="/" className="flex gap-4 h-full items-center ">
            <Image width={34} height={34} src="/raven.svg" alt="Raven Icon" />
            <p className={`${inika.className}`}>Nevermore</p>
          </a>
          <div
            className="ml-20 font-semibold gap-5 text-sm flex text-black"
            onMouseLeave={() => setActiveTab(params.id)}
          >
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.id != undefined ? "/products/" + tab.id : `/`}
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
              </a>
            ))}
          </div>
        </div>
        <div className="fill-black flex gap-4">
          <a href="">
            <IoMdSearch className="size-5"></IoMdSearch>
          </a>
          <a href="">
            <MdOutlineShoppingCart className="size-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
