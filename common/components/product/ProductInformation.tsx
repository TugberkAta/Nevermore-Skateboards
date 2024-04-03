"use client";

import { montserrat, montserratThin, openSans } from "@/common/styles/fonts";
import { DetailsProps } from "./ProductDetails";
import { AddToCart } from "./AddToCart";
import { useState } from "react";

export default function ProductInformation({
  itemData,
  sizeData,
}: DetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    itemData.size_array[0],
  );
  return (
    <div>
      <div className="mb-4 pb-4">
        <p className={`${montserratThin.className} text-sm`}>
          {itemData.brand}
        </p>
        <h1 className={`${montserrat.className} text-2xl`}>{itemData.title}</h1>
        <div className={`${montserratThin.className} mb-3 mt-3 text-gray-500`}>
          £{(itemData.price || 0) / 100} STR
        </div>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illum
          aspernatur reprehenderit cumque at neque deserunt, eveniet sapiente
          consequuntur nam rerum recusandae magni tenetur eius, ad quis deleniti
          natus harum!
        </p>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-10/12 flex-col items-center justify-center">
          <p className={` ${openSans.className} mb-3 text-xs font-bold`}>
            SIZE
          </p>
          <div
            className={`${montserrat.className} mb-2 flex w-full flex-wrap justify-center gap-3 text-sm`}
          >
            {sizeData?.map((size) => {
              const available = itemData.size_array.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => available && setSelectedSize(size)}
                  disabled={!available}
                  className={`relative h-8 w-12 rounded-3xl border-2 text-center ${available ? "border-black text-black" : "cursor-not-allowed border-gray-500 text-gray-500"} ${selectedSize === size ? "bg-black text-white" : ""} transition-all`}
                >
                  <p>{size}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <AddToCart itemData={itemData} selectedSize={selectedSize}></AddToCart>
    </div>
  );
}
