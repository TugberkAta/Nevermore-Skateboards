import { Dispatch, SetStateAction, useEffect, useState } from "react";

type RemoveItemButtonProps = {
  uuid: string;
  shopCartArray: string[];
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
};

export default function RemoveItemButton({
  uuid,
  shopCartArray,
  setShopCartArray,
}: RemoveItemButtonProps) {
  const handleRemove = () => {
    const itemIndex = shopCartArray?.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      item.count = 1;
      return item.uuid === uuid;
    });

    const updatedShopCartArray = shopCartArray.filter(
      (item) => item != shopCartArray[itemIndex],
    );

    setShopCartArray(updatedShopCartArray);

    if (updatedShopCartArray.length === 0) {
      localStorage.removeItem("shopCart");
    } else {
      localStorage.setItem("shopCart", JSON.stringify(updatedShopCartArray));
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-black p-1 pl-3 pr-3 transition-all hover:bg-gray-700 "
        onClick={handleRemove}
      >
        <p className="text-white">Remove</p>
      </button>
    </>
  );
}
