"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";

type ProductImageProps = {
  alt: string;
  img_url_arr: string[];
};

// Constants for the magnifier
const MAGNIFIER_SIZE = 200;
const ZOOM_LEVEL = 1.5;

export function ProductImage({ alt, img_url_arr }: ProductImageProps) {
  // activeImg state that is tracked based on the picture the user clicks
  const [activeImg, setActiveImg] = useState<string>(img_url_arr[0]);

  // State variables for magnifier
  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  // Saves the positions of image and the mouse
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });

  // Event handlers for magnifier
  const handleMouseEnter = (e: MouseEvent) => {
    let element = e.currentTarget;
    let { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };
  const handleMouseLeave = (e: MouseEvent) => {
    setZoomable(false);
    updatePosition(e);
  };
  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e);
  };
  const updatePosition = (e: MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

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
      <div
        className="group relative col-span-3 cursor-none"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
      >
        {/* Active Image */}
        <Image
          fill
          className={`h-auto w-full object-contain`}
          src={activeImg}
          alt={alt}
        ></Image>
        {/* Magnifier */}
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${activeImg})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`pointer-events-none absolute z-50 rounded-full border-1`}
        />
      </div>
    </div>
  );
}
