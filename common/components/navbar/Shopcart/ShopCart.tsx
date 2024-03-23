"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PreviewCartItem } from "./PreviewCartItem";
import { AnimatePresence, motion } from "framer-motion";

type ShoppingItemProps = {
  uuid: string;
  title: string;
  price: number;
  brand: string;
  size: string;
  img_url: string;
  count: number;
};

type shopCartProps = {
  shopCartArray: string[] | null;
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
};

export default function ShopCart({
  shopCartArray,
  setShopCartArray,
}: shopCartProps) {
  const [activateShopCart, setActivateShopCart] = useState<boolean>(false);

  function handleClick() {
    setActivateShopCart(!activateShopCart);
  }

  return (
    <div className="flex">
      <button onClick={handleClick}>
        <MdOutlineShoppingCart className="size-5" />
      </button>
      {activateShopCart && (
        <>
          <motion.div
            className="absolute z-40 w-5/12 min-w-[30rem] h-full pr-10 bg-white top-0 right-0"
            animate={{ translateX: 40, opacity: 1 }}
            initial={{ translateX: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="pt-10 pl-10 pr-10 h-full overflow-scroll">
              <div className="flex justify-between">
                <h1 className={`font-bold text-xl`}>
                  Cart ( {0 + (shopCartArray?.length || 0)} )
                </h1>
                <button onClick={handleClick}>
                  <RxCross2 className="size-6" />
                </button>
              </div>
              <motion.div layout>
                <div className="grid grid-row-4 gap-4 w-full mt-10 mb-10">
                  {shopCartArray?.map((item) => {
                    const ShoppingItem: ShoppingItemProps = JSON.parse(item);
                    return (
                      <PreviewCartItem
                        key={ShoppingItem.title}
                        src={ShoppingItem.img_url || ""}
                        alt={ShoppingItem.title || ""}
                        title={ShoppingItem.title || ""}
                        price={ShoppingItem.price || NaN}
                        size={ShoppingItem.size || ""}
                        address={`/product/${ShoppingItem.uuid}`}
                        brand={ShoppingItem.brand || ""}
                        count={ShoppingItem.count || NaN}
                        uuid={ShoppingItem.uuid || ""}
                        shopCartArray={shopCartArray}
                        setShopCartArray={setShopCartArray}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute z-30 w-full h-full bg-black opacity-40 top-0 right-0"></div>
        </>
      )}
    </div>
  );
}
