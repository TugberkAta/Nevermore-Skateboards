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
      return item.uuid === uuid;
    });
    setShopCartArray(
      shopCartArray.filter((item) => item != shopCartArray[itemIndex])
    );
  };

  return (
    <>
      <button
        type="button"
        className="p-1 pr-3 pl-3 bg-black hover:bg-gray-700 transition-all "
        onClick={handleRemove}
      >
        <p className="text-white">Remove</p>
      </button>
    </>
  );
}
