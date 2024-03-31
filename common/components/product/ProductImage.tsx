"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  alt: string;
  img_url_arr: string[];
};

export function ProductImage({ alt, img_url_arr }: ProductImageProps) {
  // activeImg state that is tracked based on the picture the user clicks
  const [activeImg, setActiveImg] = useState<string>(img_url_arr[0]);

  return (
    <div className="grid h-full min-h-80 w-full grid-cols-4 grid-rows-1 ">
      <div className="col-span-1 grid grid-cols-1 grid-rows-3">
        {img_url_arr.map((img_url, index) => {
          return (
            <div
              key={"image-preview-" + alt + "-" + index}
              className={`relative cursor-pointer`}
              onClick={() => setActiveImg(img_url)}
            >
              <Image
                fill
                className={`h-auto w-full scale-90 object-contain transition-transform duration-300 ease-in-out group-hover:scale-100`}
                src={img_url}
                alt={"image-preview-" + alt + "-" + index}
              ></Image>
              {activeImg === img_url && (
                /*This component uses layoutId to animate between positions*/
                <motion.div
                  layoutId="border-right"
                  className="absolute right-0 h-full w-[0.10rem] bg-gray-300"
                  transition={{ duration: 0.7, type: "spring" }}
                ></motion.div>
              )}
            </div>
          );
        })}
      </div>
      <div className="group relative col-span-3">
        <Image
          fill
          className={`h-auto w-full scale-90 object-contain transition-transform duration-300 ease-in-out group-hover:scale-100`}
          src={activeImg}
          alt={alt}
        ></Image>
      </div>
    </div>
  );
}
