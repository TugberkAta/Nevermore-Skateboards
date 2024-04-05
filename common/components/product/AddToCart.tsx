"use client";

import { Item } from "@/common/lib/data";
import { useEffect, useState } from "react";

export interface AddToCartProps {
  itemData: Item;
  selectedSize: string;
}

export function AddToCart({ itemData, selectedSize }: AddToCartProps) {
  const [shopCart, setShopCart] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("shopCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } else null;
  });

  useEffect(() => {
    // Store the shopCart array as a string in localStorage
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
    window.dispatchEvent(new Event("storage"));
  }, [shopCart]);

  const handleAddToCart = () => {
    const newItem = {
      uuid: itemData.uuid + selectedSize,
      img_url: itemData.img_url,
      price: itemData.price,
      size: selectedSize,
      title: itemData.title,
      brand: itemData.brand,
      count: 1,
    };

    const itemIndex = shopCart.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      return item.uuid === newItem.uuid;
    });

    if (itemIndex !== -1) {
      // If the item exists, update its count
      setShopCart((prevShopCart) =>
        prevShopCart.map((itemString, index) => {
          if (index === itemIndex) {
            const item = JSON.parse(itemString);
            item.count += 1;
            return JSON.stringify(item);
          }
          return itemString;
        }),
      );
    } else {
      // If the item doesn't exist, add it to the cart
      const newItemString = JSON.stringify(newItem);
      setShopCart((prevShopCart) => [...prevShopCart, newItemString]);
    }
  };

  return (
    <div className="mt-8 flex w-full justify-center transition-all hover:scale-105 active:scale-100">
      <button
        type="button"
        className="h-14 w-9/12 rounded-3xl  bg-black"
        onClick={handleAddToCart}
      >
        <p className="text-xs text-white">ADD TO CART</p>
      </button>
    </div>
  );
}
