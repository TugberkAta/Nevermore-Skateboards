import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";

type IncrementItemButtonProps = {
  shopCartArray: string[];
  setShopCartArray: Dispatch<SetStateAction<string[]>>;
  uuid: string;
};

export default function IncrementItemButton({
  shopCartArray,
  setShopCartArray,
  uuid,
}: IncrementItemButtonProps) {
  const handleIncrementCount = () => {
    const itemIndex = shopCartArray.findIndex((itemString) => {
      const item = JSON.parse(itemString);
      return item.uuid === uuid;
    });

    // update the items count
    const updatedArray = shopCartArray.map((itemString, index) => {
      if (index === itemIndex) {
        const item = JSON.parse(itemString);
        item.count += 1;
        return JSON.stringify(item);
      }
      return itemString;
    });

    setShopCartArray(updatedArray);

    localStorage.setItem("shopCart", JSON.stringify(updatedArray));
  };
  return (
    <button type="button" onClick={handleIncrementCount}>
      <FaPlus></FaPlus>
    </button>
  );
}
