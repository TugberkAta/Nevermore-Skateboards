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
        className="flex flex-col items-center w-full pb-2 pr-2 h-full overflow-hidden "
      >
        <div className="w-full h-[16.5rem] md:h-[18.5rem] relative overflow-hidden ">
          <div className="group flex h-full justify-center w-full ">
            <div className="h-5/6">
              <Image
                fill
                className={`object-contain w-full h-auto ${objectPosition} transition-transform duration-300 ease-in-out scale-90 group-hover:scale-100`}
                src={src}
                alt={alt}
              />
            </div>
            <div className="w-full h-full bg-black opacity-5 transition-opacity top-0 absolute z-20"></div>
          </div>
        </div>
        <div className="flex w-full pb-4 pt-2 justify-between">
          <div className="flex flex-col ">
            <p className="text-base font-semibold">{brand}</p>
            <p
              className={`text-xs font-sans font-semibold h-4 overflow-hidden`}
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
