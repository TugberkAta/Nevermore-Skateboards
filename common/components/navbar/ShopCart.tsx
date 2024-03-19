"use client";

import { montserrat, montserratMedium } from "@/common/styles/fonts";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function ShopCart() {
  const [activateShopCart, setActivateShopCart] = useState<boolean>(false);
  const [shopCart, setShopCart] = useState<String[] | null>(
    JSON.parse(localStorage.getItem("shopCart") || "null")
  );

  function handleClick() {
    setActivateShopCart(!activateShopCart);
    setShopCart(JSON.parse(localStorage.getItem("shopCart") || "null"));
  }

  return (
    <div>
      <button onClick={handleClick}>
        <MdOutlineShoppingCart className="size-5" />
      </button>
      {activateShopCart && (
        <>
          <div className="absolute z-30 w-4/12 h-full bg-white top-0 right-0">
            <div className="mt-10 ml-10 mr-10 ">
              <div className="flex justify-between">
                <h1 className={`${montserratMedium.className} text-xl`}>
                  Cart ({0 + (shopCart?.length || 0)})
                </h1>
                {shopCart?.map((item) => {
                  console.log(item);
                  return <></>;
                })}
                <button onClick={handleClick}>
                  <RxCross2 className="size-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute z-20 w-full h-full bg-black opacity-40 top-0 right-0"></div>
        </>
      )}
    </div>
  );
}
