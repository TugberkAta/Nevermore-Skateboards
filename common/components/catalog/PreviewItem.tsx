import { montserrat, montserratMedium } from "@/common/styles/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type PreviewItemProps = {
  alt: string;
  objectPosition?: string;
  src: string;
  title: string;
  price: number;
  address: string;
  brand: string;
};

export function PreviewItem({
  alt,
  objectPosition,
  src,
  title,
  price,
  address,
  brand,
}: PreviewItemProps) {
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
        <div className="relative h-[16.5rem] w-full overflow-hidden md:h-[18.5rem] ">
          <div className="group flex h-full w-full justify-center ">
            <div className="h-5/6">
              <Image
                fill
                className={`h-auto w-full object-contain ${objectPosition} scale-90 transition-transform duration-300 ease-in-out group-hover:scale-100`}
                src={src}
                alt={alt}
              />
            </div>
            <div className="absolute top-0 z-20 h-full w-full bg-black opacity-5 transition-opacity"></div>
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
