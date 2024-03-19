"use client";

import { useEffect, useState } from "react";
import { DetailsProps } from "./ProductDetails";

export function AddToCart({ itemData }: DetailsProps) {
  const [shopCart, setShopCart] = useState<string[]>([]);

  useEffect(() => {
    // Store the shopCart array as a string in localStorage
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
  }, [shopCart]);

  const handleAddToCart = () => {
    // Use the spread operator to include existing items, and add the new uuid
    setShopCart((prevShopCart) => [...prevShopCart, itemData.uuid]);
  };

  return (
    <div className="w-full hover:scale-105 transition-all flex justify-center mt-8">
      <button
        type="button"
        className="h-12 w-6/12  bg-black"
        onClick={handleAddToCart}
      >
        <p className="text-white">ADD TO CART</p>
      </button>
    </div>
  );
}
