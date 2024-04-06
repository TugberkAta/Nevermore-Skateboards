import { montserrat, montserratMedium } from "@/common/styles/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PreviewItemProps = {
  alt: string;
  srcArray: string[];
  title: string;
  price: number;
  address: string;
  brand: string;
};

const DurationOfAnimation = 1500;

export function PreviewItem({
  alt,
  srcArray,
  title,
  price,
  address,
  brand,
}: PreviewItemProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  function handleMouseEnter() {
    setActiveAnimation(true);
    const id = setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        currentIndex < srcArray.length - 1 ? currentIndex + 1 : 0,
      );
    }, DurationOfAnimation); // Change image every 2 seconds
    setIntervalId(id);
  }

  function handleMouseLeave() {
    setActiveAnimation(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setActiveImageIndex(0); // Reset image to the first one when mouse leaves
    setIntervalId(null);
  }

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Link
        href={address}
        className="flex h-full w-full flex-col items-center justify-center overflow-hidden pb-2 "
      >
        <div
          className="relative h-[16.5rem] w-full overflow-hidden md:h-[18.5rem] "
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
        >
          <div className="group flex h-full w-full justify-center ">
            <div className="h-5/6">
              {srcArray.map((src) => {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={
                      src === srcArray[activeImageIndex]
                        ? { opacity: 100 }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      loading="lazy"
                      fill
                      className={`h-auto w-full object-contain`}
                      src={src}
                      alt={alt}
                    />
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: activeAnimation ? "100%" : "0%" }}
                transition={{
                  duration: activeAnimation
                    ? (DurationOfAnimation / 1000) * srcArray.length
                    : 0,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-0 left-0 h-[0.1rem] w-full bg-gray-700 opacity-60"
              ></motion.div>
            </div>
            <div className="absolute top-0 z-20 h-full w-full bg-orange-950 opacity-5 transition-opacity"></div>
          </div>
        </div>
        <div className="flex w-full justify-between pb-4 pt-2">
          <div className="flex flex-col ">
            <p className="text-base font-semibold">{brand}</p>
            <p
              className={`h-4 overflow-hidden font-sans text-xs font-semibold`}
            >
              {title}
            </p>
          </div>
          <p className="text-xs">£{price / 100}</p>
        </div>
      </Link>
    </motion.div>
  );
}
