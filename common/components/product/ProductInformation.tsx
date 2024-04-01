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
        <h3 className={`${montserratThin.className} text-sm`}>
          {itemData.brand}
        </h3>
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
              return (
                <div key={size}>
                  {itemData.size_array.map((item_size) => {
                    return (
                      <>
                        {size === item_size ? (
                          <button
                            key={item_size}
                            onClick={() => setSelectedSize(item_size)}
                            className={`relative h-8 w-12 rounded-3xl border-2 border-black text-center text-black ${selectedSize === item_size ? "bg-black text-white" : ""} transition-all`}
                          >
                            <p>{size}</p>
                          </button>
                        ) : (
                          <button
                            key={item_size}
                            className={`relative h-8 w-12 cursor-not-allowed rounded-3xl border text-center text-gray-500`}
                          >
                            <p>{size}</p>
                          </button>
                        )}
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AddToCart itemData={itemData} selectedSize={selectedSize}></AddToCart>
    </div>
  );
}
